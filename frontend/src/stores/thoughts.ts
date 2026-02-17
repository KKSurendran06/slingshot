// Zustand store for real-time thought stream

import { create } from "zustand";
import type { ThoughtStep, ResearchStatus } from "@/types";
import type { WSEvent } from "@/types";

interface ThoughtsStore {
  // Stream state
  isConnected: boolean;
  thoughts: ThoughtStep[];
  currentStatus: ResearchStatus | null;

  // Actions
  handleWSEvent: (event: WSEvent) => void;
  setConnected: (connected: boolean) => void;
  clearThoughts: () => void;
}

export const useThoughtsStore = create<ThoughtsStore>((set, get) => ({
  isConnected: false,
  thoughts: [],
  currentStatus: null,

  handleWSEvent: (event) => {
    switch (event.event) {
      case "thought_step":
        set((state) => ({
          thoughts: [...state.thoughts, event.data],
        }));
        break;
      case "status_change":
        set({ currentStatus: event.status });
        break;
      case "report_ready":
        set({ currentStatus: "complete" });
        break;
      case "error":
        set({ currentStatus: "error" });
        break;
    }
  },

  setConnected: (connected) => set({ isConnected: connected }),

  clearThoughts: () => set({ thoughts: [], currentStatus: null }),
}));
