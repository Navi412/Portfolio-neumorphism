"use client";

import { useEffect, useRef } from "react";
import { GITHUB_USER, type ContributionDay, type Contributions } from "@/lib/github";
import { useStrings, type Strings } from "@/lib/strings";

// Fechas "YYYY-MM-DD" leídas en UTC para que servidor y navegador den lo mismo.
const parse = (date: string) => new Date(`${date}T00:00:00Z`);
const formatDate = (date: string, s: Strings) => {
  const d = parse(date);
  return s.formatDate(d.getUTCDate(), s.months[d.getUTCMonth()], d.getUTCFullYear());
};

/** Agrupa los días en semanas (columnas de domingo a sábado), como GitHub. */
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = Array(parse(days[0].date).getUTCDay()).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  return weeks;
}

/** Nombre del mes sobre la semana en que empieza (la primera solo si hay sitio). */
function monthLabels(weeks: (ContributionDay | null)[][], months: string[]) {
  return weeks.map((week, i) => {
    const days = week.filter((d): d is ContributionDay => d !== null).map((d) => parse(d.date));
    const monthStart = days.find((d) => d.getUTCDate() === 1);
    if (monthStart) return months[monthStart.getUTCMonth()];
    if (i === 0 && days[0].getUTCDate() <= 14) return months[days[0].getUTCMonth()];
    return "";
  });
}

function stats(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  let best = days[0];
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (d.count > best.count) best = d;
  }
  const activeDays = days.filter((d) => d.count > 0).length;
  return { longest, best, activeDays };
}

const levelStyle = (level: number) =>
  level === 0
    ? undefined
    : {
        backgroundColor: `color-mix(in oklab, var(--accent) ${[0, 35, 58, 80, 100][level]}%, var(--bg))`,
        boxShadow: level === 4 ? "0 0 8px color-mix(in oklab, var(--accent) 60%, transparent)" : undefined,
      };

function Cell({ level, className = "", title }: { level: number; className?: string; title?: string }) {
  return (
    <span
      title={title}
      className={`block rounded-[4px] ${level === 0 ? "neu-inset-sm" : ""} ${className}`}
      style={levelStyle(level)}
    />
  );
}

export default function ContributionsWidget({ data }: { data: Contributions }) {
  const scroller = useRef<HTMLDivElement>(null);
  const s = useStrings();
  const weeks = toWeeks(data.days);
  const { longest, best, activeDays } = stats(data.days);

  // En pantallas estrechas el gráfico se desplaza: empezar mostrando lo más reciente.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const chips: { label: string; value: string; hint?: string }[] = [
    { label: s.activeDays, value: String(activeDays) },
    { label: s.longestStreak, value: s.streakDays(longest) },
    {
      label: s.bestDay,
      value: best.count > 0 ? s.contributions(best.count) : "—",
      hint: best.count > 0 ? formatDate(best.date, s) : undefined,
    },
  ];

  return (
    <section className="neu rounded-[2rem] p-5 sm:p-8" aria-labelledby="gh-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-accent-ink">GitHub · {GITHUB_USER}</p>
          <h2 id="gh-title" className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span className="neu-text text-accent">{data.total}</span> {s.contributionsTitle}
          </h2>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="neu-sm self-start rounded-full px-5 py-2.5 eyebrow text-muted transition-all duration-300 hover:text-accent-ink active:neu-inset-sm sm:self-auto"
        >
          {s.viewProfile}
        </a>
      </div>

      {/* Gráfico */}
      <div className="neu-inset mt-6 rounded-3xl p-4 sm:p-5">
        <div ref={scroller} className="overflow-x-auto pb-1">
          {/* Columna de días + una columna por semana; las celdas son cuadradas y se estiran
              para llenar el ancho (con un mínimo, por debajo del cual se desplaza). */}
          <div
            className="grid gap-x-[4px] gap-y-1.5"
            style={{
              gridTemplateColumns: `2rem repeat(${weeks.length}, minmax(10px, 1fr))`,
              minWidth: `calc(2rem + ${weeks.length} * 14px)`,
            }}
            role="img"
            aria-label={s.contributionsAria(data.total)}
          >
            {/* Meses */}
            <span aria-hidden="true" />
            {monthLabels(weeks, s.months).map((month, i) => (
              <span key={i} aria-hidden="true" className="overflow-visible text-[11px] font-semibold whitespace-nowrap text-muted">
                {month}
              </span>
            ))}

            {/* Días de la semana */}
            <div aria-hidden="true" className="grid grid-rows-7 gap-[4px] text-[11px] font-semibold text-muted">
              {s.weekdays.map((w, i) => (
                <span key={i} className="flex items-center">
                  {w}
                </span>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div
                key={wi}
                aria-hidden="true"
                className="gh-week flex flex-col gap-[4px]"
                style={{ animationDelay: `${wi * 14}ms` }}
              >
                {week.map((day, di) =>
                  day ? (
                    <Cell
                      key={di}
                      level={day.level}
                      className="aspect-square w-full"
                      title={`${s.contributions(day.count)} · ${formatDate(day.date, s)}`}
                    />
                  ) : (
                    <span key={di} className="aspect-square w-full" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] font-semibold text-muted" aria-hidden="true">
          <span className="mr-1">{s.less}</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <Cell key={l} level={l} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          ))}
          <span className="ml-1">{s.more}</span>
        </div>
      </div>

      {/* Datos */}
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {chips.map((c) => (
          <li key={c.label} className="neu-inset-sm flex flex-col rounded-2xl px-4 py-3">
            <span className="eyebrow text-muted">{c.label}</span>
            <span className="mt-1 text-lg font-extrabold">{c.value}</span>
            {c.hint && <span className="text-xs font-semibold text-muted">{c.hint}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
