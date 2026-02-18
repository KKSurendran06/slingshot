/**
 * Demo data for Portfolio Scanner feature.
 * Scenario: Pre-loaded "Sample Growth Portfolio" with 10 holdings.
 */

import type {
  ThoughtStep,
  Holding,
  Portfolio,
  PortfolioMetrics,
  SectorAllocation,
  StressTestResult,
  Citation,
} from "@/types";

// ==========================================================================
// Thought steps (progressive reasoning trace)
// ==========================================================================

export const portfolioThoughts: ThoughtStep[] = [
  {
    step_number: 1,
    step_type: "planning",
    title: "Loading portfolio data",
    content:
      'Parsing 10 holdings from "Sample Growth Portfolio". Validating tickers and quantities against exchange data.',
    confidence: 0.95,
    tool_executions: [],
  },
  {
    step_number: 2,
    step_type: "researching",
    title: "Fetching current market prices",
    content:
      "Retrieving real-time prices for all 10 holdings from NSE. Calculating current portfolio value and individual position P&L.",
    confidence: 0.92,
    tool_executions: [
      { tool_name: "price_fetcher", execution_time_ms: 1100 },
    ],
  },
  {
    step_number: 3,
    step_type: "analyzing",
    title: "Computing portfolio metrics & allocation",
    content:
      "Calculating total value, weighted returns, sector concentration, and portfolio beta. Comparing allocation against Nifty 50 benchmark weights.",
    confidence: 0.9,
    tool_executions: [
      { tool_name: "portfolio_analyzer", execution_time_ms: 1800 },
    ],
  },
  {
    step_number: 4,
    step_type: "analyzing",
    title: "Running Monte Carlo stress tests",
    content:
      "Simulating 4 stress scenarios: market crash, IT sector correction, interest rate hike, and rupee depreciation. Running 10,000 iterations per scenario.",
    confidence: 0.88,
    tool_executions: [
      { tool_name: "stress_tester", execution_time_ms: 4200 },
    ],
  },
  {
    step_number: 5,
    step_type: "analyzing",
    title: "Comparing against Nifty 50 benchmark",
    content:
      "IT sector allocation at 28% vs benchmark 15% — significant overweight. Banking at 24% vs benchmark 26% — roughly in line. Missing pharma and FMCG exposure relative to benchmark.",
    confidence: 0.91,
    tool_executions: [
      { tool_name: "benchmark_comparator", execution_time_ms: 900 },
    ],
  },
  {
    step_number: 6,
    step_type: "reflecting",
    title: "Identifying concentration risks",
    content:
      "BHARTIARTL single-stock concentration at 13% of portfolio value after +97.6% appreciation. IT sector concentration creates vulnerability to global tech slowdown. No defensive sector allocation (pharma, FMCG underweight).",
    confidence: 0.93,
    tool_executions: [],
  },
  {
    step_number: 7,
    step_type: "reporting",
    title: "Generating rebalancing recommendations",
    content:
      "Formulating 4 actionable recommendations based on concentration analysis, stress test results, and benchmark deviation. Prioritizing by risk impact.",
    confidence: 0.9,
    tool_executions: [],
  },
];

// ==========================================================================
// Portfolio holdings
// ==========================================================================

export const demoHoldings: Holding[] = [
  {
    ticker: "RELIANCE",
    quantity: 50,
    avg_buy_price: 2450,
    current_price: 2890,
    sector: "Energy",
  },
  {
    ticker: "HDFCBANK",
    quantity: 100,
    avg_buy_price: 1580,
    current_price: 1720,
    sector: "Banking",
  },
  {
    ticker: "TCS",
    quantity: 30,
    avg_buy_price: 3200,
    current_price: 4150,
    sector: "IT",
  },
  {
    ticker: "INFY",
    quantity: 80,
    avg_buy_price: 1420,
    current_price: 1580,
    sector: "IT",
  },
  {
    ticker: "BHARTIARTL",
    quantity: 120,
    avg_buy_price: 850,
    current_price: 1680,
    sector: "Telecom",
  },
  {
    ticker: "ITC",
    quantity: 200,
    avg_buy_price: 380,
    current_price: 475,
    sector: "FMCG",
  },
  {
    ticker: "TITAN",
    quantity: 25,
    avg_buy_price: 2800,
    current_price: 3650,
    sector: "Consumer",
  },
  {
    ticker: "ASIANPAINT",
    quantity: 40,
    avg_buy_price: 3100,
    current_price: 2950,
    sector: "Paints",
  },
  {
    ticker: "SBIN",
    quantity: 150,
    avg_buy_price: 620,
    current_price: 780,
    sector: "Banking",
  },
  {
    ticker: "MARUTI",
    quantity: 15,
    avg_buy_price: 10200,
    current_price: 12800,
    sector: "Auto",
  },
];

export const demoPortfolio: Portfolio = {
  id: "demo-portfolio",
  name: "Sample Growth Portfolio",
  holdings: demoHoldings,
};

// ==========================================================================
// Calculated metrics
// ==========================================================================

// Total invested: 50*2450 + 100*1580 + 30*3200 + 80*1420 + 120*850 + 200*380 + 25*2800 + 40*3100 + 150*620 + 15*10200
// = 122500 + 158000 + 96000 + 113600 + 102000 + 76000 + 70000 + 124000 + 93000 + 153000 = 1108100
// Total value: 50*2890 + 100*1720 + 30*4150 + 80*1580 + 120*1680 + 200*475 + 25*3650 + 40*2950 + 150*780 + 15*12800
// = 144500 + 172000 + 124500 + 126400 + 201600 + 95000 + 91250 + 118000 + 117000 + 192000 = 1382250

export const demoMetrics: PortfolioMetrics = {
  total_value: 1382250,
  total_invested: 1108100,
  total_return_pct: 24.7,
  risk_score: 7.2,
  portfolio_beta: 1.12,
};

// ==========================================================================
// Sector allocation
// ==========================================================================

export const demoSectorAllocation: SectorAllocation[] = [
  { sector: "IT", weight: 18.1, value: 250900 },
  { sector: "Telecom", weight: 14.6, value: 201600 },
  { sector: "Auto", weight: 13.9, value: 192000 },
  { sector: "Banking", weight: 20.9, value: 289000 },
  { sector: "Energy", weight: 10.5, value: 144500 },
  { sector: "FMCG", weight: 6.9, value: 95000 },
  { sector: "Consumer", weight: 6.6, value: 91250 },
  { sector: "Paints", weight: 8.5, value: 118000 },
];

// ==========================================================================
// Stress test results
// ==========================================================================

export const demoStressTests: StressTestResult[] = [
  {
    scenario_name: "Market Crash (-20%)",
    description: "Broad market selloff with Nifty 50 declining 20%",
    impact_percentage: -22.3,
    severity: "severe",
    parameters: { market_decline: -20, correlation: 0.85 },
    results: {
      portfolio_loss: -308642,
      worst_hit: "BHARTIARTL (-26.8%)",
      best_held: "ITC (-12.1%)",
    },
  },
  {
    scenario_name: "IT Sector Correction (-15%)",
    description:
      "Technology sector correction driven by global IT spending slowdown",
    impact_percentage: -4.2,
    severity: "moderate",
    parameters: { it_decline: -15, spillover: 0.1 },
    results: {
      portfolio_loss: -58055,
      worst_hit: "TCS (-16.2%)",
      best_held: "COALINDIA (+0.3%)",
    },
  },
  {
    scenario_name: "Rate Hike (+100 bps)",
    description: "RBI raises repo rate by 100 basis points to combat inflation",
    impact_percentage: -3.8,
    severity: "moderate",
    parameters: { rate_hike_bps: 100, duration_months: 6 },
    results: {
      portfolio_loss: -52526,
      worst_hit: "HDFCBANK (-6.8%)",
      best_held: "ITC (-0.5%)",
    },
  },
  {
    scenario_name: "INR Depreciation (-5%)",
    description: "Rupee weakens 5% against USD on capital outflows",
    impact_percentage: 1.2,
    severity: "low",
    parameters: { inr_decline: -5, fii_outflow: true },
    results: {
      portfolio_gain: 16587,
      best_performer: "TCS (+4.2%)",
      worst_hit: "MARUTI (-2.1%)",
    },
  },
];

// ==========================================================================
// Recommendations
// ==========================================================================

export const demoRecommendations: string[] = [
  "Reduce IT concentration from 18% to 12% by trimming TCS and INFY positions — sell 10 shares of TCS and 30 shares of INFY",
  "Add defensive exposure — consider allocating 8-10% to pharma/FMCG names like NESTLEIND or HINDUNILVR to reduce portfolio beta",
  "ASIANPAINT is the lone underperformer at -4.8% — evaluate thesis given crude input cost headwinds or consider exiting",
  "BHARTIARTL has returned +97.6% — consider booking partial profits on 40 shares to reduce single-stock concentration from 14.6% to ~10%",
];

// ==========================================================================
// Citations
// ==========================================================================

export const portfolioCitations: Citation[] = [
  {
    citation_key: "cite-1",
    source_type: "web",
    source_name: "NSE India - Nifty 50 Sector Weight Composition",
    source_url: "https://www.nseindia.com/",
    content_snippet:
      "Nifty 50 sector weights: Financial Services 33.8%, IT 14.6%, Oil & Gas 11.5%, Consumer Goods 9.2%, Automobile 7.8%, Pharma 4.5%, Telecom 3.2%, Metals 3.1%.",
  },
  {
    citation_key: "cite-2",
    source_type: "screener",
    source_name: "Screener.in - Portfolio Beta & Volatility Calculator",
    source_url: "https://www.screener.in/",
    content_snippet:
      "Weighted portfolio beta: 1.12 (above market). Portfolio standard deviation: 18.3% (annualized). Sharpe ratio: 0.82. Maximum drawdown potential: 24.5% based on historical volatility.",
  },
  {
    citation_key: "cite-3",
    source_type: "pdf",
    source_name: "VaR Model - Monte Carlo Stress Test Simulation",
    source_url: "#",
    content_snippet:
      "10,000 iteration Monte Carlo simulation results. 95th percentile VaR: -12.4% (monthly). Worst-case scenario (market crash -20%): portfolio drawdown of -22.3% driven by high-beta holdings.",
    page_number: 3,
  },
  {
    citation_key: "cite-4",
    source_type: "pdf",
    source_name: "ICICI Direct - Asian Paints Sector Outlook",
    source_url: "https://www.icicidirect.com/",
    content_snippet:
      "Asian Paints facing headwinds from elevated crude derivative costs (TiO2, VAM, phthalic anhydride). Gross margins contracted 400bps YoY. Competitive intensity increasing from Birla Opus entry. Downgrade to HOLD.",
    page_number: 15,
  },
  {
    citation_key: "cite-5",
    source_type: "web",
    source_name: "Morningstar India - Portfolio Optimization Strategies",
    source_url: "https://www.morningstar.in/",
    content_snippet:
      "Defensive rebalancing: shifting 8-10% allocation from high-beta to low-beta sectors (FMCG, Pharma) can reduce portfolio volatility by 15-20% while maintaining 80-85% of expected returns.",
  },
];

// ==========================================================================
// Written report: Executive Summary
// ==========================================================================

export const portfolioExecutiveSummary = `This portfolio of 10 holdings valued at INR 13.82 lakhs shows a healthy overall return of +24.7%, but exhibits notable concentration and sector risks. IT sector allocation at 18.1% combined with Telecom at 14.6% creates significant technology-adjacent exposure [cite-1]. The portfolio's effective beta of 1.12 implies higher-than-market volatility, with an annualized standard deviation of 18.3% [cite-2]. Stress testing reveals that a 20% market correction would result in a 22.3% drawdown, primarily driven by high-beta holdings BHARTIARTL and TITAN [cite-3]. BHARTIARTL has returned +97.6% from cost, creating a single-stock concentration risk of 14.6% of portfolio value. Asian Paints is the lone underperformer at -4.8%, warranting a thesis review given sector headwinds from crude input costs and increased competition [cite-4]. Rebalancing toward defensive sectors (FMCG, Pharma) could reduce portfolio beta to 0.95 while maintaining 80-85% of projected returns [cite-5].`;

// ==========================================================================
// Written report: Full Detailed Analysis
// ==========================================================================

export const portfolioFullReport = `Portfolio Composition & Allocation:
The portfolio holds 10 large-cap Indian equities across 8 sectors, with a total invested amount of INR 11.08 lakhs and current value of INR 13.82 lakhs. The Herfindahl-Hirschman Index (HHI) for sector concentration stands at 1,485, indicating moderate concentration risk.

Compared to the Nifty 50 benchmark weights [cite-1], the portfolio is overweight in Telecom (14.6% vs benchmark 3.2%), Auto (13.9% vs benchmark 7.8%), and Paints (8.5% vs benchmark ~1%). It is underweight in Financial Services (20.9% vs benchmark 33.8%) and has zero allocation to Pharmaceuticals (benchmark 4.5%). The missing pharma allocation removes a natural defensive hedge from the portfolio.

The top 3 holdings (BHARTIARTL, HDFCBANK, MARUTI) account for 47.3% of portfolio value, creating significant single-stock risk. BHARTIARTL alone at 14.6% exceeds the commonly recommended 10% single-stock limit.

Performance Attribution:
The portfolio's +24.7% return has been driven primarily by three outperformers: BHARTIARTL (+97.6%, contributing 7.2pp to total returns), TCS (+29.7%, contributing 2.1pp), and TITAN (+30.4%, contributing 1.5pp). The banking duo of HDFCBANK (+8.9%) and SBIN (+25.8%) provided steady mid-range contributions.

ASIANPAINT is the sole detractor at -4.8%, subtracting 0.5pp from total returns. This underperformance is attributable to crude derivative input cost headwinds and increased competitive intensity from Birla Opus's market entry [cite-4]. MARUTI (+25.5%) has been a surprise contributor, benefiting from the rural recovery and new model cycle.

Risk Assessment:
The portfolio beta of 1.12 indicates above-market systematic risk [cite-2]. This is primarily driven by BHARTIARTL (stock beta: 1.35), TITAN (beta: 1.28), and MARUTI (beta: 1.18). The portfolio's annualized volatility of 18.3% exceeds the Nifty 50's historical volatility of approximately 15%.

Correlation analysis reveals high pairwise correlation between TCS and INFY (0.82), which amplifies IT-sector risk. The maximum drawdown potential, based on historical volatility patterns, is estimated at 24.5%. The portfolio's Sharpe ratio of 0.82 is acceptable but below the optimal range of 1.0-1.5 [cite-2].

Stress Test Analysis:
Four stress scenarios were evaluated using a Monte Carlo simulation with 10,000 iterations [cite-3]:

1. Market Crash (-20%): The portfolio declines -22.3%, worse than the market due to its above-1 beta. BHARTIARTL and TITAN lead losses due to high beta, while ITC provides relative safety with only -12.1% decline due to its defensive characteristics.

2. IT Sector Correction (-15%): A targeted IT selloff impacts the portfolio by -4.2%, contained by IT's 18.1% weight. TCS bears the brunt at -16.2%. The limited spillover to non-IT names keeps overall damage manageable.

3. Rate Hike (+100 bps): Rising rates primarily impact rate-sensitive financials. HDFCBANK declines -6.8% as NIM expansion expectations are priced in. Overall portfolio impact of -3.8% is moderate, partially offset by FMCG and IT resilience.

4. INR Depreciation (-5%): This is actually a net positive scenario (+1.2%) as IT exporters (TCS +4.2%, INFY +3.8%) benefit from rupee weakness, more than offsetting import-dependent names like MARUTI (-2.1%).

Rebalancing Recommendations:
Based on the analysis above, four specific actions are recommended in order of priority:

First, reduce single-stock concentration in BHARTIARTL by selling 40 of 120 shares. This brings the allocation from 14.6% to approximately 10%, locking in substantial profits while maintaining meaningful exposure to the telecom growth story.

Second, trim IT exposure by selling 10 shares of TCS and 30 shares of INFY. This reduces combined IT allocation from 18.1% to approximately 12%, closer to the Nifty 50 benchmark weight of 14.6% [cite-1]. The freed-up capital should be redirected to defensive sectors.

Third, allocate 8-10% of portfolio value to pharma/FMCG names such as NESTLEIND, HINDUNILVR, or SUNPHARMA. Research indicates that this defensive rebalancing can reduce portfolio volatility by 15-20% while maintaining 80-85% of expected returns [cite-5]. This also closes the pharma allocation gap relative to the benchmark.

Fourth, evaluate the ASIANPAINT position. With the stock down -4.8% and facing structural headwinds from crude input costs and Birla Opus competition [cite-4], the original investment thesis should be re-examined. If the thesis no longer holds, consider exiting the full position and redirecting to a less challenged consumer play.`;
