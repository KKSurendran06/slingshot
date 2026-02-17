"""Slingshot Backend Configuration."""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "Slingshot"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8000

    # Database
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/slingshot"
    database_sync_url: str = "postgresql://postgres:postgres@localhost:5432/slingshot"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # LLM Provider
    google_api_key: str = ""
    default_llm_provider: str = "gemini"
    default_llm_model: str = "gemini-2.0-flash"

    # ChromaDB
    chroma_persist_dir: str = "./data/chroma"

    # Vault / Local LLM
    local_vault_url: str = "http://localhost:8001"
    npu_enabled: bool = False

    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()
