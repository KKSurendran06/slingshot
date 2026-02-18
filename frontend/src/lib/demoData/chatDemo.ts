/**
 * Scripted demo responses for the Agent Chat in Deep Research mode.
 *
 * The matcher picks the first entry whose `keywords` overlap with the user
 * prompt (case-insensitive).  If nothing matches, `fallbackResponse` is used.
 */

export interface ScriptedReply {
  keywords: string[];
  thinkingSteps: string[];
  response: string;
}

export const scriptedReplies: ScriptedReply[] = [
  // ---------- valuation / PE / PB ----------
  {
    keywords: ["valuation", "pe", "p/e", "price to earnings", "pb", "p/b", "overvalued", "undervalued"],
    thinkingSteps: [
      "Retrieving latest valuation ratios from Screener.in...",
      "Comparing P/E against 5-year median and sector average...",
      "Cross-checking with consensus analyst targets...",
    ],
    response: `**HDFC Bank Valuation Snapshot**

| Metric | Current | 5Y Avg | Sector Median |
|--------|---------|--------|---------------|
| P/E | 19.2x | 22.0x | 16.5x |
| P/B | 2.8x | 3.4x | 1.9x |
| EV/EBITDA | 14.1x | 16.2x | 11.8x |

HDFC Bank trades at a **~13% discount** to its own 5-year average P/E but at a **premium to the sector median**, justified by its superior ROE (16.5%) and asset-quality track record. Consensus 12-month target price is INR 1,920 (approx. 14% upside from CMP).

The post-merger integration drag on short-term earnings has compressed multiples, which could re-rate once cost synergies materialize by H2 FY26.`,
  },

  // ---------- financials / ratios / fundamentals ----------
  {
    keywords: ["financials", "ratio", "roe", "roa", "nim", "npa", "gnpa", "casa", "fundamental"],
    thinkingSteps: [
      "Fetching quarterly and annual financials...",
      "Computing trailing-twelve-month ratios...",
      "Benchmarking against top private banks...",
    ],
    response: `**Key Financial Ratios (TTM)**

| Ratio | HDFC Bank | ICICI Bank | Kotak Mahindra |
|-------|-----------|-----------|----------------|
| ROE | 16.5% | 17.8% | 14.2% |
| ROA | 1.9% | 2.2% | 2.1% |
| NIM | 3.65% | 4.48% | 5.22% |
| GNPA | 1.24% | 2.16% | 1.73% |
| CASA | 42.8% | 45.2% | 52.1% |
| CAR | 18.3% | 16.8% | 21.4% |

HDFC Bank maintains **best-in-class asset quality** (lowest GNPA among large private banks) while delivering competitive profitability. The NIM compression vs peers is partly a function of the legacy HDFC Ltd wholesale book, which is gradually being re-priced.`,
  },

  // ---------- risk / risks ----------
  {
    keywords: ["risk", "risks", "concern", "threat", "headwind", "downside"],
    thinkingSteps: [
      "Scanning recent analyst reports for risk flags...",
      "Evaluating macro sensitivity and regulatory landscape...",
      "Assessing competitive dynamics...",
    ],
    response: `**Risk Assessment for HDFC Bank**

1. **NIM Compression** -- If the RBI cuts rates by 50-75 bps in FY26 as expected, the bank's NIM could dip to 3.4-3.5%, pressuring net interest income growth.

2. **Merger Integration Execution** -- While management reports progress ahead of schedule, branch rationalization and IT system unification carry operational risk through Q2 FY26.

3. **Unsecured Lending Regulation** -- RBI has increased risk-weight on consumer credit and NBFC exposure. HDFC Bank's retail unsecured book (personal loans + credit cards) is ~12% of advances.

4. **Fintech & SFB Competition** -- Digital lenders and small finance banks continue to capture incremental retail market share, particularly in Tier-2/3 cities.

5. **Deposit Growth Slowdown** -- System-wide deposit growth is trailing credit growth (~11% vs ~15%), which could constrain lending or raise cost of funds.

**Overall risk level: MODERATE** -- well-capitalized with strong management, but near-term headwinds warrant monitoring.`,
  },

  // ---------- revenue / profit / earnings / growth ----------
  {
    keywords: ["revenue", "profit", "earnings", "growth", "income", "topline", "bottomline", "quarter", "quarterly"],
    thinkingSteps: [
      "Pulling Q3 FY25 results from BSE filings...",
      "Computing QoQ and YoY growth rates...",
      "Comparing with street estimates...",
    ],
    response: `**HDFC Bank -- Q3 FY25 Earnings Summary**

| Metric | Q3 FY25 | QoQ | YoY |
|--------|---------|-----|-----|
| Net Interest Income | INR 30,690 Cr | +4.2% | +10.1% |
| Non-Interest Income | INR 11,450 Cr | +8.7% | +22.3% |
| Operating Profit | INR 26,530 Cr | +5.1% | +13.8% |
| Net Profit | INR 17,260 Cr | +3.6% | +15.4% |
| EPS (diluted) | INR 22.7 | +3.6% | +15.4% |

Net profit beat consensus estimates by ~2%. Management reiterated guidance of **18-20% credit growth** for FY26 with an improving operating leverage as merger synergies kick in. Provisions stayed benign at 38 bps of advances.`,
  },

  // ---------- peer comparison / compare ----------
  {
    keywords: ["peer", "compare", "comparison", "vs", "versus", "competitor", "icici", "kotak", "sbi", "axis"],
    thinkingSteps: [
      "Building peer comparison matrix...",
      "Normalizing metrics for market-cap tiers...",
      "Ranking on composite score...",
    ],
    response: `**Large-Cap Private Bank Peer Comparison**

| Metric | HDFC Bank | ICICI Bank | Kotak Mahindra | Axis Bank |
|--------|-----------|-----------|----------------|-----------|
| Market Cap | INR 12.4L Cr | INR 8.9L Cr | INR 3.9L Cr | INR 3.5L Cr |
| P/E | 19.2x | 17.4x | 23.1x | 13.8x |
| ROE | 16.5% | 17.8% | 14.2% | 15.1% |
| GNPA | 1.24% | 2.16% | 1.73% | 1.58% |
| Credit Growth (YoY) | 15.8% | 17.2% | 19.4% | 12.1% |
| Dividend Yield | 1.1% | 0.8% | 0.1% | 0.9% |

HDFC Bank offers the **best asset quality** in the peer set and trades at a **moderate premium** to ICICI and Axis. Kotak commands the highest multiple due to its deposit franchise and capital adequacy but lags on scale. ICICI presents the strongest ROE momentum.`,
  },

  // ---------- dividend ----------
  {
    keywords: ["dividend", "yield", "payout", "distribution"],
    thinkingSteps: [
      "Fetching dividend history from BSE...",
      "Computing yield at current market price...",
    ],
    response: `**HDFC Bank Dividend Track Record**

| Year | Dividend/Share | Payout Ratio | Yield (at year-end price) |
|------|---------------|-------------|--------------------------|
| FY25E | INR 19.5 | ~25% | 1.1% |
| FY24 | INR 19.5 | 24% | 1.2% |
| FY23 | INR 15.5 | 23% | 1.0% |
| FY22 | INR 6.5 | 11% | 0.5% |

The bank has steadily raised dividends post-COVID. The payout ratio has room to expand toward 30-35% as the merger-related capital buffer normalizes by FY27. At CMP, the forward dividend yield is approximately **1.1%** -- modest, but in line with growth-oriented large-cap banks.`,
  },

  // ---------- technical / chart / support / resistance ----------
  {
    keywords: ["technical", "chart", "support", "resistance", "moving average", "rsi", "macd", "breakout"],
    thinkingSteps: [
      "Loading daily OHLCV data...",
      "Computing 50-DMA, 200-DMA, RSI, MACD...",
      "Identifying key support/resistance levels...",
    ],
    response: `**Technical Overview -- HDFC Bank (NSE)**

| Indicator | Value | Signal |
|-----------|-------|--------|
| CMP | INR 1,685 | -- |
| 50-DMA | INR 1,642 | Price above (bullish) |
| 200-DMA | INR 1,588 | Price above (bullish) |
| RSI (14) | 58.3 | Neutral |
| MACD | +12.4 | Bullish crossover |

**Key Levels:**
- Immediate support: INR 1,640 (50-DMA) / INR 1,590 (200-DMA)
- Immediate resistance: INR 1,720 (recent swing high)
- Breakout target: INR 1,800 (if INR 1,720 clears with volume)

The stock is trending above both major moving averages with a recent MACD bullish crossover. RSI is neutral, suggesting room for further upside before overbought territory.`,
  },

  // ---------- news / sentiment / recent ----------
  {
    keywords: ["news", "sentiment", "recent", "latest", "update", "headline"],
    thinkingSteps: [
      "Scanning financial news feeds for last 7 days...",
      "Running sentiment analysis on 15 articles...",
      "Extracting key themes...",
    ],
    response: `**Recent News & Sentiment -- HDFC Bank (Last 7 Days)**

**Overall Sentiment: Positive (72%)**

Key Headlines:
1. *"HDFC Bank merger synergies ahead of schedule; branch count rationalized to 8,100"* -- Economic Times (Positive)
2. *"RBI open to 25 bps cut in April policy; banks to benefit"* -- Mint (Positive)
3. *"HDFC Bank's retail deposit growth accelerates to 19% YoY"* -- Business Standard (Positive)
4. *"FII holding in HDFC Bank dips marginally to 53.2% in Dec quarter"* -- Moneycontrol (Neutral)
5. *"Unsecured loan growth slows across private banks on RBI risk-weight hike"* -- Reuters (Negative)

The narrative is broadly constructive, driven by merger progress and deposit momentum. The main concern is the sector-wide cooling of unsecured lending, though HDFC Bank's exposure is manageable relative to peers.`,
  },

  // ---------- recommendation / buy / sell / target ----------
  {
    keywords: ["recommendation", "buy", "sell", "target", "outlook", "should i", "invest", "opinion"],
    thinkingSteps: [
      "Aggregating broker recommendations...",
      "Weighing fundamental and technical signals...",
      "Formulating summary view...",
    ],
    response: `**Analyst Consensus on HDFC Bank**

| Rating | Count | Avg Target Price |
|--------|-------|-----------------|
| Strong Buy | 14 | INR 1,950 |
| Buy | 9 | INR 1,880 |
| Hold | 3 | INR 1,720 |
| Sell | 0 | -- |

**Consensus: BUY | Median TP: INR 1,920 (~14% upside)**

The investment case rests on:
- Post-merger re-rating as cost synergies flow through in FY26-27
- Best-in-class asset quality providing downside protection
- Valuation discount to own history creates favorable risk/reward

Key monitoring points: NIM trajectory post rate cuts, deposit growth sustainability, and integration milestones.

*Note: This is aggregated analyst data and not personalized investment advice.*`,
  },

  // ---------- sector / banking / industry ----------
  {
    keywords: ["sector", "banking", "industry", "nifty bank", "bank nifty", "private bank"],
    thinkingSteps: [
      "Analyzing banking sector trends...",
      "Comparing sector performance vs broader market...",
      "Evaluating credit cycle position...",
    ],
    response: `**Indian Banking Sector Overview**

**Credit Growth:** System-wide credit growth is ~15.3% YoY, outpacing deposit growth (~11.4%), creating a structural challenge for funding costs.

**Asset Quality Cycle:** The sector is in a benign NPA cycle with system GNPA at ~3.2% (lowest in a decade). Private banks lead with sub-2% GNPAs.

**Regulatory Landscape:**
- RBI increased risk-weights on consumer credit (+25pp) and NBFC lending (+25pp) in Nov 2023, which is gradually dampening unsecured growth
- Expected 50-75 bps of rate cuts in FY26 will support credit demand but compress NIMs

**Sector Valuation:** Nifty Bank trades at ~2.4x P/B vs 5-year avg of 2.6x -- slight discount, suggesting sector-wide re-rating potential.

HDFC Bank is well-positioned within this macro context as the largest private bank with the most diversified loan book and strongest deposit franchise.`,
  },
];

export const fallbackResponse: Omit<ScriptedReply, "keywords"> = {
  thinkingSteps: [
    "Analyzing your question...",
    "Searching relevant financial data...",
    "Formulating response...",
  ],
  response: `That's an interesting question. Based on my analysis of HDFC Bank:

The bank remains one of the strongest franchises in Indian banking with a **market cap of INR 12.4L Cr**, **ROE of 16.5%**, and **GNPA of just 1.24%**. The post-merger integration with HDFC Ltd is progressing well, and management has guided for **18-20% credit growth** in FY26.

Could you be more specific about what aspect you'd like me to analyze? I can help with:
- **Valuation** analysis (P/E, P/B, fair value)
- **Financial ratios** and peer comparison
- **Risk assessment** and stress scenarios
- **Technical analysis** (support/resistance, indicators)
- **News & sentiment** analysis
- **Earnings** and growth trajectory
- **Dividend** history and outlook`,
};

/**
 * Find the best scripted reply for a user message.
 */
export function matchReply(userMessage: string): ScriptedReply | null {
  const lower = userMessage.toLowerCase();
  for (const entry of scriptedReplies) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry;
    }
  }
  return null;
}
