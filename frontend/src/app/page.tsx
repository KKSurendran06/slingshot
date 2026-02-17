"use client";

import { useCallback, useState } from "react";
import SearchBar from "@/components/research/SearchBar";
import ThoughtLog from "@/components/research/ThoughtLog";
import ResearchReport from "@/components/research/ResearchReport";
import { useResearchStore } from "@/stores/research";
import { useThoughtsStore } from "@/stores/thoughts";
import { startResearch } from "@/lib/api";
import { createResearchSocket } from "@/lib/socket";
import type { ThoughtStep, Citation } from "@/types";

// Demo thought steps for showcase before backend is wired
const demoThoughts: ThoughtStep[] = [
  {
    step_number: 1,
    step_type: "planning",
    title: "Decomposing research query",
    content:
      'Breaking down "Analyze HDFC BANK" into sub-tasks: fetch financial ratios, parse investor presentation, aggregate news sentiment, compare with peers.',
    confidence: 0.95,
    tool_executions: [],
  },
  {
    step_number: 2,
    step_type: "researching",
    title: "Fetching financial ratios from Screener.in",
    content: "Extracting P/E, P/B, ROE, GNPA, NIM, CASA ratio for HDFCBANK.",
    confidence: 0.9,
    tool_executions: [{ tool_name: "screener", execution_time_ms: 1200 }],
  },
  {
    step_number: 3,
    step_type: "researching",
    title: "Parsing Q3 FY25 investor presentation",
    content:
      "Downloaded investor presentation from BSE filings. Extracting key highlights, management guidance, and financial metrics.",
    confidence: 0.85,
    tool_executions: [{ tool_name: "pdf_parser", execution_time_ms: 3400 }],
  },
  {
    step_number: 4,
    step_type: "researching",
    title: "Aggregating news and sentiment",
    content:
      "Collected 15 articles from financial news sources. Overall sentiment: Positive (72%).",
    confidence: 0.88,
    tool_executions: [{ tool_name: "news_aggregator", execution_time_ms: 2100 }],
  },
  {
    step_number: 5,
    step_type: "analyzing",
    title: "Synthesizing research data",
    content:
      "Combining financial ratios, investor presentation insights, and news sentiment to form a comprehensive analysis with citations.",
    confidence: 0.92,
    tool_executions: [],
  },
  {
    step_number: 6,
    step_type: "reflecting",
    title: "Quality check on analysis",
    content:
      "Verifying completeness: financial data present, management commentary included, peer comparison needed. Decision: PASS.",
    confidence: 0.9,
    tool_executions: [],
  },
  {
    step_number: 7,
    step_type: "reporting",
    title: "Generating final report",
    content:
      "Formatting analysis into structured report with executive summary, metrics table, detailed sections, and citation references.",
    confidence: 0.95,
    tool_executions: [],
  },
];

const demoCitations: Citation[] = [
  {
    citation_key: "cite-1",
    source_type: "screener",
    source_name: "Screener.in - HDFC Bank",
    source_url: "https://www.screener.in/company/HDFCBANK/",
    content_snippet:
      "P/E: 19.2x | P/B: 2.8x | ROE: 16.5% | GNPA: 1.24% | NIM: 3.65%",
  },
  {
    citation_key: "cite-2",
    source_type: "pdf",
    source_name: "HDFC Bank Q3 FY25 Investor Presentation",
    source_url: "https://www.bseindia.com/",
    content_snippet:
      "Management guides 18-20% credit growth for FY26, with focus on retail and MSME segments.",
    page_number: 12,
  },
  {
    citation_key: "cite-3",
    source_type: "news",
    source_name: "Economic Times",
    source_url: "https://economictimes.com/",
    content_snippet:
      "HDFC Bank merger integration progressing ahead of schedule. Branch rationalization to be complete by Q2 FY26.",
  },
];

const demoSummary = `HDFC Bank trades at 19.2x P/E, below its 5-year average of 22x, presenting a potential value opportunity [cite-1]. Asset quality remains best-in-class with GNPA at 1.24% [cite-1]. Management guides 18-20% credit growth for FY26 driven by retail and MSME expansion [cite-2]. Market sentiment is positive (72%) driven by merger integration progress [cite-3].`;

const demoReport = `Valuation Assessment:
HDFC Bank currently trades at a P/E of 19.2x and P/B of 2.8x [cite-1]. This represents a meaningful discount to its 5-year historical average P/E of 22x, suggesting the stock may be undervalued relative to its own history. The ROE of 16.5% supports a premium valuation within the banking sector [cite-1].

Asset Quality Deep Dive:
The bank maintains best-in-class asset quality metrics with Gross NPA at 1.24% and Net NPA at 0.33% [cite-1]. The Net Interest Margin (NIM) stands at 3.65%, which is among the highest in the large-cap banking space. The CASA ratio remains healthy, providing a low-cost funding advantage [cite-1].

Growth Outlook:
Management has guided for 18-20% credit growth in FY26 [cite-2], with particular focus on the retail and MSME segments. The merger integration with the erstwhile HDFC Ltd is progressing ahead of schedule [cite-3], with branch rationalization expected to complete by Q2 FY26. This should unlock significant cost synergies.

Key Risks:
1. Potential NIM compression if rate cuts accelerate
2. Integration-related execution risk from the HDFC merger
3. Regulatory tightening on unsecured lending
4. Competitive pressure from fintech and SFBs in the retail segment`;

export default function HomePage() {
  const research = useResearchStore();
  const thoughts = useThoughtsStore();
  const [showDemo, setShowDemo] = useState(false);

  const handleSearch = useCallback(
    async (query: string) => {
      research.setLoading(true);
      research.reset();
      thoughts.clearThoughts();

      try {
        const res = await startResearch({ query });
        research.setSession(res);

        // Connect WebSocket for real-time updates
        createResearchSocket(res.session_id, thoughts.handleWSEvent);
      } catch {
        // For demo purposes, show the demo data
        setShowDemo(true);
        research.setLoading(false);
        return;
      }

      research.setLoading(false);
    },
    [research, thoughts]
  );

  const handleDemoSearch = useCallback(
    (query: string) => {
      research.setLoading(true);
      research.reset();
      thoughts.clearThoughts();
      setShowDemo(false);

      // Simulate progressive thought steps
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < demoThoughts.length) {
          thoughts.handleWSEvent({
            event: "thought_step",
            session_id: "demo",
            data: demoThoughts[stepIndex],
          });
          thoughts.handleWSEvent({
            event: "status_change",
            session_id: "demo",
            status: demoThoughts[stepIndex].step_type as "planning" | "researching" | "analyzing" | "reflecting" | "reporting",
          });
          stepIndex++;
        } else {
          clearInterval(interval);
          thoughts.handleWSEvent({
            event: "status_change",
            session_id: "demo",
            status: "complete",
          });
          research.setSession({
            session_id: "demo",
            query,
            ticker: "HDFCBANK",
            status: "complete",
            thought_steps: demoThoughts,
            citations: demoCitations,
            executive_summary: demoSummary,
            full_report: demoReport,
          });
          research.setLoading(false);
        }
      }, 800);
    },
    [research, thoughts]
  );

  const displayThoughts = showDemo ? demoThoughts : thoughts.thoughts;
  const displayStatus = showDemo
    ? research.status
    : thoughts.currentStatus ?? research.status;

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="border-b bg-background px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <SearchBar
            onSearch={handleDemoSearch}
            isLoading={research.isLoading}
          />
        </div>
      </div>

      {/* Content area: Thought Log + Report */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Thought Log - left panel */}
        <div className="lg:col-span-2 border-r overflow-hidden p-4">
          <ThoughtLog thoughts={displayThoughts} status={displayStatus} />
        </div>

        {/* Research Report - right panel */}
        <div className="lg:col-span-3 overflow-auto p-6">
          <ResearchReport
            executiveSummary={research.executiveSummary}
            fullReport={research.fullReport}
            citations={research.citations}
          />
        </div>
      </div>
    </div>
  );
}
