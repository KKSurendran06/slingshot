// API client for communicating with the Slingshot backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  return res.json();
}

// --- Research ---

import type { ResearchRequest, ResearchResponse, MacroAnalysisResponse } from "@/types";

export async function startResearch(
  req: ResearchRequest
): Promise<ResearchResponse> {
  return request<ResearchResponse>("/api/v1/research", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function getResearch(
  sessionId: string
): Promise<ResearchResponse> {
  return request<ResearchResponse>(`/api/v1/research/${sessionId}`);
}

export async function getReport(
  sessionId: string
): Promise<{ executive_summary: string; full_report: string }> {
  return request(`/api/v1/research/${sessionId}/report`);
}

// --- Macro Analyzer ---

export async function startMacroAnalysis(
  query: string
): Promise<MacroAnalysisResponse> {
  return request<MacroAnalysisResponse>("/api/v1/macro/analyze", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
}

export async function getMacroAnalysis(
  sessionId: string
): Promise<MacroAnalysisResponse> {
  return request<MacroAnalysisResponse>(`/api/v1/macro/${sessionId}`);
}

// --- Health ---

export async function healthCheck(): Promise<{ status: string; service: string }> {
  return request("/health");
}
