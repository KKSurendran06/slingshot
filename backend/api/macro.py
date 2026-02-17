"""Macro Analyzer API endpoints."""

from __future__ import annotations

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from models import MacroAnalyzeRequest, MacroAnalysisResponse
from utils import generate_session_id, get_db, logger

router = APIRouter(prefix="/api/v1/macro", tags=["macro"])


@router.post("/analyze", response_model=MacroAnalysisResponse)
async def start_macro_analysis(
    request: MacroAnalyzeRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """Start a macro analysis session.

    Returns immediately with a session_id. Analysis streams via WebSocket.
    """
    session_id = generate_session_id()
    await logger.ainfo("macro_analysis_started", session_id=session_id, query=request.query)

    # TODO (Phase 3): Kick off Macro Analyzer LangGraph in background
    # background_tasks.add_task(run_macro_pipeline, session_id, request, db)

    return MacroAnalysisResponse(
        session_id=session_id,
        query=request.query,
        status="parsing_event",
    )


@router.get("/{session_id}", response_model=MacroAnalysisResponse)
async def get_macro_analysis(
    session_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Get full macro analysis results."""
    # TODO (Phase 3): Fetch from database
    raise HTTPException(status_code=404, detail="Macro analysis session not found")


@router.get("/{session_id}/chain")
async def get_causal_chain(
    session_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Get causal chain data for visualization."""
    # TODO (Phase 3): Fetch causal chain from database
    raise HTTPException(status_code=404, detail="Causal chain not found")
