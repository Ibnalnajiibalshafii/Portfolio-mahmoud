export function kes(n: number, digits = 0): string {
  const sign = n < 0 ? "−" : "";
  const formatted = Math.abs(n).toLocaleString("en-KE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${sign}KES ${formatted}`;
}

export function kesCompact(n: number): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000;
    const digits = millions >= 10 ? 1 : 2;
    return `${sign}KES ${millions.toFixed(digits)}M`;
  }
  if (abs >= 10_000) return `${sign}KES ${Math.round(abs / 1000)}k`;
  return kes(n, 0);
}

export function pct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function num(n: number, digits = 1): string {
  return n.toLocaleString("en-KE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
