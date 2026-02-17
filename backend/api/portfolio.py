"""Portfolio API endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from models import StressTestRequest
from utils import get_db, logger

router = APIRouter(prefix="/api/v1/portfolio", tags=["portfolio"])


@router.post("")
async def upload_portfolio(
    file: UploadFile = File(None),
    db: AsyncSession = Depends(get_db),
):
    """Upload a portfolio from CSV or PDF."""
    # TODO (Phase 4): Parse file, extract holdings, save to DB
    await logger.ainfo("portfolio_upload", filename=file.filename if file else None)
    return {"message": "Portfolio upload endpoint (not yet implemented)"}


@router.get("/{portfolio_id}")
async def get_portfolio(
    portfolio_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Get a portfolio by ID."""
    # TODO (Phase 4): Fetch from database
    raise HTTPException(status_code=404, detail="Portfolio not found")


@router.post("/{portfolio_id}/stress-test")
async def run_stress_test(
    portfolio_id: str,
    request: StressTestRequest,
    db: AsyncSession = Depends(get_db),
):
    """Run a stress test on a portfolio."""
    # TODO (Phase 4): Run stress test
    raise HTTPException(status_code=404, detail="Portfolio not found")
