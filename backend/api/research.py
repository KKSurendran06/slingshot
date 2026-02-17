"""Research API endpoints."""

from __future__ import annotations

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from models import ResearchRequest, ResearchResponse
from utils import generate_session_id, get_db, logger

router = APIRouter(prefix="/api/v1/research", tags=["research"])


@router.post("", response_model=ResearchResponse)
async def start_research(
    request: ResearchRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """Start a new research session.

    Returns immediately with a session_id. The actual research runs in the
    background and streams updates via WebSocket.
    """
    session_id = generate_session_id()
    await logger.ainfo("research_started", session_id=session_id, query=request.query)

    # TODO (Phase 2): Kick off LangGraph orchestrator in background
    # background_tasks.add_task(run_research_pipeline, session_id, request, db)

    return ResearchResponse(
        session_id=session_id,
        query=request.query,
        status="planning",
    )


@router.get("/{session_id}", response_model=ResearchResponse)
async def get_research(
    session_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Get full research session results."""
    # TODO (Phase 2): Fetch from database
    raise HTTPException(status_code=404, detail="Session not found")


@router.get("/{session_id}/report")
async def get_report(
    session_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Get final report for a session."""
    # TODO (Phase 2): Fetch report from database
    raise HTTPException(status_code=404, detail="Report not found")
