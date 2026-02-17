"""Base tool class and tool registry for Slingshot agents."""

from __future__ import annotations

import time
from abc import ABC, abstractmethod
from typing import Any

from pydantic import BaseModel, Field

from agents.state import Citation, ToolResult


class ToolInput(BaseModel):
    """Base input schema for tools. Subclass per tool."""

    pass


class BaseTool(ABC):
    """Abstract base class for all Slingshot research tools.

    Every tool:
      - Has a name and description for the LLM to select it.
      - Produces structured output with citations.
      - Tracks execution time.
    """

    name: str = ""
    description: str = ""

    @abstractmethod
    async def execute(self, params: dict[str, Any]) -> ToolResult:
        """Run the tool and return a ToolResult with citations."""
        ...

    async def run(self, params: dict[str, Any]) -> ToolResult:
        """Execute with timing wrapper."""
        start = time.perf_counter()
        result = await self.execute(params)
        elapsed_ms = int((time.perf_counter() - start) * 1000)
        result.execution_time_ms = elapsed_ms
        return result

    def _make_citation(
        self,
        source_name: str,
        source_type: str | None = None,
        url: str | None = None,
        snippet: str | None = None,
        page_number: int | None = None,
    ) -> Citation:
        """Helper to create a Citation."""
        return Citation(
            source_type=source_type or self.name,
            source_name=source_name,
            url=url,
            content_snippet=snippet,
            page_number=page_number,
        )


# ---------------------------------------------------------------------------
# Tool Registry
# ---------------------------------------------------------------------------


class ToolRegistry:
    """Central registry for all available tools."""

    def __init__(self) -> None:
        self._tools: dict[str, BaseTool] = {}

    def register(self, tool: BaseTool) -> None:
        """Register a tool by its name."""
        self._tools[tool.name] = tool

    def get(self, name: str) -> BaseTool | None:
        """Look up a tool by name."""
        return self._tools.get(name)

    def list_tools(self) -> list[dict[str, str]]:
        """Return tool names and descriptions (for LLM tool selection)."""
        return [{"name": t.name, "description": t.description} for t in self._tools.values()]

    @property
    def available(self) -> list[str]:
        return list(self._tools.keys())


# Global registry - tools register themselves on import
tool_registry = ToolRegistry()
