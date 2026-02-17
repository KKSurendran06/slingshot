"""Logging, rate limiting, and helper utilities."""

from __future__ import annotations

import time
import uuid
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from functools import wraps
from typing import Any

import structlog
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from config import get_settings

# ---------------------------------------------------------------------------
# Structured Logging
# ---------------------------------------------------------------------------

structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.make_filtering_bound_logger(0),
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
)

logger = structlog.get_logger()

# ---------------------------------------------------------------------------
# Database Engine & Session
# ---------------------------------------------------------------------------

_settings = get_settings()
engine = create_async_engine(
    _settings.database_url,
    echo=_settings.debug,
    pool_size=10,
    max_overflow=20,
)

async_session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that yields an async database session."""
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


# ---------------------------------------------------------------------------
# ID Generation
# ---------------------------------------------------------------------------


def generate_session_id() -> str:
    """Generate a unique session ID."""
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# Rate Limiter (simple in-memory, swap for Redis in production)
# ---------------------------------------------------------------------------


class RateLimiter:
    """Simple token-bucket rate limiter."""

    def __init__(self, max_calls: int = 10, period: float = 60.0):
        self.max_calls = max_calls
        self.period = period
        self._calls: dict[str, list[float]] = {}

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        calls = self._calls.setdefault(key, [])
        # Prune old calls
        calls[:] = [t for t in calls if now - t < self.period]
        if len(calls) >= self.max_calls:
            return False
        calls.append(now)
        return True


rate_limiter = RateLimiter()


# ---------------------------------------------------------------------------
# Timing Decorator
# ---------------------------------------------------------------------------


def timed(func):
    """Decorator to log execution time of async functions."""

    @wraps(func)
    async def wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        await logger.ainfo(
            "function_executed",
            function=func.__name__,
            elapsed_ms=round(elapsed * 1000, 2),
        )
        return result

    return wrapper
