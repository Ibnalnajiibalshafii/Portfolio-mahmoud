import { AfterMount } from "@/components/after-mount";
import { Kpi } from "@/components/kpi";
import { SiteHeader } from "@/components/site-header";
import { branchPerf, employees } from "@/data/bank";
import { kes, num, pct } from "@/lib/format";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/work/bank")({
  head: () => ({
    meta: [{ title: "Bank branches · Mahmoud Nagib" }],
  }),
  component: BankPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-line)",
  color: "var(--color-ink)",
};

const axisTick = { fill: "var(--color-ink)", fontSize: 12 };

const hireYears = ["2019", "2020", "2021", "2022", "2023", "2024"] as const;

type BranchStat = {
  branch: string;
  sales: number;
  profit: number;
  target: number;
  payrollBudget: number;
  csat: number;
  variance: number;
  achievement: number;
  margin: number;
  payrollRatio: number;
  short: string;
  salaryBill: number;
  avgPay: number;
  headcount: number;
  onLeave: number;
};

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function maxBy<T>(rows: readonly T[], pick: (row: T) => number): T {
  return rows.reduce((best, row) => (pick(row) > pick(best) ? row : best));
}

function minBy<T>(rows: readonly T[], pick: (row: T) => number): T {
  return rows.reduce((best, row) => (pick(row) < pick(best) ? row : best));
}

function shortName(branch: string): string {
  return branch === "Nairobi Central" ? "Nairobi" : branch;
}

function joinList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function buildBranches(): BranchStat[] {
  return branchPerf.map((row) => {
    const people = employees.filter((employee) => employee.branch === row.branch);
    const salaryBill = people.reduce((sum, employee) => sum + employee.salary, 0);
    const headcount = people.length;
    return {
      branch: row.branch,
      sales: row.sales,
      profit: row.profit,
      target: row.target,
      payrollBudget: row.payrollBudget,
      csat: row.csat,
      variance: row.sales - row.target,
      achievement: row.target === 0 ? 0 : (row.sales / row.target) * 100,
      margin: row.sales === 0 ? 0 : (row.profit / row.sales) * 100,
      payrollRatio: row.profit === 0 ? 0 : ((row.payrollBudget * 12) / row.profit) * 100,
      short: shortName(row.branch),
      salaryBill,
      avgPay: headcount === 0 ? 0 : salaryBill / headcount,
      headcount,
      onLeave: people.filter((employee) => employee.status === "On Leave").length,
    };
  });
}

const branches = buildBranches();
const highestSalaryBill = maxBy(branches, (row) => row.salaryBill);
const highestAvgPay = maxBy(branches, (row) => row.avgPay);
const lowestVariance = minBy(branches, (row) => row.variance);
const lowestAchievement = minBy(branches, (row) => row.achievement);
const lowestMargin = minBy(branches, (row) => row.margin);
const highestPayrollRatio = maxBy(branches, (row) => row.payrollRatio);
const lowestCsat = minBy(branches, (row) => row.csat);
const networkSales = branches.reduce((sum, row) => sum + row.sales, 0);
const behindTarget = branches.filter((row) => row.variance < 0).length;

const hiresByYear = hireYears.map((year) => ({
  year,
  hires: employees.filter((employee) => employee.hireDate.startsWith(year)).length,
}));

const peakYear = maxBy(hiresByYear, (row) => row.hires);
const peakHires = employees.filter((employee) => employee.hireDate.startsWith(peakYear.year));

const peakBranchCounts = new Map<string, number>();
for (const employee of peakHires) {
  peakBranchCounts.set(employee.branch, (peakBranchCounts.get(employee.branch) ?? 0) + 1);
}

let peakHireBranch = "";
let peakHireCount = 0;
for (const [branch, count] of peakBranchCounts) {
  if (count > peakHireCount) {
    peakHireBranch = branch;
    peakHireCount = count;
  }
}

function chipClass(active: boolean): string {
  return active
    ? "inline-flex min-h-11 items-center rounded-full border border-ink bg-ink px-4 text-paper"
    : "inline-flex min-h-11 items-center rounded-full border border-line px-4 text-ink";
}

function BankPage() {
  const [branch, setBranch] = useState("All");
  const selected = branches.find((row) => row.branch === branch);

  const alsoWorst = [
    lowestAchievement.branch === lowestVariance.branch ? "achievement" : null,
    lowestMargin.branch === lowestVariance.branch ? "margin" : null,
    highestPayrollRatio.branch === lowestVariance.branch ? "payroll ratio" : null,
    lowestCsat.branch === lowestVariance.branch ? "customer satisfaction" : null,
  ].filter((item): item is string => item !== null);

  const samePay = highestSalaryBill.branch === highestAvgPay.branch;
  const budgetLine =
    highestSalaryBill.short === "Nairobi"
      ? `Nairobi monthly budget is ${kes(highestSalaryBill.payrollBudget, 0)} and the Nairobi salary bill is ${kes(highestSalaryBill.salaryBill, 0)}.`
      : `${highestSalaryBill.branch} monthly budget is ${kes(highestSalaryBill.payrollBudget, 0)} and the salary bill is ${kes(highestSalaryBill.salaryBill, 0)}.`;

  const visibleEmployees =
    branch === "All" ? employees : employees.filter((employee) => employee.branch === branch);

  return (
    <>
      <SiteHeader />
      <main className="rise mx-auto max-w-6xl px-5 pb-24 pt-8">
        <Link to="/" className="text-sm text-muted">
          ← Portfolio
        </Link>
        <p className="mt-4 text-xs uppercase tracking-widest text-teal">Excel</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Bank branches</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Branch sales, profit, targets, payroll budgets, and customer scores from the workbook, set
          next to the employee list. Variances, margins, and payroll ratios are calculated here, not
          typed in.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className={chipClass(branch === "All")}
            onClick={() => setBranch("All")}
          >
            All
          </button>
          {branchPerf.map((row) => (
            <button
              key={row.branch}
              type="button"
              className={chipClass(branch === row.branch)}
              onClick={() => setBranch(row.branch)}
            >
              {row.branch}
            </button>
          ))}
        </div>

        {branch === "All" || selected === undefined ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi label="Network sales" value={kes(networkSales, 0)} />
            <Kpi
              label="Behind target"
              value={num(behindTarget, 0)}
              note="Branches with negative variance"
            />
            <Kpi
              label="Widest gap"
              value={lowestVariance.short}
              note={kes(lowestVariance.variance, 0)}
            />
            <Kpi
              label="Payroll pressure"
              value={highestPayrollRatio.short}
              note={pct(highestPayrollRatio.payrollRatio, 1)}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi
              label="Sales"
              value={kes(selected.sales, 0)}
              note={`${num(selected.headcount, 0)} people · ${num(selected.onLeave, 0)} on leave`}
            />
            <Kpi label="Variance" value={kes(selected.variance, 0)} />
            <Kpi label="Achievement" value={pct(selected.achievement, 1)} />
            <Kpi label="Margin" value={pct(selected.margin, 1)} />
          </div>
        )}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-card border border-line bg-card p-5">
            <h2 className="font-display text-xl text-ink">Sales against target</h2>
            <div className="mt-4">
              <AfterMount>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branches} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="short" tick={axisTick} />
                    <YAxis tick={axisTick} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown) => kes(asNumber(value), 0)}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Sales" fill="var(--color-teal)" radius={4} />
                    <Bar dataKey="target" name="Target" fill="var(--color-muted)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </AfterMount>
            </div>
          </article>

          <article className="rounded-card border border-line bg-card p-5">
            <h2 className="font-display text-xl text-ink">Profit margin</h2>
            <div className="mt-4">
              <AfterMount>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branches} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="short" tick={axisTick} />
                    <YAxis tick={axisTick} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown) => pct(asNumber(value), 1)}
                    />
                    <Bar dataKey="margin" name="Margin" radius={4}>
                      {branches.map((row) => (
                        <Cell
                          key={row.branch}
                          fill={
                            row.branch === lowestMargin.branch
                              ? "var(--color-copper)"
                              : "var(--color-teal)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </AfterMount>
            </div>
          </article>

          <article className="rounded-card border border-line bg-card p-5 lg:col-span-2">
            <h2 className="font-display text-xl text-ink">Hires by year</h2>
            <div className="mt-4">
              <AfterMount>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hiresByYear} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" tick={axisTick} />
                    <YAxis allowDecimals={false} tick={axisTick} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: unknown) => num(asNumber(value), 0)}
                    />
                    <Bar dataKey="hires" name="Hires" fill="var(--color-teal)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </AfterMount>
            </div>
          </article>
        </section>

        <aside className="mt-6 rounded-card bg-teal-deep p-6 text-white">
          <h2 className="font-display text-3xl">What the numbers say</h2>
          <p className="mt-4">
            {highestSalaryBill.branch} has the highest salary bill,{" "}
            {kes(highestSalaryBill.salaryBill, 0)} across {num(highestSalaryBill.headcount, 0)}{" "}
            employees, an average of {kes(highestSalaryBill.avgPay, 0)}.{" "}
            {samePay
              ? "That is also the highest average pay."
              : `The highest average pay is ${highestAvgPay.branch} at ${kes(highestAvgPay.avgPay, 0)}, so the largest bill and the highest average are not the same branch.`}{" "}
            Salary sums differ from the monthly payroll budget used in the ratio. {budgetLine}
          </p>
          <p className="mt-3">
            {alsoWorst.length > 0
              ? `${lowestVariance.branch} is worst on variance and also worst on ${joinList(alsoWorst)}.`
              : `${lowestVariance.branch} is worst on variance.`}{" "}
            Variance {kes(lowestVariance.variance, 0)}, achievement{" "}
            {pct(lowestVariance.achievement, 1)}, margin {pct(lowestVariance.margin, 1)}, payroll
            ratio {pct(lowestVariance.payrollRatio, 1)}, customer satisfaction{" "}
            {num(lowestVariance.csat, 1)} as recorded. Recommend sales and customer-handling
            training for {lowestVariance.branch}. Ask for exit reasons before a final decision. Hire
            counts ignore people who left and whether new hires perform. {peakYear.year} was the
            peak hiring year
            {peakHireBranch === ""
              ? "."
              : `, and ${peakHireBranch} hired the most that year (${num(peakHireCount, 0)}).`}{" "}
            A peak year, and that branch, can still miss target.
          </p>
          <p className="mt-4 text-sm text-white/80">
            Customer satisfaction scores are shown as recorded in the workbook; they are above 100,
            so they are not a 0–100 percent.
          </p>
        </aside>

        <h2 className="mt-10 font-display text-3xl text-ink">
          {branch === "All" ? "Employees" : branch}
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-2 pr-3 font-normal">Name</th>
                <th className="py-2 pr-3 font-normal">Branch</th>
                <th className="py-2 pr-3 font-normal">Position</th>
                <th className="py-2 pr-3 font-normal">Type</th>
                <th className="py-2 pr-3 font-normal">Status</th>
                <th className="py-2 pr-3 text-right font-normal">Salary</th>
                <th className="py-2 text-right font-normal">Hire year</th>
              </tr>
            </thead>
            <tbody>
              {visibleEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-line text-ink">
                  <td className="py-2 pr-3">{employee.name}</td>
                  <td className="py-2 pr-3">{employee.branch}</td>
                  <td className="py-2 pr-3">{employee.position}</td>
                  <td className="py-2 pr-3">{employee.type}</td>
                  <td
                    className={`py-2 pr-3 ${employee.status === "On Leave" ? "text-copper" : ""}`}
                  >
                    {employee.status}
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">{kes(employee.salary, 0)}</td>
                  <td className="py-2 text-right tabular-nums">{employee.hireDate.slice(0, 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
