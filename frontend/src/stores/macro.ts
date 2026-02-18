// Zustand store for macro analysis state

import { create } from "zustand";
import type {
  CausalLink,
  CompanyExposure,
  TradeIdea,
  Citation,
  ThoughtStep,
  ResearchStatus,
} from "@/types";

interface MacroStore {
  // Session
  query: string;
  status: ResearchStatus | null;

  // Data
  causalChain: CausalLink[];
  companies: CompanyExposure[];
  tradeIdeas: TradeIdea[];
  citations: Citation[];
  executiveSummary: string | null;
  fullReport: string | null;

  // Thoughts
  thoughts: ThoughtStep[];
  currentStatus: ResearchStatus | null;

  // Loading
  isLoading: boolean;

  // Actions
  setQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  addThought: (thought: ThoughtStep) => void;
  setCurrentStatus: (status: ResearchStatus) => void;
  setCausalChain: (chain: CausalLink[]) => void;
  setCompanies: (companies: CompanyExposure[]) => void;
  setTradeIdeas: (ideas: TradeIdea[]) => void;
  setReport: (summary: string, report: string, citations: Citation[]) => void;
  reset: () => void;
}

const initialState = {
  query: "",
  status: null,
  causalChain: [],
  companies: [],
  tradeIdeas: [],
  citations: [],
  executiveSummary: null,
  fullReport: null,
  thoughts: [],
  currentStatus: null,
  isLoading: false,
};

export const useMacroStore = create<MacroStore>((set) => ({
  ...initialState,

  setQuery: (query) => set({ query }),
  setLoading: (loading) => set({ isLoading: loading }),

  addThought: (thought) =>
    set((state) => ({
      thoughts: [...state.thoughts, thought],
    })),

  setCurrentStatus: (status) => set({ currentStatus: status }),

  setCausalChain: (chain) => set({ causalChain: chain }),
  setCompanies: (companies) => set({ companies }),
  setTradeIdeas: (ideas) => set({ tradeIdeas: ideas }),

  setReport: (summary, report, citations) =>
    set({
      executiveSummary: summary,
      fullReport: report,
      citations,
      currentStatus: "complete",
    }),

  reset: () => set(initialState),
}));
