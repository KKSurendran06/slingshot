// Zustand store for portfolio analysis state

import { create } from "zustand";
import type {
  Portfolio,
  PortfolioMetrics,
  SectorAllocation,
  StressTestResult,
  Citation,
  ThoughtStep,
  ResearchStatus,
} from "@/types";

interface PortfolioStore {
  // Session
  status: ResearchStatus | null;

  // Data
  portfolio: Portfolio | null;
  metrics: PortfolioMetrics | null;
  sectorAllocation: SectorAllocation[];
  stressTests: StressTestResult[];
  recommendations: string[];
  citations: Citation[];
  executiveSummary: string | null;
  fullReport: string | null;

  // Thoughts
  thoughts: ThoughtStep[];
  currentStatus: ResearchStatus | null;

  // Loading
  isLoading: boolean;
  isAnalyzed: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  addThought: (thought: ThoughtStep) => void;
  setCurrentStatus: (status: ResearchStatus) => void;
  setPortfolio: (portfolio: Portfolio) => void;
  setMetrics: (metrics: PortfolioMetrics) => void;
  setSectorAllocation: (allocation: SectorAllocation[]) => void;
  setStressTests: (tests: StressTestResult[]) => void;
  setRecommendations: (recs: string[]) => void;
  setReport: (summary: string, report: string, citations: Citation[]) => void;
  setAnalyzed: (analyzed: boolean) => void;
  reset: () => void;
}

const initialState = {
  status: null,
  portfolio: null,
  metrics: null,
  sectorAllocation: [],
  stressTests: [],
  recommendations: [],
  citations: [],
  executiveSummary: null,
  fullReport: null,
  thoughts: [],
  currentStatus: null,
  isLoading: false,
  isAnalyzed: false,
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  ...initialState,

  setLoading: (loading) => set({ isLoading: loading }),

  addThought: (thought) =>
    set((state) => ({
      thoughts: [...state.thoughts, thought],
    })),

  setCurrentStatus: (status) => set({ currentStatus: status }),

  setPortfolio: (portfolio) => set({ portfolio }),
  setMetrics: (metrics) => set({ metrics }),
  setSectorAllocation: (allocation) => set({ sectorAllocation: allocation }),
  setStressTests: (tests) => set({ stressTests: tests }),
  setRecommendations: (recs) => set({ recommendations: recs }),

  setReport: (summary, report, citations) =>
    set({
      executiveSummary: summary,
      fullReport: report,
      citations,
      currentStatus: "complete",
    }),

  setAnalyzed: (analyzed) => set({ isAnalyzed: analyzed }),

  reset: () => set(initialState),
}));
