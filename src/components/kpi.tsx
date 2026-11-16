export function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <article className="rounded-card border border-line bg-card px-5 py-4">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums text-ink">{value}</p>
      {note ? <p className="mt-2 text-sm text-muted">{note}</p> : null}
    </article>
  );
}
