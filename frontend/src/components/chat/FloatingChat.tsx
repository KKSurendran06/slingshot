"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentChat from "@/components/research/AgentChat";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Research page has its own inline AgentChat panel
  if (pathname === "/research") return null;

  return (
    <>
      {/* Floating chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-50 w-[380px] h-[520px] rounded-2xl shadow-2xl shadow-black/50 border border-[rgba(255,255,255,0.06)] overflow-hidden"
          >
            <AgentChat />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg shadow-black/40 bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-transform active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </>
  );
}
