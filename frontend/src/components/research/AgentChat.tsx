"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";
import type { ChatMessage } from "@/types";

/**
 * Minimal markdown-ish renderer: handles **bold**, tables, and numbered lists.
 * Good enough for a hackathon demo without pulling in react-markdown.
 */
function renderContent(text: string) {
  // Split into lines and process tables, lists, bold
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const headers = tableRows[0];
    const body = tableRows.slice(1).filter(
      (row) => !row.every((cell) => /^[-|:\s]+$/.test(cell))
    );
    elements.push(
      <div key={`table-${elements.length}`} className="my-3 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {headers.map((h, i) => (
                  <th
                  key={i}
                  className="border border-white/[0.06] bg-white/[0.04] px-2 py-1.5 text-left font-semibold"
                >
                  {h.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "" : "bg-white/[0.02]"}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border border-white/[0.06] px-2 py-1">
                    {formatInline(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Detect table row
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      if (!inTable) inTable = true;
      const cells = line
        .split("|")
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      tableRows.push(cells);
      continue;
    }

    if (inTable) {
      inTable = false;
      flushTable();
    }

    // Blank line
    if (!line.trim()) {
      elements.push(<div key={`br-${i}`} className="h-2" />);
      continue;
    }

    // Heading **bold heading** at start of line
    if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
      elements.push(
        <p key={`h-${i}`} className="font-semibold text-sm mt-2 mb-1">
          {line.trim().replace(/\*\*/g, "")}
        </p>
      );
      continue;
    }

    // Numbered list
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      elements.push(
        <p key={`li-${i}`} className="text-xs text-muted-foreground ml-2 mb-1 leading-relaxed">
          <span className="font-medium text-foreground">{numberedMatch[1]}.</span>{" "}
          {formatInline(numberedMatch[2])}
        </p>
      );
      continue;
    }

    // Bullet (- or *)
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <p key={`bul-${i}`} className="text-xs text-muted-foreground ml-2 mb-1 leading-relaxed">
          <span className="mr-1">&#8226;</span>
          {formatInline(bulletMatch[1])}
        </p>
      );
      continue;
    }

    // Normal paragraph
    elements.push(
      <p key={`p-${i}`} className="text-xs text-muted-foreground leading-relaxed mb-1">
        {formatInline(line)}
      </p>
    );
  }

  if (inTable) flushTable();

  return <>{elements}</>;
}

/** Bold + inline code */
function formatInline(text: string): React.ReactNode {
  // Split on **bold** and --dashes--
  const parts = text.split(/(\*\*[^*]+\*\*|--[^-]+--)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith("--") && part.endsWith("--")) {
      return (
        <span key={i} className="italic text-muted-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-2.5 mb-4", isUser ? "justify-end" : "justify-start")}
    >
      {/* Agent avatar */}
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
          <Bot className="h-3.5 w-3.5" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-xl px-3.5 py-2.5",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-white/[0.04] border border-white/[0.06]"
        )}
      >
        {/* Thinking steps */}
        {!isUser && message.thinkingSteps && message.thinkingSteps.length > 0 && (
          <div className="mb-2 space-y-1">
            {message.thinkingSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/70"
              >
                <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
                <span className="italic">{step}</span>
              </motion.div>
            ))}
            {message.isStreaming && !message.content && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="italic">Thinking...</span>
              </div>
            )}
            {message.content && <div className="h-px bg-border my-1.5" />}
          </div>
        )}

        {/* Message content */}
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div>{message.content ? renderContent(message.content) : null}</div>
        )}

        {/* Streaming cursor */}
        {message.isStreaming && message.content && (
          <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom rounded-sm" />
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.div>
  );
}

export default function AgentChat() {
  const { messages, isAgentTyping, sendMessage, clearChat } = useChatStore();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages / streaming updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isAgentTyping) return;
    sendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full border border-white/[0.06] rounded-2xl bg-white/[0.03] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Ask the Agent</span>
          {isAgentTyping && (
            <Badge variant="secondary" className="text-xs bg-amber-500/15 text-amber-400">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Analyzing
            </Badge>
          )}
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={clearChat}
            title="Clear chat"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Bot className="mb-3 h-10 w-10 opacity-30" />
            <p className="text-sm font-medium mb-1">Financial Analysis Agent</p>
            <p className="text-xs max-w-[260px]">
              Ask follow-up questions about the research. Try{" "}
              <button
                className="text-primary underline underline-offset-2"
                onClick={() => {
                  setInput("What are the key risks?");
                  inputRef.current?.focus();
                }}
              >
                &quot;What are the key risks?&quot;
              </button>{" "}
              or{" "}
              <button
                className="text-primary underline underline-offset-2"
                onClick={() => {
                  setInput("Compare with peers");
                  inputRef.current?.focus();
                }}
              >
                &quot;Compare with peers&quot;
              </button>
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-2.5"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={isAgentTyping}
          className={cn(
            "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60",
            "disabled:opacity-50"
          )}
        />
        <Button
          type="submit"
          size="icon-xs"
          disabled={isAgentTyping || !input.trim()}
          className="shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  );
}
