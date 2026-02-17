"""SQLAlchemy ORM models and Pydantic schemas for Slingshot."""

from __future__ import annotations

import enum
from datetime import datetime
from typing import Any, Optional
from uuid import uuid4

from pydantic import BaseModel, Field
from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, relationship


# ==========================================================================
# SQLAlchemy ORM Models
# ==========================================================================


class Base(DeclarativeBase):
    """Base class for all ORM models."""

    pass


class ResearchSession(Base):
    __tablename__ = "research_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(String, nullable=True)
    query = Column(Text, nullable=False)
    ticker = Column(String(20), nullable=True)
    status = Column(
        String(30),
        nullable=False,
        default="planning",
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    thought_steps = relationship("ThoughtStep", back_populates="session", cascade="all, delete")
    citations = relationship("Citation", back_populates="session", cascade="all, delete")
    report = relationship("Report", back_populates="session", uselist=False, cascade="all, delete")


class ThoughtStep(Base):
    __tablename__ = "thought_steps"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("research_sessions.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    step_type = Column(
        String(30), nullable=False
    )  # planning, researching, analyzing, reflecting, reporting
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    session = relationship("ResearchSession", back_populates="thought_steps")
    tool_executions = relationship(
        "ToolExecution", back_populates="thought_step", cascade="all, delete"
    )


class ToolExecution(Base):
    __tablename__ = "tool_executions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    thought_step_id = Column(UUID(as_uuid=True), ForeignKey("thought_steps.id"), nullable=False)
    tool_name = Column(String(50), nullable=False)
    input_params = Column(JSONB, nullable=True)
    output = Column(JSONB, nullable=True)
    execution_time_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    thought_step = relationship("ThoughtStep", back_populates="tool_executions")


class Citation(Base):
    __tablename__ = "citations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("research_sessions.id"), nullable=False)
    citation_key = Column(String(20), nullable=False)  # e.g., "cite-1"
    source_type = Column(String(30), nullable=False)  # screener, pdf, news, web
    source_name = Column(String(200), nullable=False)
    source_url = Column(Text, nullable=True)
    content_snippet = Column(Text, nullable=True)
    page_number = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    session = relationship("ResearchSession", back_populates="citations")


class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(
        UUID(as_uuid=True), ForeignKey("research_sessions.id"), nullable=False, unique=True
    )
    executive_summary = Column(Text, nullable=True)
    full_report = Column(Text, nullable=True)
    report_metadata = Column(JSONB, nullable=True)  # charts, structured data
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    session = relationship("ResearchSession", back_populates="report")


class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(String, nullable=False)
    name = Column(String(100), nullable=False)
    is_private = Column(Integer, default=0)  # 0=False, 1=True
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    holdings = relationship("Holding", back_populates="portfolio", cascade="all, delete")
    stress_tests = relationship("StressTest", back_populates="portfolio", cascade="all, delete")


class Holding(Base):
    __tablename__ = "holdings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    portfolio_id = Column(UUID(as_uuid=True), ForeignKey("portfolios.id"), nullable=False)
    ticker = Column(String(20), nullable=False)
    quantity = Column(Float, nullable=False)
    avg_buy_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=True)
    sector = Column(String(50), nullable=True)

    # Relationships
    portfolio = relationship("Portfolio", back_populates="holdings")


class StressTest(Base):
    __tablename__ = "stress_tests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    portfolio_id = Column(UUID(as_uuid=True), ForeignKey("portfolios.id"), nullable=False)
    scenario_name = Column(String(100), nullable=False)
    parameters = Column(JSONB, nullable=True)
    results = Column(JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    portfolio = relationship("Portfolio", back_populates="stress_tests")


# ==========================================================================
# Pydantic Schemas (API Contracts)
# ==========================================================================


# --- Request Schemas ---


class ResearchRequest(BaseModel):
    """Request to start a new research session."""

    query: str = Field(
        ..., min_length=1, max_length=500, description="Research query, e.g. 'Analyze HDFC BANK'"
    )
    include_news: bool = Field(default=True, description="Include news sentiment analysis")
    max_iterations: int = Field(default=2, ge=1, le=5, description="Max critic loop iterations")


class MacroAnalyzeRequest(BaseModel):
    """Request to start a macro analysis."""

    query: str = Field(..., min_length=1, max_length=500, description="Macro event query")


class PortfolioUploadRequest(BaseModel):
    """Request to upload a portfolio."""

    name: str = Field(..., min_length=1, max_length=100)
    holdings: list[HoldingInput] = Field(default_factory=list)


class HoldingInput(BaseModel):
    """Single holding input."""

    ticker: str
    quantity: float
    avg_buy_price: float
    sector: str | None = None


class StressTestRequest(BaseModel):
    """Request to run a stress test."""

    scenario_name: str
    parameters: dict[str, Any] = Field(default_factory=dict)


# Fix forward reference
PortfolioUploadRequest.model_rebuild()


# --- Response Schemas ---


class CitationResponse(BaseModel):
    """Citation data returned to the client."""

    citation_key: str
    source_type: str
    source_name: str
    source_url: str | None = None
    content_snippet: str | None = None
    page_number: int | None = None


class ToolExecutionResponse(BaseModel):
    """Tool execution data returned to the client."""

    tool_name: str
    execution_time_ms: int | None = None


class ThoughtStepResponse(BaseModel):
    """A single thought step returned to the client."""

    step_number: int
    step_type: str
    title: str
    content: str | None = None
    confidence: float | None = None
    tool_executions: list[ToolExecutionResponse] = Field(default_factory=list)


class ResearchResponse(BaseModel):
    """Full research session response."""

    session_id: str
    query: str
    ticker: str | None = None
    status: str
    thought_steps: list[ThoughtStepResponse] = Field(default_factory=list)
    citations: list[CitationResponse] = Field(default_factory=list)
    executive_summary: str | None = None
    full_report: str | None = None


class MacroAnalysisResponse(BaseModel):
    """Full macro analysis response."""

    session_id: str
    query: str
    status: str
    causal_chain: list[dict[str, Any]] = Field(default_factory=list)
    affected_companies: list[dict[str, Any]] = Field(default_factory=list)
    trade_ideas: list[dict[str, Any]] = Field(default_factory=list)
    executive_summary: str | None = None
    full_report: str | None = None
    citations: list[CitationResponse] = Field(default_factory=list)


# --- WebSocket Event Schemas ---


class WSThoughtEvent(BaseModel):
    """WebSocket event for a new thought step."""

    event: str = "thought_step"
    session_id: str
    data: ThoughtStepResponse


class WSStatusEvent(BaseModel):
    """WebSocket event for status change."""

    event: str = "status_change"
    session_id: str
    status: str


class WSReportEvent(BaseModel):
    """WebSocket event when report is ready."""

    event: str = "report_ready"
    session_id: str
    executive_summary: str
    full_report: str


class WSErrorEvent(BaseModel):
    """WebSocket event for errors."""

    event: str = "error"
    session_id: str
    message: str
