"""WebSocket infrastructure for real-time thought streaming."""

from __future__ import annotations

import asyncio
import json
from typing import Any

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from utils import logger

router = APIRouter()


class ConnectionManager:
    """Manages active WebSocket connections per research session."""

    def __init__(self) -> None:
        # session_id -> list of active websocket connections
        self._connections: dict[str, list[WebSocket]] = {}

    async def connect(self, session_id: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self._connections.setdefault(session_id, []).append(websocket)
        await logger.ainfo("ws_connected", session_id=session_id)

    def disconnect(self, session_id: str, websocket: WebSocket) -> None:
        conns = self._connections.get(session_id, [])
        if websocket in conns:
            conns.remove(websocket)
        if not conns:
            self._connections.pop(session_id, None)

    async def send_event(self, session_id: str, event: dict[str, Any]) -> None:
        """Broadcast an event to all connections for a session."""
        conns = self._connections.get(session_id, [])
        dead: list[WebSocket] = []
        for ws in conns:
            try:
                await ws.send_json(event)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(session_id, ws)

    async def send_thought_step(
        self,
        session_id: str,
        step_number: int,
        step_type: str,
        title: str,
        content: str = "",
        confidence: float | None = None,
    ) -> None:
        await self.send_event(
            session_id,
            {
                "event": "thought_step",
                "session_id": session_id,
                "data": {
                    "step_number": step_number,
                    "step_type": step_type,
                    "title": title,
                    "content": content,
                    "confidence": confidence,
                    "tool_executions": [],
                },
            },
        )

    async def send_status(self, session_id: str, status: str) -> None:
        await self.send_event(
            session_id,
            {
                "event": "status_change",
                "session_id": session_id,
                "status": status,
            },
        )

    async def send_report(self, session_id: str, executive_summary: str, full_report: str) -> None:
        await self.send_event(
            session_id,
            {
                "event": "report_ready",
                "session_id": session_id,
                "executive_summary": executive_summary,
                "full_report": full_report,
            },
        )

    async def send_error(self, session_id: str, message: str) -> None:
        await self.send_event(
            session_id,
            {
                "event": "error",
                "session_id": session_id,
                "message": message,
            },
        )


# Global connection manager
ws_manager = ConnectionManager()


@router.websocket("/ws/research/{session_id}")
async def research_websocket(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time research updates."""
    await ws_manager.connect(session_id, websocket)
    try:
        while True:
            # Keep connection alive; client can send pings
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(session_id, websocket)
        await logger.ainfo("ws_disconnected", session_id=session_id)


@router.websocket("/ws/macro/{session_id}")
async def macro_websocket(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time macro analysis updates."""
    await ws_manager.connect(session_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(session_id, websocket)
