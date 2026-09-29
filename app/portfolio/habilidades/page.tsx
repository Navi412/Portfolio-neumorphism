"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell } from "@/components/ui";
import { skillAccents, skillCategories } from "@/lib/content";

export default function HabilidadesPage() {
  return (
    <PageShell>
      <PageHeader title="Arsenal Técnico" badge="SKILLS & PROFICIENCY" backHref="/portfolio" backLabel="ATRÁS" />

      <div className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-3">
        {skillCategories.map((cat, ci) => {
          const accent = skillAccents[ci % skillAccents.length];
          return (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.12, duration: 0.4 }}
              className="neu rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="neu-inset-sm flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs font-bold"
                  style={{ color: accent }}
                >
                  {cat.id}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{cat.subtitle}</span>
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">{cat.title}</h2>

              <ul className="mt-8 flex flex-col gap-6">
                {cat.skills.map((s, si) => (
                  <li key={s.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold">{s.name}</span>
                      <span className="shrink-0 font-mono text-xs font-bold" style={{ color: accent }}>
                        <span className="hidden sm:inline">LVL {s.level}</span>
                        <span className="sm:hidden">{s.level}%</span>
                      </span>
                    </div>
                    <div
                      className="neu-inset-sm mt-3 h-3.5 w-full rounded-full p-[3px]"
                      role="progressbar"
                      aria-label={s.name}
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        className="glow h-full rounded-full"
                        style={{ backgroundColor: accent, color: accent }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ delay: 0.3 + ci * 0.2 + si * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          );
        })}
      </div>
    </PageShell>
  );
}
