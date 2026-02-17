// WebSocket client for real-time thought streaming

import type { WSEvent } from "@/types";

const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

export type WSEventHandler = (event: WSEvent) => void;

/**
 * Creates and manages a WebSocket connection for a research session.
 */
export function createResearchSocket(
  sessionId: string,
  onEvent: WSEventHandler
) {
  const url = `${WS_BASE}/ws/research/${sessionId}`;
  return createSocket(url, onEvent);
}

/**
 * Creates and manages a WebSocket connection for a macro analysis session.
 */
export function createMacroSocket(
  sessionId: string,
  onEvent: WSEventHandler
) {
  const url = `${WS_BASE}/ws/macro/${sessionId}`;
  return createSocket(url, onEvent);
}

function createSocket(url: string, onEvent: WSEventHandler) {
  let ws: WebSocket | null = null;
  let pingInterval: ReturnType<typeof setInterval> | null = null;

  function connect() {
    ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("[WS] Connected:", url);
      // Keep-alive ping every 30s
      pingInterval = setInterval(() => {
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send("ping");
        }
      }, 30_000);
    };

    ws.onmessage = (msg) => {
      if (msg.data === "pong") return;
      try {
        const event: WSEvent = JSON.parse(msg.data);
        onEvent(event);
      } catch (err) {
        console.error("[WS] Failed to parse message:", err);
      }
    };

    ws.onclose = () => {
      console.log("[WS] Disconnected:", url);
      if (pingInterval) clearInterval(pingInterval);
    };

    ws.onerror = (err) => {
      console.error("[WS] Error:", err);
    };
  }

  function disconnect() {
    if (pingInterval) clearInterval(pingInterval);
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  connect();

  return { disconnect };
}
