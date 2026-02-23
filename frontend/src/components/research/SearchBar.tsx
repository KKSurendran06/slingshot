"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  isLoading = false,
  placeholder = 'Analyze any stock... e.g. "Analyze HDFC BANK"',
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 rounded-xl bg-[#1a1d23] pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:ring-1 focus:ring-[#3b82f6]/30 shadow-inner shadow-black/10"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading || !query.trim()}
        className="rounded-xl px-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Researching...
          </>
        ) : (
          "Research"
        )}
      </Button>
    </form>
  );
}
