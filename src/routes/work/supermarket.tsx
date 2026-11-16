import { AfterMount } from "@/components/after-mount";
import { Kpi } from "@/components/kpi";
import { SiteHeader } from "@/components/site-header";
import { branchSales, categorySales, printedTransactions, salesSummary } from "@/data/supermarket";
import { kes, num, pct } from "@/lib/format";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/work/supermarket")({
  head: () => ({
    meta: [{ title: "Supermarket sales · Mahmoud Nagib" }],
  }),
  component: SupermarketPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-line)",
  color: "var(--color-ink)",
};

const axisTick = { fill: "var(--color-ink)", fontSize: 12 };

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function maxBy<T>(rows: readonly T[], pick: (row: T) => number): T | undefined {
  return rows.reduce<T | undefined>((best, row) => {
    if (best === undefined || pick(row) > pick(best)) return row;
    return best;
  }, undefined);
}

function share(part: number): string {
  if (salesSummary.total === 0) return pct(0, 1);
  return pct((part / salesSummary.total) * 100, 1);
}

function SupermarketPage() {
  const topBranch = maxBy(branchSales, (row) => row.sales);
  const topCategory = maxBy(categorySales, (row) => row.sales);

  return (
    <>
      <SiteHeader />
      <main className="rise mx-auto max-w-6xl px-5 pb-24 pt-8">
        <Link to="/" className="text-sm text-muted">
          ← Portfolio
        </Link>
        <p className="mt-4 text-xs uppercase tracking-widest text-teal">
          Python · pandas · matplotlib · seaborn
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Supermarket sales</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {num(salesSummary.rows, 0)} transactions across {num(branchSales.length, 0)} Kenyan
          branches. Figures below are the submitted analysis. The full CSV was not in the export, so
          the table is the rows printed in the notebook, not all {num(salesSummary.rows, 0)}.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Total revenue" value={kes(salesSummary.total, 2)} />
          <Kpi label="Average ticket" value={kes(salesSummary.average, 2)} />
          <Kpi
            label="Top branch"
            value={topBranch?.branch ?? "—"}
            note={topBranch ? kes(topBranch.sales, 0) : undefined}
          />
          <Kpi
            label="Top category"
            value={topCategory?.category ?? "—"}
            note={topCategory ? kes(topCategory.sales, 0) : undefined}
          />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-card border border-line bg-card p-5">
            <h3 className="font-display text-xl text-ink">Sales by branch</h3>
            <div className="mt-4">
              <AfterMount>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={branchSales}
                    layout="vertical"
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <XAxis type="number" tick={axisTick} />
                    <YAxis type="category" dataKey="branch" width={88} tick={axisTick} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown) => kes(asNumber(value), 0)}
                    />
                    <Bar dataKey="sales" fill="var(--color-teal)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </AfterMount>
            </div>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="py-2 pr-3 font-normal">Branch</th>
                    <th className="py-2 pr-3 text-right font-normal">Sales</th>
                    <th className="py-2 text-right font-normal">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {branchSales.map((row) => (
                    <tr key={row.branch} className="border-t border-line">
                      <td className="py-2 pr-3 text-ink">{row.branch}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-ink">
                        {kes(row.sales, 0)}
                      </td>
                      <td className="py-2 text-right tabular-nums text-muted">
                        {share(row.sales)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-card border border-line bg-card p-5">
            <h3 className="font-display text-xl text-ink">Sales by category</h3>
            <div className="mt-4">
              <AfterMount>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categorySales}
                    layout="vertical"
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <XAxis type="number" tick={axisTick} />
                    <YAxis type="category" dataKey="category" width={104} tick={axisTick} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown) => kes(asNumber(value), 0)}
                    />
                    <Bar dataKey="sales" fill="var(--color-teal)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </AfterMount>
            </div>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="py-2 pr-3 font-normal">Category</th>
                    <th className="py-2 pr-3 text-right font-normal">Sales</th>
                    <th className="py-2 text-right font-normal">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {categorySales.map((row) => (
                    <tr key={row.category} className="border-t border-line">
                      <td className="py-2 pr-3 text-ink">{row.category}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-ink">
                        {kes(row.sales, 0)}
                      </td>
                      <td className="py-2 text-right tabular-nums text-muted">
                        {share(row.sales)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <aside className="mt-6 rounded-card bg-teal-deep p-6 text-white">
          <h2 className="font-display text-3xl">What the numbers say</h2>
          <p className="mt-4">
            {topBranch?.branch ?? "The leading branch"} is the highest branch.{" "}
            {topCategory?.category ?? "The leading category"} is the highest category.
          </p>
          <p className="mt-3">
            The distribution is right-skewed: median {kes(salesSummary.median, 0)} sits below the
            mean {kes(salesSummary.mean, 0)}.
          </p>
          <p className="mt-3">
            The largest ticket is TX1029, Nairobi, batteries, {kes(5769.68, 2)} on 2026-09-28.
          </p>
          <p className="mt-3">
            Missing values: {num(salesSummary.missingProduct, 0)} product names and{" "}
            {num(salesSummary.missingUnits, 0)} units-sold.
          </p>
          <p className="mt-4 text-sm text-white/80">
            Min {kes(salesSummary.min, 0)} · Q1 {kes(salesSummary.q1, 0)} · Median{" "}
            {kes(salesSummary.median, 0)} · Mean {kes(salesSummary.mean, 2)} · Q3{" "}
            {kes(salesSummary.q3, 0)} · Max {kes(salesSummary.max, 2)}
          </p>
        </aside>

        <h2 className="mt-10 font-display text-3xl text-ink">Rows printed in the notebook</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-2 pr-3 font-normal">ID</th>
                <th className="py-2 pr-3 font-normal">Date</th>
                <th className="py-2 pr-3 font-normal">Branch</th>
                <th className="py-2 pr-3 font-normal">Category</th>
                <th className="py-2 pr-3 font-normal">Product</th>
                <th className="py-2 pr-3 text-right font-normal">Units</th>
                <th className="py-2 pr-3 text-right font-normal">Price</th>
                <th className="py-2 pr-3 text-right font-normal">Discount</th>
                <th className="py-2 text-right font-normal">Sales</th>
              </tr>
            </thead>
            <tbody>
              {printedTransactions.map((row) => {
                const highest = row.id === "TX1029";
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-line ${highest ? "text-copper" : "text-ink"}`}
                  >
                    <td className="py-2 pr-3">
                      {row.id}
                      {highest ? (
                        <span className="ml-2 text-xs uppercase tracking-widest">highest</span>
                      ) : null}
                    </td>
                    <td className="py-2 pr-3">{row.date}</td>
                    <td className="py-2 pr-3">{row.branch}</td>
                    <td className="py-2 pr-3">{row.category}</td>
                    <td className="py-2 pr-3">
                      {row.product == null || row.product === "" ? "—" : row.product}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums">
                      {row.units == null ? "—" : num(row.units, 0)}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums">{kes(row.price, 2)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">
                      {pct(row.discount * 100, 1)}
                    </td>
                    <td className="py-2 text-right tabular-nums">{kes(row.sales, 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
