"""Slingshot Backend — FastAPI Entry Point."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from utils import engine, logger
from models import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: startup and shutdown logic."""
    settings = get_settings()
    await logger.ainfo("startup", app=settings.app_name, debug=settings.debug)

    # Create tables (in dev; use Alembic migrations in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await logger.ainfo("database_ready")

    yield

    # Shutdown
    await engine.dispose()
    await logger.ainfo("shutdown")


def create_app() -> FastAPI:
    """Application factory."""
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        description="Agentic Research System for Indian Stock Market",
        version="0.1.0",
        lifespan=lifespan,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routers
    from api.research import router as research_router
    from api.macro import router as macro_router
    from api.portfolio import router as portfolio_router
    from api.vault import router as vault_router
    from api.websocket import router as ws_router

    app.include_router(research_router)
    app.include_router(macro_router)
    app.include_router(portfolio_router)
    app.include_router(vault_router)
    app.include_router(ws_router)

    @app.get("/health")
    async def health():
        return {"status": "ok", "service": settings.app_name}

    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn

    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
