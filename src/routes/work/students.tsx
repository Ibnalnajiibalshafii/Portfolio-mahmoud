import { AfterMount } from "@/components/after-mount";
import { Kpi } from "@/components/kpi";
import { SiteHeader } from "@/components/site-header";
import { students } from "@/data/students";
import { num } from "@/lib/format";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/work/students")({
  head: () => ({
    meta: [{ title: "Student scores · Mahmoud Nagib" }],
  }),
  component: StudentsPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-line)",
  color: "var(--color-ink)",
};

const axisTick = { fill: "var(--color-ink)", fontSize: 12 };

const formOptions = ["all", 1, 2, 3, 4] as const;
const gradeOptions = ["all", "A", "B", "C", "D", "E"] as const;
const forms = [1, 2, 3, 4] as const;
const grades = ["A", "B", "C", "D", "E"] as const;

type FormFilter = (typeof formOptions)[number];
type GradeFilter = (typeof gradeOptions)[number];
type SortKey = "average" | "name" | "attendance" | "grade";
type SortDir = "asc" | "desc";
type Student = (typeof students)[number];

const gradeOrder: Record<string, number> = { A: 4, B: 3, C: 2, D: 1, E: 0 };

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function mean(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function maxBy<T>(rows: readonly T[], pick: (row: T) => number): T {
  return rows.reduce((best, row) => (pick(row) > pick(best) ? row : best));
}

function minBy<T>(rows: readonly T[], pick: (row: T) => number): T {
  return rows.reduce((best, row) => (pick(row) < pick(best) ? row : best));
}

function chipClass(active: boolean): string {
  return active
    ? "inline-flex min-h-11 items-center rounded-full border border-ink bg-ink px-4 text-paper"
    : "inline-flex min-h-11 items-center rounded-full border border-line px-4 text-ink";
}

function compareStudents(key: SortKey, dir: SortDir): (a: Student, b: Student) => number {
  const sign = dir === "asc" ? 1 : -1;
  return (a, b) => {
    if (key === "name") return a.name.localeCompare(b.name) * sign;
    if (key === "attendance") return (a.attendance - b.attendance) * sign;
    if (key === "grade") return ((gradeOrder[a.grade] ?? -1) - (gradeOrder[b.grade] ?? -1)) * sign;
    return (a.average - b.average) * sign;
  };
}

function conflictNames(): string[] {
  const gendersByName = new Map<string, Set<string>>();
  for (const student of students) {
    const existing = gendersByName.get(student.name);
    if (existing) existing.add(student.gender);
    else gendersByName.set(student.name, new Set([student.gender]));
  }
  return [...gendersByName.entries()]
    .filter((entry) => entry[1].size > 1)
    .map((entry) => entry[0])
    .sort((a, b) => a.localeCompare(b));
}

const conflicts = conflictNames();

function SortHeader({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  align = "left",
}: {
  label: string;
  column: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (column: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = sortKey === column;
  return (
    <th className={`py-2 pr-3 font-normal ${align === "right" ? "text-right" : "text-left"}`}>
      <button
        type="button"
        className={`inline-flex min-h-11 items-center gap-1 text-muted ${align === "right" ? "ml-auto" : ""}`}
        aria-label={
          active
            ? `${label}, sorted ${sortDir === "asc" ? "ascending" : "descending"}`
            : `Sort by ${label}`
        }
        onClick={() => onSort(column)}
      >
        {label}
        {active ? (
          sortDir === "asc" ? (
            <ArrowUp aria-hidden="true" className="size-4" />
          ) : (
            <ArrowDown aria-hidden="true" className="size-4" />
          )
        ) : null}
      </button>
    </th>
  );
}

function StudentsPage() {
  const [form, setForm] = useState<FormFilter>("all");
  const [grade, setGrade] = useState<GradeFilter>("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("average");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const needle = query.trim().toLowerCase();
  const filtered = students.filter((student) => {
    if (form !== "all" && student.form !== form) return false;
    if (grade !== "all" && student.grade !== grade) return false;
    if (needle !== "" && !student.name.toLowerCase().includes(needle)) return false;
    return true;
  });
  const sorted = [...filtered].sort(compareStudents(sortKey, sortDir));

  const count = filtered.length;
  const meanAverage = mean(filtered.map((student) => student.average));
  const gradeA = filtered.filter((student) => student.grade === "A").length;
  const meanAttendance = mean(filtered.map((student) => student.attendance));

  const subjectMeans = [
    { subject: "Math", mean: mean(filtered.map((student) => student.math)) },
    { subject: "English", mean: mean(filtered.map((student) => student.english)) },
    { subject: "Science", mean: mean(filtered.map((student) => student.science)) },
    { subject: "ICT", mean: mean(filtered.map((student) => student.ict)) },
  ];

  const gradeCounts = grades.map((letter) => ({
    grade: letter,
    students: filtered.filter((student) => student.grade === letter).length,
  }));

  const formMeans = forms.flatMap((level) => {
    const rows = filtered.filter((student) => student.form === level);
    if (rows.length === 0) return [];
    return [{ form: `Form ${level}`, mean: mean(rows.map((student) => student.average)) }];
  });

  const strongest = count > 0 ? maxBy(subjectMeans, (row) => row.mean) : undefined;
  const weakest = count > 0 ? minBy(subjectMeans, (row) => row.mean) : undefined;

  function onSort(column: SortKey) {
    if (sortKey === column) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(column);
    setSortDir(column === "name" ? "asc" : "desc");
  }

  let subjectLine = "";
  if (strongest && weakest) {
    subjectLine =
      strongest.mean === weakest.mean
        ? `On this filter every subject mean is ${num(strongest.mean, 1)}.`
        : `On this filter, ${strongest.subject} is the strongest subject (${num(strongest.mean, 1)}) and ${weakest.subject} is the weakest (${num(weakest.mean, 1)}).`;
  }

  return (
    <>
      <SiteHeader />
      <main className="rise mx-auto max-w-6xl px-5 pb-24 pt-8">
        <Link to="/" className="text-sm text-muted">
          ← Portfolio
        </Link>
        <p className="mt-4 text-xs uppercase tracking-widest text-teal">Cleaning · grades</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Student scores</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Eighty records, four subjects, and a gender field that contradicts itself. Filters,
          charts, and the table use the current selection. Nothing on this page rewrites a row.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {formOptions.map((option) => (
            <button
              key={String(option)}
              type="button"
              className={chipClass(form === option)}
              onClick={() => setForm(option)}
            >
              {option === "all" ? "All forms" : `Form ${option}`}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {gradeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={chipClass(grade === option)}
              onClick={() => setGrade(option)}
            >
              {option === "all" ? "All grades" : option}
            </button>
          ))}
        </div>
        <label className="mt-4 block max-w-md text-sm text-muted">
          Search by name
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-full border border-line bg-paper px-4 text-ink"
          />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Students" value={num(count, 0)} />
          <Kpi label="Mean average" value={num(meanAverage, 1)} />
          <Kpi label="Grade A" value={num(gradeA, 0)} />
          <Kpi label="Mean attendance" value={num(meanAttendance, 0)} />
        </div>

        {count === 0 ? (
          <p className="mt-8 text-ink">No students match.</p>
        ) : (
          <>
            <p className="mt-8 text-ink">{subjectLine}</p>
            <section className="mt-6 grid gap-6 lg:grid-cols-3">
              <article className="rounded-card border border-line bg-card p-5">
                <h2 className="font-display text-xl text-ink">Grades</h2>
                <div className="mt-4">
                  <AfterMount>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={gradeCounts}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                      >
                        <XAxis dataKey="grade" tick={axisTick} />
                        <YAxis allowDecimals={false} tick={axisTick} />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          formatter={(value: unknown) => num(asNumber(value), 0)}
                        />
                        <Bar
                          dataKey="students"
                          name="Students"
                          fill="var(--color-teal)"
                          radius={4}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </AfterMount>
                </div>
              </article>
              <article className="rounded-card border border-line bg-card p-5">
                <h2 className="font-display text-xl text-ink">Subject means</h2>
                <div className="mt-4">
                  <AfterMount>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectMeans}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                      >
                        <XAxis dataKey="subject" tick={axisTick} />
                        <YAxis tick={axisTick} />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          formatter={(value: unknown) => num(asNumber(value), 1)}
                        />
                        <Bar dataKey="mean" name="Mean" fill="var(--color-teal)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </AfterMount>
                </div>
              </article>
              <article className="rounded-card border border-line bg-card p-5">
                <h2 className="font-display text-xl text-ink">Mean by form</h2>
                <div className="mt-4">
                  <AfterMount>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formMeans} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <XAxis dataKey="form" tick={axisTick} />
                        <YAxis tick={axisTick} />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          formatter={(value: unknown) => num(asNumber(value), 1)}
                        />
                        <Bar
                          dataKey="mean"
                          name="Mean average"
                          fill="var(--color-teal)"
                          radius={4}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </AfterMount>
                </div>
              </article>
            </section>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-sm">
                <thead>
                  <tr className="border-b border-line text-muted">
                    <th className="py-2 pr-3 text-left font-normal">
                      <span className="inline-flex min-h-11 items-center">ID</span>
                    </th>
                    <SortHeader
                      label="Name"
                      column="name"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                    <th className="py-2 pr-3 text-left font-normal">
                      <span className="inline-flex min-h-11 items-center">Gender</span>
                    </th>
                    <th className="py-2 pr-3 text-left font-normal">
                      <span className="inline-flex min-h-11 items-center">Form</span>
                    </th>
                    <SortHeader
                      label="Average"
                      column="average"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                      align="right"
                    />
                    <SortHeader
                      label="Attendance"
                      column="attendance"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                      align="right"
                    />
                    <SortHeader
                      label="Grade"
                      column="grade"
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                    />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((student) => (
                    <tr key={student.id} className="border-b border-line text-ink">
                      <td className="py-2 pr-3">{student.id}</td>
                      <td className="py-2 pr-3">{student.name}</td>
                      <td className="py-2 pr-3">{student.gender}</td>
                      <td className="py-2 pr-3 tabular-nums">{student.form}</td>
                      <td className="py-2 pr-3 text-right tabular-nums">
                        {num(student.average, 1)}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums">
                        {num(student.attendance, 0)}
                      </td>
                      <td className="py-2 pr-3">{student.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <section className="mt-10 rounded-card border border-copper/40 bg-card p-5">
          <h2 className="font-display text-xl text-ink">Gender field</h2>
          <p className="mt-3 text-sm text-muted">
            {num(conflicts.length, 0)} {conflicts.length === 1 ? "name appears" : "names appear"} as
            more than one gender
            {conflicts.length > 0 ? `: ${conflicts.join(", ")}.` : "."}
          </p>
          <p className="mt-3 text-ink">
            Gender is recorded, but these names appear as both Male and Female. Do not use the field
            until the source is checked. Nothing here has been corrected.
          </p>
        </section>
      </main>
    </>
  );
}
