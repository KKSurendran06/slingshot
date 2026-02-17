# Slingshot: Agentic Research System for Indian Stock Market

## Implementation Plan

---

## 1. Tech Stack

### Backend (Python)

| Component | Technology |
|-----------|------------|
| Agent Framework | **LangGraph** |
| LLM (Cloud) | **Claude 3.5 Sonnet** / **GPT-4o** |
| LLM (Local/NPU) | **Llama-3-8B-Instruct** via ONNX Runtime |
| Vector DB | **ChromaDB** |
| Embeddings | **sentence-transformers/all-MiniLM-L6-v2** |
| PDF Parsing | **PyMuPDF** + **pdfplumber** |
| Web Scraping | **httpx** + **BeautifulSoup4** + **Playwright** |
| API Framework | **FastAPI** |
| Caching | **Redis** |

### Frontend (TypeScript)

| Component | Technology |
|-----------|------------|
| Framework | **Next.js 14** (App Router) |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| State Management | **Zustand** |
| Real-time | **Socket.IO Client** |
| Charts | **Recharts** / **Tremor** |
| Animations | **Framer Motion** |

### Infrastructure

| Component | Technology |
|-----------|------------|
| Database | **PostgreSQL** (Supabase for MVP) |
| File Storage | **Supabase Storage** |
| Deployment | **Railway** (backend), **Vercel** (frontend) |
| Local NPU Runtime | **ONNX Runtime** with OpenVINO EP |

---

## 2. File Structure

```
slingshot/
├── README.md
├── IMPLEMENTATION_PLAN.md
│
├── backend/
│   ├── pyproject.toml
│   ├── .env.example
│   ├── main.py                        # FastAPI entry point
│   ├── config.py                      # Settings & environment
│   │
│   ├── api/
│   │   ├── research.py                # /api/research endpoints
│   │   ├── portfolio.py               # /api/portfolio endpoints
│   │   ├── vault.py                   # /api/vault (local processing)
│   │   └── websocket.py               # Real-time thought stream
│   │
│   ├── agents/
│   │   ├── orchestrator.py            # Main LangGraph orchestrator
│   │   ├── deep_research.py           # Feature A graph
│   │   ├── macro_analyzer.py          # Feature B graph
│   │   ├── portfolio_audit.py         # Feature C graph
│   │   └── state.py                   # LangGraph state definitions
│   │
│   ├── tools/
│   │   ├── screener.py                # Screener.in scraper
│   │   ├── nse_bse.py                 # NSE/BSE APIs
│   │   ├── pdf_parser.py              # Investor presentation parser
│   │   ├── news.py                    # News aggregation + sentiment
│   │   ├── web_search.py              # Web research for macro analysis
│   │   └── knowledge_base.py          # Industry relationships & commodity-sector graph
│   │
│   ├── rag/
│   │   ├── embeddings.py
│   │   ├── vectorstore.py
│   │   └── retriever.py
│   │
│   ├── vault/
│   │   ├── local_llm.py               # ONNX Runtime inference
│   │   ├── transaction_parser.py      # Bank statement categorization
│   │   └── stress_test.py             # Portfolio stress testing
│   │
│   ├── models.py                      # SQLAlchemy + Pydantic schemas
│   └── utils.py                       # Logging, rate limiting, helpers
│
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── .env.example
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # Landing/Dashboard
│   │   ├── globals.css
│   │   ├── research/
│   │   │   └── [id]/page.tsx          # Research result view
│   │   ├── macro/
│   │   │   └── [id]/page.tsx          # Macro analysis result view
│   │   └── portfolio/
│   │       └── page.tsx               # Portfolio dashboard + vault
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn components
│   │   ├── research/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ThoughtLog.tsx         # Real-time reasoning trace
│   │   │   └── ResearchReport.tsx     # Final rendered report
│   │   ├── macro/
│   │   │   ├── MacroSearchBar.tsx
│   │   │   ├── CausalChainViz.tsx     # Animated causal chain
│   │   │   ├── CompanyImpactCard.tsx
│   │   │   └── TradeIdeasTable.tsx
│   │   ├── portfolio/
│   │   │   ├── HoldingsTable.tsx
│   │   │   └── StressTestResults.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── lib/
│   │   ├── api.ts                     # API client
│   │   ├── socket.ts                  # WebSocket client
│   │   └── utils.ts
│   │
│   ├── stores/
│   │   ├── research.ts
│   │   └── thoughts.ts
│   │
│   └── types/
│       └── index.ts                   # All TypeScript types
│
└── docker-compose.yml                 # Postgres + Redis
```

---

## 3. Agent Logic Flow: Deep Research

### 3.1 High-Level Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER QUERY: "Analyze HDFC BANK"                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PLANNER NODE                                                                │
│  • Decompose query into sub-tasks                                            │
│  • Identify required tools                                                   │
│  • Create execution plan                                                     │
│                                                                              │
│  Output: ["fetch_ratios", "get_earnings_call", "analyze_news", "peer_comp"] │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
         ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
         │  RESEARCHER #1   │ │  RESEARCHER #2   │ │  RESEARCHER #3   │
         │  Tool: Screener  │ │  Tool: PDF Parse │ │  Tool: News Agg  │
         │  • P/E Ratio     │ │  • Q3 Earnings   │ │  • Sentiment     │
         │  • NPA Data      │ │  • Guidance      │ │  • Recent News   │
         │  • ROE/ROCE      │ │  • Management    │ │  • Events        │
         └──────────────────┘ └──────────────────┘ └──────────────────┘
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ANALYST NODE                                                                │
│  • Synthesize all gathered data                                              │
│  • Perform reasoning over financials                                         │
│  • Generate insights with citations                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CRITIC NODE                                                                 │
│  • Self-reflection on analysis quality                                       │
│  • Check for missing data points                                             │
│  • Decision: PASS → Reporter | FAIL → Back to Planner                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                          ┌───────────┴───────────┐
                          │ PASS                  │ FAIL (max 2 iterations)
                          ▼                       ▼
┌─────────────────────────────────┐    ┌─────────────────────────────┐
│  REPORTER NODE                  │    │  PLANNER (Re-plan)          │
│  • Format final report          │    │  Fill gaps, new tools       │
│  • Embed clickable citations    │    └─────────────────────────────┘
│  • Generate executive summary   │
│  • Add charts/tables            │
└─────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FINAL REPORT                                    │
│                    (Streamed to UI with citations)                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 LangGraph State Definition

The `ResearchState` TypedDict tracks:
- **Input:** query, ticker
- **Execution:** messages, plan (tasks + tools needed), current_step, thought_log
- **Data:** tool_results (with citations from each tool), citations list
- **Analysis:** analysis_draft, critic_feedback, iteration_count
- **Output:** final_report, executive_summary
- **Control:** status (planning/researching/analyzing/reflecting/reporting/complete/error), should_continue

Key models: `Citation` (source_type, source_name, url, content_snippet, page_number), `ToolResult` (tool_name, output, citations, execution_time), `ThoughtStep` (step_type, title, content, confidence), `ResearchPlan` (tasks, tools_needed, rationale).

### 3.3 Step-by-Step Execution (Deep Research for "HDFC BANK")

1. **Query Reception & Ticker Resolution** - Resolve "HDFC BANK" to "HDFCBANK.NS", initialize state
2. **Planner Node** - LLM decomposes into tasks: fetch ratios, analyze investor presentation, get earnings call, aggregate news, compare peers
3. **Researcher Node (Parallel)** - Execute tools concurrently: Screener.in scraper (P/E, NPA, ROE, NIM), PDF parser (investor presentation highlights, guidance), News aggregator (sentiment score, key themes)
4. **Analyst Node** - LLM synthesizes all data with RAG context, produces analysis covering valuation, asset quality, growth outlook, key risks, all with `[cite-X]` references
5. **Critic Node** - Self-reflection, checks completeness and citation accuracy, PASS/FAIL decision
6. **Reporter Node** - Format into structured report with executive summary, metrics table, detailed analysis, citations

---

## 4. Agent Logic Flow: Macro Analyzer (Feature B - Key Demo Feature)

The Macro Analyzer is a **smart causal reasoning engine** that connects global geopolitical/economic events to specific Indian stocks through multi-hop logical inference.

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  USER QUERY: "How will the Venezuela attack by USA affect Indian markets?" │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  EVENT PARSER NODE                                                          │
│  • Extract entities: USA, Venezuela, "attack" (military action)             │
│  • Classify event type: Geopolitical → Energy Security → Oil Supply         │
│  • Identify primary commodity: Crude Oil                                    │
│  • Determine directional impact: Supply disruption → Price increase         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CONTEXT GATHERER NODE (Parallel Web Research)                              │
│  • Web searches for Venezuela oil exports, India dependencies               │
│  • Refinery-specific research (Jamnagar heavy crude capability)             │
│  • Recent news and sanctions context                                        │
│  • Output: Contextual facts with citations                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CAUSAL CHAIN BUILDER NODE                                                  │
│  Build multi-hop reasoning chain:                                           │
│                                                                              │
│  US military action → Venezuela exports halt → Global heavy crude shortage  │
│  → Supply squeeze → Brent prices spike → Heavy-light spread widens          │
│  → Complex refinery GRM expansion                                           │
│                                                                              │
│  INSIGHT: Complex refineries (Jamnagar) earn HIGHER GRM when               │
│  heavy-light spread widens, as they can process cheaper heavy               │
│  crude that simple refineries cannot handle                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  COMPANY EXPOSURE ANALYZER NODE                                             │
│  For each potentially affected company, analyze specific exposure:          │
│                                                                              │
│  RELIANCE: Direct exposure, Nelson Complexity 14.0, GRM expansion           │
│            → STRONGLY POSITIVE (+15-20% EPS upside)                         │
│                                                                              │
│  BPCL/IOC: Simple refineries, higher crude cost, capped retail prices       │
│            → NEGATIVE (-5-10% earnings risk)                                │
│                                                                              │
│  ASIAN PAINTS: Crude derivatives = 35-40% of raw material cost              │
│            → MODERATELY NEGATIVE (-3-5% margin compression)                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  FINANCIAL IMPACT QUANTIFIER NODE                                           │
│  • Fetch current financials via Screener.in                                 │
│  • Historical correlation analysis                                          │
│  • Project revised EPS, fair value ranges                                   │
│  • Reference historical precedents (e.g., 2019 Iran sanctions)             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SYNTHESIS & REPORT NODE                                                    │
│  • Causal chain visualization data                                          │
│  • Affected tickers with impact scores                                      │
│  • Trade ideas (long/short)                                                 │
│  • Risk factors and confidence levels                                       │
│  • All citations linked                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Macro Analyzer State

The `MacroAnalyzerState` TypedDict tracks:
- **Input:** query
- **Event parsing:** parsed_event (type, actors, action, commodity, price_direction), affected_regions
- **Research:** web_research_results, news_context
- **Reasoning:** causal_chain (list of CausalLinks with from/to/relationship/confidence/evidence), reasoning_steps
- **Company analysis:** affected_companies (list of CompanyExposure with ticker, exposure_type, impact_direction/magnitude, current_metrics, projected_impact, confidence, historical_precedent), trade_ideas
- **Output:** executive_summary, full_report
- **Tracking:** thought_log, citations, status, iteration_count

### 4.3 Knowledge Base

Pre-loaded knowledge about Indian market sector dependencies, augmented by real-time web research:

- **Commodity-Sector Graph:** Maps crude_oil, natural_gas, interest_rates, currency_inr to affected sectors and specific company tickers with impact logic
- **Refinery Complexity Data:** Jamnagar (Nelson 14.0, heavy crude capable) vs BPCL (Nelson 9.5, limited), etc.
- **Geopolitical Triggers:** Maps event types (middle_east_conflict, us_china_trade_war, russia_ukraine, etc.) to affected commodities

### 4.4 Step-by-Step Execution Example

**Query:** "How will the Venezuela attack by USA affect Indian markets?"

1. **Event Parsing** - Extract military_conflict, actors [USA, Venezuela], commodity: crude_oil, price: bullish
2. **Context Gathering** - Parallel web searches for Venezuela oil exports to India, refinery sourcing, sanctions history
3. **Causal Chain Construction** - 5-step chain from military action to refinery margin impact with confidence scores
4. **Company Exposure Analysis** - Fetch financials for RELIANCE, BPCL, IOC, ASIANPAINT; analyze each company's specific exposure using knowledge base + LLM reasoning
5. **Trade Ideas** - Generate LONG/SHORT recommendations with entry/target/stoploss/conviction
6. **Report Synthesis** - Full analysis with causal chain viz data, impact cards, trade table, citations

---

## 5. Data Schema

### 5.1 PostgreSQL Schema

Core tables:
- **research_sessions** - id, user_id, query, ticker, status, timestamps
- **thought_steps** - session_id, step_number, step_type, title, content, confidence
- **tool_executions** - thought_step_id, tool_name, input_params (JSONB), output (JSONB), execution_time_ms
- **citations** - session_id, citation_key, source_type, source_name, source_url, content_snippet, page_number
- **reports** - session_id, executive_summary, full_report, report_metadata (JSONB for charts/structured data)
- **portfolios** - user_id, name, is_private
- **holdings** - portfolio_id, ticker, quantity, avg_buy_price, current_price, sector
- **stress_tests** - portfolio_id, scenario_name, parameters (JSONB), results (JSONB)

### 5.2 Pydantic Schemas (API Contracts)

**Request schemas:** ResearchRequest (query, include_news, max_iterations), PortfolioUploadRequest, StressTestRequest

**Response schemas:** CitationResponse, ToolExecutionResponse, ThoughtStepResponse, ResearchResponse (with thought_steps, citations, executive_summary, full_report)

**WebSocket events:** WSThoughtEvent, WSStatusEvent, WSReportEvent

---

## 6. API Contracts

### 6.1 REST Endpoints

```yaml
# Research
POST /api/v1/research              → Start research session
GET  /api/v1/research/{session_id} → Get full results
GET  /api/v1/research/{session_id}/report → Get final report

# Macro Analyzer
POST /api/v1/macro/analyze         → Start macro analysis
GET  /api/v1/macro/{session_id}    → Get full macro results
GET  /api/v1/macro/{session_id}/chain → Get causal chain for visualization

# Portfolio
POST /api/v1/portfolio             → Upload portfolio (CSV/PDF)
GET  /api/v1/portfolio/{id}        → Get portfolio
POST /api/v1/portfolio/{id}/stress-test → Run stress test

# Vault (Local Processing)
POST /api/v1/vault/process         → Process sensitive file locally
```

### 6.2 WebSocket Protocol

```
Connection: ws://localhost:8000/ws/research/{session_id}

Server → Client Events:
  - thought_step: Real-time reasoning trace updates
  - status_change: Planning → Researching → Analyzing → Complete
  - report_ready: Final report with citations
  - error: Error details
```

---

## 7. Feature Implementation Details

### 7.1 Feature A: Deep Research Tool

**Screener.in Scraper** - Fetches key financial ratios (P/E, P/B, ROE, GNPA, NIM, CASA) with citation tracking

**PDF Parser** - Downloads and parses investor presentations from BSE/NSE filings, extracts key highlights, guidance, management commentary, indexes chunks into vector store

**News Aggregator** - Collects articles from financial news sources, computes sentiment scores, identifies key themes

**RAG Pipeline** - ChromaDB for document storage, hybrid retrieval for analyst context

**LangGraph Orchestrator** - Planner → Researcher (parallel) → Analyst → Critic → Reporter flow with citation threading throughout

### 7.2 Feature B: Macro Analyzer (Smart Causal Reasoning)

**Event Parser** - Uses LLM with structured output to extract event type, actors, commodities, supply/demand impact, India exposure from natural language queries

**Web Research Tool** - Parallel web searches using SerpAPI/Google Custom Search, fetches and summarizes relevant content

**Causal Chain Builder** - LLM constructs multi-hop reasoning chains (3-7 hops) with confidence scores, enhanced with historical precedent lookup

**Company Exposure Analyzer** - Combines Screener.in financials with industry knowledge base (refinery complexity, commodity-sector graph) for precise impact assessment. Special logic for refinery complexity analysis (Nelson Complexity Index)

**LangGraph Workflow** - Linear flow: parse_event → gather_context → build_causal_chain → identify_companies → analyze_exposure → generate_trade_ideas → synthesize_report

### 7.3 Feature C: Private Vault (NPU Processing)

**Local LLM** - ONNX Runtime inference with OpenVINO EP for AMD Ryzen NPU, falls back to CPU

**Transaction Categorization** - Parses bank statement CSV/PDF, categorizes each transaction using local LLM

**Portfolio Stress Testing** - Scenario-based stress tests (market crash, sector rotation, rate hike) with sector-beta calculations

---

## 8. UI Components

### 8.1 Thought Log
Real-time reasoning trace panel with auto-scroll, status badges (planning/researching/analyzing/complete), animated thought steps showing tool executions and confidence scores. WebSocket-driven live updates.

### 8.2 Macro Analyzer UI

**Causal Chain Visualization** - Animated horizontal chain of event nodes connected by labeled arrows. Each node shows the event and confidence score. Uses Framer Motion for staggered reveal animation. Color-coded: red (trigger) → blue (intermediate) → green (conclusion). Gradient summary card at the bottom.

**Company Impact Cards** - Color-coded cards (green for positive, red for negative impact). Shows ticker, exposure type, impact magnitude badge, projected financial impact, confidence score, and historical precedent. Grid layout.

**Trade Ideas Table** - Sortable table with Action (LONG/SHORT badges), Ticker, Entry/Target/Stop Loss prices, Conviction level.

### 8.3 Research Report
Rendered report with:
- Executive summary bullets
- Key metrics comparison table
- Detailed analysis sections with inline clickable citation popovers (`[1]` → popover with source name, snippet, link to source)
- Sources section at bottom with source cards
- Charts and data visualizations where applicable

The frontend should render reports as **rich, visually attractive UI** (not raw markdown). Use styled components, data tables, charts, and cards to present the analysis in a polished, professional format suitable for a hackathon demo.

### 8.4 Citation System
Citations flow through the entire pipeline:
- Each tool execution generates citations with source metadata
- Analyst uses `[cite-X]` references in analysis text
- Frontend transforms `[cite-X]` into interactive popover components
- Popover shows source name, content snippet, and link to original source

---

## 9. Implementation Phases

### Phase 1: Foundation (Core Infrastructure)
- [ ] Initialize monorepo with backend (FastAPI) and frontend (Next.js)
- [ ] Set up PostgreSQL database with initial schema
- [ ] Create base tool class and tool registry
- [ ] Set up WebSocket infrastructure for real-time updates
- [ ] Build basic UI shell with Thought Log and Report panels

### Phase 2: Deep Research (Feature A)
- [ ] Implement Screener.in scraper tool
- [ ] Build PDF parser for investor presentations
- [ ] Create news aggregator with sentiment analysis
- [ ] Set up RAG pipeline with ChromaDB
- [ ] Implement LangGraph orchestrator with Planner → Researcher → Analyst → Critic → Reporter flow
- [ ] Build citation tracking system
- [ ] Add real-time thought streaming for demo impact
- [ ] Create rich report renderer with clickable citations

### Phase 3: Macro Analyzer - Key Demo Feature (Feature B)
- [ ] Implement Event Parser with entity extraction
- [ ] Build Web Research tool with parallel search
- [ ] Create Knowledge Base (commodity-sector graph, refinery data)
- [ ] Implement Causal Chain Builder with LLM reasoning
- [ ] Build Company Exposure Analyzer with financial projections
- [ ] Create LangGraph workflow for Macro Analyzer
- [ ] Add historical precedent lookup system
- [ ] Build trade ideas generator
- [ ] Create Macro Analyzer UI with animated causal chain visualization

### Phase 4: Private Vault (Feature C)
- [ ] Set up local vault service with ONNX Runtime
- [ ] Implement transaction categorization
- [ ] Build portfolio stress test engine
- [ ] Create secure file upload flow

### Phase 5: Polish & Demo Prep
- [ ] Performance optimization
- [ ] Error handling and edge cases
- [ ] Demo script preparation
- [ ] Landing page with feature highlights

---

## 10. Sample Report Content

### 10.1 Deep Research Report Content

For "Analyze HDFC BANK", the report should contain:

**Executive Summary:**
- Valuation: 19.2x P/E, below 5-year avg of 22x
- Asset Quality: Best-in-class GNPA at 1.24%
- Growth: Management guides 18-20% credit growth for FY26
- Sentiment: Positive (72%) driven by merger integration

**Key Metrics Table:** P/E, P/B, ROE, GNPA, NIM compared against peer averages with verdict

**Analysis Sections:** Valuation assessment, Asset quality deep dive, Growth outlook, Key risks - all with inline citations

**Sources:** Listed with source type icons, names, and links

### 10.2 Macro Analyzer Report Content

For "How will the Venezuela attack by USA affect Indian markets?":

**Executive Summary:** Key findings with impact direction and magnitude for each affected stock

**Causal Chain:** Visual representation of the multi-hop reasoning (US military action → exports halt → crude shortage → spread widens → GRM expansion)

**Company Analysis Cards:**
- RELIANCE: Strong positive, GRM expansion $8.5 → $11-12/bbl, +15-20% EPS upside
- BPCL/IOC: Negative, margin compression, -8-12% earnings risk
- ASIAN PAINTS: Moderately negative, raw material inflation, -3-5% margin compression

**Trade Recommendations Table:** LONG/SHORT with entry, target, stop loss, conviction

**Risk Factors:** Diplomatic resolution, OPEC response, SPR release, demand destruction

---

## 11. Environment Variables

```bash
# backend/.env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/slingshot
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
CHROMA_PERSIST_DIR=./data/chroma
LOCAL_VAULT_URL=http://localhost:8001
NPU_ENABLED=true

# frontend/.env.example
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

---

## 12. Quick Start

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -e .
cp .env.example .env  # Edit with your API keys
docker-compose up -d  # Postgres + Redis
python main.py

# Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
