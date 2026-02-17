// Zustand store for research state

import { create } from "zustand";
import type {
  ResearchResponse,
  ResearchStatus,
  ThoughtStep,
  Citation,
} from "@/types";

interface ResearchStore {
  // Current session
  sessionId: string | null;
  query: string;
  status: ResearchStatus | null;
  thoughtSteps: ThoughtStep[];
  citations: Citation[];
  executiveSummary: string | null;
  fullReport: string | null;
  error: string | null;

  // Loading
  isLoading: boolean;

  // Actions
  setSession: (res: ResearchResponse) => void;
  addThoughtStep: (step: ThoughtStep) => void;
  setStatus: (status: ResearchStatus) => void;
  setReport: (summary: string, report: string) => void;
  setError: (message: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  sessionId: null,
  query: "",
  status: null,
  thoughtSteps: [],
  citations: [],
  executiveSummary: null,
  fullReport: null,
  error: null,
  isLoading: false,
};

export const useResearchStore = create<ResearchStore>((set) => ({
  ...initialState,

  setSession: (res) =>
    set({
      sessionId: res.session_id,
      query: res.query,
      status: res.status,
      thoughtSteps: res.thought_steps,
      citations: res.citations,
      executiveSummary: res.executive_summary ?? null,
      fullReport: res.full_report ?? null,
      error: null,
    }),

  addThoughtStep: (step) =>
    set((state) => ({
      thoughtSteps: [...state.thoughtSteps, step],
    })),

  setStatus: (status) => set({ status }),

  setReport: (summary, report) =>
    set({
      executiveSummary: summary,
      fullReport: report,
      status: "complete",
    }),

  setError: (message) => set({ error: message, status: "error" }),

  setLoading: (loading) => set({ isLoading: loading }),

  reset: () => set(initialState),
}));
