"""Private Vault API endpoints (local processing)."""

from __future__ import annotations

from fastapi import APIRouter, UploadFile, File

from utils import logger

router = APIRouter(prefix="/api/v1/vault", tags=["vault"])


@router.post("/process")
async def process_sensitive_file(
    file: UploadFile = File(...),
):
    """Process a sensitive file locally using on-device LLM.

    This endpoint uses local ONNX Runtime inference so that sensitive
    financial data (bank statements, etc.) never leaves the device.
    """
    await logger.ainfo("vault_process", filename=file.filename)
    # TODO (Phase 4): Route to local LLM for processing
    return {"message": "Vault processing endpoint (not yet implemented)"}
