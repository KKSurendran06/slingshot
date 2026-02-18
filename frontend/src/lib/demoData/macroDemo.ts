/**
 * Demo data for Macro Analyzer feature.
 * Scenario: "How will US sanctions on Russia affect Indian markets?"
 */

import type {
  ThoughtStep,
  CausalLink,
  CompanyExposure,
  TradeIdea,
  Citation,
} from "@/types";

// ==========================================================================
// Thought steps (progressive reasoning trace)
// ==========================================================================

export const macroThoughts: ThoughtStep[] = [
  {
    step_number: 1,
    step_type: "planning",
    title: "Analyzing geopolitical event",
    content:
      'Breaking down "US sanctions on Russia" into primary and secondary effects. Identifying transmission channels to Indian markets through energy, trade, and financial linkages.',
    confidence: 0.92,
    tool_executions: [],
  },
  {
    step_number: 2,
    step_type: "researching",
    title: "Mapping global supply chain disruptions",
    content:
      "Russia supplies ~10% of global crude oil. Sanctions will disrupt ~2-3 million barrels/day of exports, creating supply deficit in global energy markets.",
    confidence: 0.88,
    tool_executions: [
      { tool_name: "macro_chain_builder", execution_time_ms: 2800 },
    ],
  },
  {
    step_number: 3,
    step_type: "researching",
    title: "Calculating India's exposure vectors",
    content:
      "India imports ~85% of crude oil requirements. Current account deficit sensitivity: every $10/bbl increase in crude widens CAD by ~0.4% of GDP.",
    confidence: 0.9,
    tool_executions: [
      { tool_name: "india_exposure_mapper", execution_time_ms: 1900 },
    ],
  },
  {
    step_number: 4,
    step_type: "analyzing",
    title: "Identifying affected sectors and companies",
    content:
      "Primary affected sectors: Energy (upstream beneficiary, downstream negative), Aviation (ATF cost spike), Paints & Chemicals (crude derivative inputs), Metals (energy cost headwinds).",
    confidence: 0.91,
    tool_executions: [
      { tool_name: "sector_screener", execution_time_ms: 1500 },
    ],
  },
  {
    step_number: 5,
    step_type: "analyzing",
    title: "Quantifying company-level impact scores",
    content:
      "Scoring 8 companies on exposure type, impact direction, magnitude, and confidence. Cross-referencing with current financial metrics and historical sensitivity data.",
    confidence: 0.87,
    tool_executions: [
      { tool_name: "company_impact_scorer", execution_time_ms: 3200 },
    ],
  },
  {
    step_number: 6,
    step_type: "reflecting",
    title: "Cross-validating with 2022 sanctions precedent",
    content:
      "During Feb-Jun 2022, similar sanctions led to Brent spiking from $90 to $130. ONGC rallied +28%, IndiGo fell -22%, IOC fell -18%. Current setup shows comparable pattern with tighter supply dynamics.",
    confidence: 0.93,
    tool_executions: [
      { tool_name: "historical_analyzer", execution_time_ms: 2100 },
    ],
  },
  {
    step_number: 7,
    step_type: "reporting",
    title: "Generating trade recommendations",
    content:
      "Formulating 3 high-conviction trade ideas with entry, target, and stop-loss levels based on impact analysis and historical precedent.",
    confidence: 0.89,
    tool_executions: [],
  },
];

// ==========================================================================
// Causal chain
// ==========================================================================

export const macroCausalChain: CausalLink[] = [
  {
    from_event: "US Sanctions on Russia",
    to_event: "Global Oil Supply Disruption",
    relationship:
      "Sanctions restrict Russian crude exports (~2-3 mbpd), creating immediate supply gap",
    confidence: 0.95,
    evidence:
      "Russia is the world's 3rd largest oil producer; sanctions on shipping and insurance cut export capacity",
  },
  {
    from_event: "Global Oil Supply Disruption",
    to_event: "Brent Crude Spike (+15-20%)",
    relationship:
      "Supply deficit with inelastic short-term demand drives price surge",
    confidence: 0.9,
    evidence:
      "OPEC spare capacity limited to ~2 mbpd; cannot fully offset Russian supply loss",
  },
  {
    from_event: "Brent Crude Spike (+15-20%)",
    to_event: "India Import Bill Surges",
    relationship:
      "India imports 85% of crude; every $10/bbl increase adds ~$15B to annual import bill",
    confidence: 0.92,
    evidence:
      "PPAC data shows India's crude import dependency at 87.3% in FY25",
  },
  {
    from_event: "India Import Bill Surges",
    to_event: "CAD Widens & INR Pressure",
    relationship:
      "Higher energy imports widen current account deficit, putting depreciation pressure on INR",
    confidence: 0.85,
    evidence:
      "RBI estimates 0.4% GDP CAD widening per $10/bbl crude increase",
  },
  {
    from_event: "CAD Widens & INR Pressure",
    to_event: "Sector-Specific Stock Impacts",
    relationship:
      "Cascading effects: upstream producers benefit, downstream consumers face margin compression",
    confidence: 0.88,
    evidence:
      "2022 precedent showed clear bifurcation between upstream and downstream energy stocks",
  },
];

// ==========================================================================
// Affected companies
// ==========================================================================

export const macroCompanies: CompanyExposure[] = [
  {
    ticker: "ONGC",
    company_name: "Oil & Natural Gas Corp",
    exposure_type: "Upstream crude producer - higher realizations",
    impact_direction: "positive",
    impact_magnitude: "strong",
    current_metrics: { pe: 7.8, market_cap: "3.2L Cr", oil_sensitivity: "high" },
    projected_impact:
      "Every $10/bbl increase adds ~INR 4,500 Cr to annual EBITDA. Net realization uplift of 12-15%.",
    confidence: 0.93,
    historical_precedent: "During 2022 sanctions, ONGC rallied +28% in 4 months",
  },
  {
    ticker: "RELIANCE",
    company_name: "Reliance Industries",
    exposure_type: "Complex - refining margins up, petchem costs rise",
    impact_direction: "positive",
    impact_magnitude: "moderate",
    current_metrics: {
      pe: 26.5,
      market_cap: "19.8L Cr",
      grm_sensitivity: "moderate",
    },
    projected_impact:
      "Singapore GRM expansion of $2-3/bbl benefits refining segment. Partially offset by higher petchem feedstock costs.",
    confidence: 0.85,
    historical_precedent:
      "Reliance GRM expanded from $8 to $15/bbl during 2022 crude spike",
  },
  {
    ticker: "IOC",
    company_name: "Indian Oil Corporation",
    exposure_type: "Downstream OMC - margin compression without price hikes",
    impact_direction: "negative",
    impact_magnitude: "strong",
    current_metrics: { pe: 11.2, market_cap: "1.9L Cr", under_recovery: "high" },
    projected_impact:
      "Under-recovery on diesel/petrol widens by INR 5-8/litre. Government may delay retail price revision pre-state elections.",
    confidence: 0.91,
    historical_precedent:
      "IOC fell -18% during 2022 crude spike; under-recoveries peaked at INR 20/litre",
  },
  {
    ticker: "BPCL",
    company_name: "Bharat Petroleum",
    exposure_type: "Downstream OMC - margin compression",
    impact_direction: "negative",
    impact_magnitude: "strong",
    current_metrics: {
      pe: 12.5,
      market_cap: "1.3L Cr",
      under_recovery: "high",
    },
    projected_impact:
      "Similar dynamics to IOC. Higher crude procurement costs without corresponding retail price increases squeeze margins.",
    confidence: 0.89,
    historical_precedent: "BPCL fell -21% during 2022 crude spike",
  },
  {
    ticker: "INDIGO",
    company_name: "InterGlobe Aviation",
    exposure_type: "ATF constitutes 40% of operating costs",
    impact_direction: "negative",
    impact_magnitude: "strong",
    current_metrics: {
      pe: 32.1,
      market_cap: "1.6L Cr",
      atf_cost_share: "40%",
    },
    projected_impact:
      "ATF prices directly linked to crude. 15-20% crude spike translates to ~6-8% increase in total operating costs, destroying EBITDA margins.",
    confidence: 0.94,
    historical_precedent:
      "IndiGo fell -22% during 2022 crude spike; EBITDA margin contracted from 18% to 9%",
  },
  {
    ticker: "ASIANPAINT",
    company_name: "Asian Paints",
    exposure_type: "Crude derivatives (TiO2, monomers) in raw materials",
    impact_direction: "negative",
    impact_magnitude: "moderate",
    current_metrics: {
      pe: 55.2,
      market_cap: "2.8L Cr",
      rm_cost_crude_link: "35%",
    },
    projected_impact:
      "~35% of raw material cost linked to crude derivatives. Gross margin contraction of 150-200 bps expected with limited near-term pricing power.",
    confidence: 0.82,
    historical_precedent:
      "Asian Paints gross margins fell 400bps in FY23 due to input cost inflation",
  },
  {
    ticker: "COALINDIA",
    company_name: "Coal India",
    exposure_type: "Substitute demand increase as energy costs rise",
    impact_direction: "positive",
    impact_magnitude: "moderate",
    current_metrics: {
      pe: 7.5,
      market_cap: "2.9L Cr",
      energy_substitute: "high",
    },
    projected_impact:
      "Higher oil/gas prices increase relative attractiveness of coal for power generation. Volume growth of 3-5% likely as thermal plants ramp up.",
    confidence: 0.8,
    historical_precedent:
      "Coal India rallied +15% during 2022 energy crisis; e-auction premiums rose 40%",
  },
  {
    ticker: "TATASTEEL",
    company_name: "Tata Steel",
    exposure_type: "Energy costs in steel production",
    impact_direction: "negative",
    impact_magnitude: "mild",
    current_metrics: {
      pe: 18.3,
      market_cap: "1.8L Cr",
      energy_cost_share: "25%",
    },
    projected_impact:
      "Energy constitutes ~25% of steel production cost. Impact partially offset by coking coal pricing dynamics which move differently from crude.",
    confidence: 0.75,
    historical_precedent:
      "Tata Steel showed -8% correction during 2022 but recovered within 2 months",
  },
];

// ==========================================================================
// Trade ideas
// ==========================================================================

export const macroTradeIdeas: TradeIdea[] = [
  {
    action: "LONG",
    ticker: "ONGC",
    entry_price: 285,
    target_price: 340,
    stop_loss: 265,
    conviction: "high",
    rationale:
      "Direct beneficiary of crude price spike. Trades at 7.8x P/E, significant room for re-rating. Every $10/bbl adds INR 4,500 Cr to EBITDA. Historical precedent shows +28% upside in similar setups.",
  },
  {
    action: "SHORT",
    ticker: "INDIGO",
    entry_price: 4200,
    target_price: 3600,
    stop_loss: 4450,
    conviction: "high",
    rationale:
      "ATF costs are 40% of opex with no hedging. 15-20% crude spike will destroy margins. Trading at 32x P/E leaves no room for earnings disappointment. 2022 analog showed -22% correction.",
  },
  {
    action: "LONG",
    ticker: "COALINDIA",
    entry_price: 480,
    target_price: 550,
    stop_loss: 450,
    conviction: "medium",
    rationale:
      "Beneficiary of energy substitution effect. Cheap valuation at 7.5x P/E provides margin of safety. E-auction premiums likely to expand as thermal power demand rises.",
  },
];

// ==========================================================================
// Citations
// ==========================================================================

export const macroCitations: Citation[] = [
  {
    citation_key: "cite-1",
    source_type: "news",
    source_name: "Reuters - Russian oil exports face new disruption",
    source_url: "https://www.reuters.com/",
    content_snippet:
      "US Treasury Department announced expanded sanctions targeting Russian crude oil exports, shipping, and insurance providers. Estimated 2-3 million barrels per day of Russian exports face disruption.",
  },
  {
    citation_key: "cite-2",
    source_type: "web",
    source_name: "PPAC India - Petroleum Import Data FY25",
    source_url: "https://www.ppac.gov.in/",
    content_snippet:
      "India's crude oil import dependency stood at 87.3% in FY25. Total petroleum import bill was $154.2 billion, with an average crude basket price of $82.3/barrel.",
  },
  {
    citation_key: "cite-3",
    source_type: "pdf",
    source_name: "RBI Monetary Policy Bulletin - Inflation Transmission",
    source_url: "https://www.rbi.org.in/",
    content_snippet:
      "Pass-through coefficient of international crude prices to domestic CPI inflation estimated at 0.03-0.05 with a 3-month lag. CAD sensitivity to crude: 0.4% of GDP per $10/bbl increase.",
    page_number: 24,
  },
  {
    citation_key: "cite-4",
    source_type: "pdf",
    source_name: "ICICI Securities - Oil Price Sensitivity Analysis",
    source_url: "https://www.icicisecurities.com/",
    content_snippet:
      "For every $10/bbl increase: ONGC EBITDA rises INR 4,500 Cr, IOC under-recovery widens INR 5-8/litre, IndiGo ATF costs increase 6-8% of total opex. OMCs most vulnerable without retail price revision.",
    page_number: 8,
  },
  {
    citation_key: "cite-5",
    source_type: "news",
    source_name: "Bloomberg - India Markets During 2022 Russia Sanctions",
    source_url: "https://www.bloomberg.com/",
    content_snippet:
      "Retrospective analysis: Brent spiked from $90 to $130 (Feb-Jun 2022). ONGC +28%, Reliance +12%, IOC -18%, BPCL -21%, IndiGo -22%. Impact played out over 4-6 months with downstream OMCs worst affected.",
  },
];

// ==========================================================================
// Written report: Executive Summary
// ==========================================================================

export const macroExecutiveSummary = `US sanctions on Russia are creating a significant supply disruption in global crude oil markets, with Brent prices projected to spike 15-20% from current levels as approximately 2-3 million barrels per day of Russian exports face restrictions [cite-1]. India, which imports approximately 85% of its crude requirements [cite-2], faces direct exposure through a widening current account deficit and elevated inflation risk. The RBI estimates that every $10/barrel increase in crude widens the CAD by ~0.4% of GDP [cite-3]. The transmission chain flows through energy costs into transportation, chemicals, and manufacturing sectors. Primary beneficiaries are upstream producers like ONGC, which gain from higher crude realizations — every $10/bbl adds INR 4,500 Cr to EBITDA [cite-4] — while downstream OMCs (IOC, BPCL) face margin compression without corresponding retail price hikes. Airlines (IndiGo) and paint companies (Asian Paints) with high crude-derivative input costs are particularly vulnerable. Historical analysis of the 2022 Russia-Ukraine sanctions episode shows a similar pattern played out over 4-6 months, with ONGC rallying +28% and IndiGo falling -22% [cite-5].`;

// ==========================================================================
// Written report: Full Detailed Analysis
// ==========================================================================

export const macroFullReport = `Geopolitical Context & Transmission Mechanism:
The latest round of US sanctions targets Russia's crude oil export infrastructure, including shipping companies, insurance providers, and port facilities. With Russia being the world's third-largest oil producer, these sanctions are estimated to disrupt 2-3 million barrels per day of exports [cite-1]. OPEC's spare capacity, limited to approximately 2 million barrels per day, cannot fully offset this supply loss. The resulting supply-demand imbalance is projected to push Brent crude prices 15-20% higher from current levels.

The transmission to Indian markets operates through multiple channels: (1) direct cost impact on crude-importing companies, (2) inflationary pressure through fuel and transportation costs, (3) current account deterioration putting pressure on INR, and (4) potential monetary policy tightening by RBI to anchor inflation expectations.

India Macro Impact:
India's crude oil import dependency stood at 87.3% in FY25, with a total petroleum import bill of $154.2 billion [cite-2]. Every $10/barrel increase in the crude basket adds approximately $15 billion to the annual import bill. The Reserve Bank of India estimates that this translates to a 0.4% of GDP widening in the current account deficit [cite-3], which in turn puts depreciation pressure on the Indian Rupee.

The inflation pass-through coefficient from international crude to domestic CPI is estimated at 0.03-0.05 with a 3-month lag [cite-3]. If crude sustains at elevated levels, headline CPI could breach the RBI's 6% upper tolerance band, constraining monetary policy flexibility. The government faces a difficult trade-off between allowing retail fuel prices to rise (worsening inflation) or absorbing the cost through OMC under-recoveries and fiscal subsidies.

Sector-by-Sector Impact Assessment:
Energy Upstream (ONGC, Oil India): Direct beneficiaries with every $10/bbl increase adding approximately INR 4,500 Cr to ONGC's annual EBITDA [cite-4]. Net realizations improve by 12-15%. The sector trades at depressed valuations (ONGC at 7.8x P/E), providing room for significant re-rating.

Downstream OMCs (IOC, BPCL, HPCL): Most vulnerable segment. Under-recovery on diesel and petrol widens by INR 5-8 per litre [cite-4]. With state elections in several states, the government is unlikely to approve retail price hikes in the near term. Marketing margins, which had recovered to INR 3-4/litre, could swing to losses of INR 5-8/litre.

Aviation (IndiGo, SpiceJet): Aviation Turbine Fuel constitutes approximately 40% of airline operating costs. A 15-20% crude spike translates directly to a 6-8% increase in total operating costs, compressing EBITDA margins significantly. IndiGo, trading at 32x P/E, is priced for margin expansion — any disappointment will be severely punished [cite-4].

Paints & Chemicals (Asian Paints, Berger): Approximately 35% of raw material costs are linked to crude derivatives (TiO2, monomers, solvents). Gross margin contraction of 150-200 basis points is expected with limited near-term pricing power in a competitive market. The premium valuation (Asian Paints at 55x P/E) offers no buffer for earnings misses.

Historical Precedent — 2022 Sanctions:
The February-June 2022 period provides a directly comparable scenario. Following the initial Russia-Ukraine sanctions, Brent crude spiked from $90 to $130 per barrel over four months [cite-5]. The stock market impact was swift and decisive: ONGC rallied +28%, Reliance Industries gained +12% on expanding GRM, while downstream names suffered significantly — IOC fell -18%, BPCL declined -21%, and IndiGo corrected -22% [cite-5].

The current setup differs in two important ways: (1) Russian export infrastructure has partially diversified to Asian buyers, potentially limiting the supply disruption, and (2) India's Strategic Petroleum Reserve is better stocked than in 2022, providing a 2-3 month buffer. However, the core transmission mechanism — crude price spike leading to sector-specific stock impacts — remains identical.

The 2022 episode resolved over 4-6 months as alternative supply routes were established and demand destruction at higher prices created a natural ceiling. We expect a similar timeline for the current scenario, suggesting a 3-6 month window for the trade ideas outlined above.`;
