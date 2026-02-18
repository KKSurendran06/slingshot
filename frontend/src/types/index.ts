// All TypeScript types for Slingshot

// ==========================================================================
// Citation & Tool types
// ==========================================================================

export interface Citation {
  citation_key: string;
  source_type: "screener" | "pdf" | "news" | "web" | string;
  source_name: string;
  source_url?: string;
  content_snippet?: string;
  page_number?: number;
}

export interface ToolExecution {
  tool_name: string;
  execution_time_ms?: number;
}

// ==========================================================================
// Thought / Reasoning types
// ==========================================================================

export type StepType =
  | "planning"
  | "researching"
  | "analyzing"
  | "reflecting"
  | "reporting";

export interface ThoughtStep {
  step_number: number;
  step_type: StepType;
  title: string;
  content?: string;
  confidence?: number;
  tool_executions: ToolExecution[];
}

// ==========================================================================
// Research types
// ==========================================================================

export type ResearchStatus =
  | "planning"
  | "researching"
  | "analyzing"
  | "reflecting"
  | "reporting"
  | "complete"
  | "error";

export interface ResearchRequest {
  query: string;
  include_news?: boolean;
  max_iterations?: number;
}

export interface ResearchResponse {
  session_id: string;
  query: string;
  ticker?: string;
  status: ResearchStatus;
  thought_steps: ThoughtStep[];
  citations: Citation[];
  executive_summary?: string;
  full_report?: string;
}

// ==========================================================================
// Macro Analyzer types
// ==========================================================================

export interface CausalLink {
  from_event: string;
  to_event: string;
  relationship: string;
  confidence: number;
  evidence?: string;
}

export interface CompanyExposure {
  ticker: string;
  company_name: string;
  exposure_type: string;
  impact_direction: "positive" | "negative" | "neutral";
  impact_magnitude: "strong" | "moderate" | "mild";
  current_metrics: Record<string, unknown>;
  projected_impact: string;
  confidence: number;
  historical_precedent?: string;
}

export interface TradeIdea {
  action: "LONG" | "SHORT";
  ticker: string;
  entry_price?: number;
  target_price?: number;
  stop_loss?: number;
  conviction: "high" | "medium" | "low";
  rationale: string;
}

export interface MacroAnalysisResponse {
  session_id: string;
  query: string;
  status: string;
  causal_chain: CausalLink[];
  affected_companies: CompanyExposure[];
  trade_ideas: TradeIdea[];
  executive_summary?: string;
  full_report?: string;
  citations: Citation[];
}

// ==========================================================================
// WebSocket event types
// ==========================================================================

export interface WSThoughtEvent {
  event: "thought_step";
  session_id: string;
  data: ThoughtStep;
}

export interface WSStatusEvent {
  event: "status_change";
  session_id: string;
  status: ResearchStatus;
}

export interface WSReportEvent {
  event: "report_ready";
  session_id: string;
  executive_summary: string;
  full_report: string;
}

export interface WSErrorEvent {
  event: "error";
  session_id: string;
  message: string;
}

export type WSEvent =
  | WSThoughtEvent
  | WSStatusEvent
  | WSReportEvent
  | WSErrorEvent;

// ==========================================================================
// Portfolio types
// ==========================================================================

export interface Holding {
  ticker: string;
  quantity: number;
  avg_buy_price: number;
  current_price?: number;
  sector?: string;
}

export interface Portfolio {
  id: string;
  name: string;
  holdings: Holding[];
}

export interface StressTestResult {
  scenario_name: string;
  description: string;
  impact_percentage: number;
  severity: "low" | "moderate" | "high" | "severe";
  parameters: Record<string, unknown>;
  results: Record<string, unknown>;
}

export interface PortfolioMetrics {
  total_value: number;
  total_invested: number;
  total_return_pct: number;
  risk_score: number;
  portfolio_beta: number;
}

export interface SectorAllocation {
  sector: string;
  weight: number;
  value: number;
}

export interface PortfolioAnalysisResponse {
  portfolio: Portfolio;
  metrics: PortfolioMetrics;
  sector_allocation: SectorAllocation[];
  stress_tests: StressTestResult[];
  recommendations: string[];
  citations: Citation[];
  executive_summary: string;
  full_report: string;
}

// ==========================================================================
// Chat types (Agent Chat in Deep Research mode)
// ==========================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: number;
  /** Optional thinking steps the agent "shows" while generating */
  thinkingSteps?: string[];
  /** Whether the agent is still streaming / typing */
  isStreaming?: boolean;
}
