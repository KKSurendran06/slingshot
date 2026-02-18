/**
 * Shared demo utilities used across all 3 research modes.
 */

/**
 * Simulate progressive streaming by drip-feeding items via setInterval.
 * Returns a cleanup function to clear the interval.
 */
export function simulateStream<T>(
  items: T[],
  onItem: (item: T, index: number) => void,
  onComplete: () => void,
  intervalMs: number = 800
): () => void {
  let index = 0;
  const interval = setInterval(() => {
    if (index < items.length) {
      onItem(items[index], index);
      index++;
    } else {
      clearInterval(interval);
      onComplete();
    }
  }, intervalMs);

  return () => clearInterval(interval);
}

/**
 * Format a number to Indian currency (INR).
 * e.g., 3240000 -> "32.4L", 12500000 -> "1.25Cr"
 */
export function formatINR(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2)}Cr`;
  }
  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Format number with commas (Indian numbering system).
 * e.g., 1234567 -> "12,34,567"
 */
export function formatIndianNumber(value: number): string {
  const str = Math.round(value).toString();
  if (str.length <= 3) return str;

  let result = str.slice(-3);
  let remaining = str.slice(0, -3);

  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    result = chunk + "," + result;
    remaining = remaining.slice(0, -2);
  }

  return result;
}

/**
 * Shared animation timing constants.
 */
export const ANIMATION = {
  /** Interval between thought step reveals (ms) */
  THOUGHT_INTERVAL: 800,
  /** Delay between staggered card reveals (ms) */
  STAGGER_DELAY: 80,
  /** Duration for number counter animations (s) */
  COUNTER_DURATION: 1.5,
  /** Duration for chart segment animations (s) */
  CHART_DURATION: 0.8,
  /** Duration for bar fill animations (s) */
  BAR_DURATION: 1.0,
} as const;
