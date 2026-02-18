// Zustand store for agent chat state in Deep Research mode

import { create } from "zustand";
import type { ChatMessage } from "@/types";
import { matchReply, fallbackResponse } from "@/lib/demoData/chatDemo";

interface ChatStore {
  messages: ChatMessage[];
  isAgentTyping: boolean;

  /** Append a user message and trigger a scripted agent response. */
  sendMessage: (content: string) => void;
  clearChat: () => void;
}

let _msgId = 0;
function nextId() {
  return `msg-${++_msgId}-${Date.now()}`;
}

/**
 * Simulate the agent "thinking" then streaming a response.
 *
 * 1.  Immediately add a placeholder agent message with `isStreaming: true`.
 * 2.  Drip-feed thinking steps (one every 500 ms).
 * 3.  Then reveal the full response and mark `isStreaming: false`.
 */
function simulateAgentReply(
  userMessage: string,
  set: (
    fn: (state: ChatStore) => Partial<ChatStore>
  ) => void
) {
  const match = matchReply(userMessage);
  const { thinkingSteps, response } = match ?? fallbackResponse;

  const agentId = nextId();

  // Insert placeholder message
  set((s) => ({
    messages: [
      ...s.messages,
      {
        id: agentId,
        role: "agent" as const,
        content: "",
        timestamp: Date.now(),
        thinkingSteps: [],
        isStreaming: true,
      },
    ],
    isAgentTyping: true,
  }));

  // Drip-feed thinking steps
  let stepIdx = 0;
  const thinkInterval = setInterval(() => {
    if (stepIdx < thinkingSteps.length) {
      const currentStep = thinkingSteps[stepIdx];
      set((s) => ({
        messages: s.messages.map((m) =>
          m.id === agentId
            ? { ...m, thinkingSteps: [...(m.thinkingSteps ?? []), currentStep] }
            : m
        ),
      }));
      stepIdx++;
    } else {
      clearInterval(thinkInterval);

      // Stream the response character-by-character (in chunks for perf)
      const chunkSize = 8;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx < response.length) {
          const end = Math.min(charIdx + chunkSize, response.length);
          const partial = response.slice(0, end);
          set((s) => ({
            messages: s.messages.map((m) =>
              m.id === agentId ? { ...m, content: partial } : m
            ),
          }));
          charIdx = end;
        } else {
          clearInterval(typeInterval);
          // Finalize
          set((s) => ({
            messages: s.messages.map((m) =>
              m.id === agentId
                ? { ...m, content: response, isStreaming: false }
                : m
            ),
            isAgentTyping: false,
          }));
        }
      }, 15);
    }
  }, 500);
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isAgentTyping: false,

  sendMessage: (content: string) => {
    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    set((s) => ({ messages: [...s.messages, userMsg] }));

    // Kick off scripted agent reply
    simulateAgentReply(content, set);
  },

  clearChat: () => set({ messages: [], isAgentTyping: false }),
}));
