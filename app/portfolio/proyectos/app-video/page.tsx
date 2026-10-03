"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { appVideo, projectAccents } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

const accent = projectAccents["app-video"];
/** Ámbar para el aviso de "en desarrollo", independiente del acento del proyecto. */
const warn = "#f59e0b";
const { repoUrl, tech, stats, funcionalidades, decisiones, proximosPasos } = appVideo;

export default function AppVideoPage() {
  const t = useT();
  const s = useStrings();
  return (
    <PageShell bgWord="EDITOR">
      <div style={{ "--accent": accent } as React.CSSProperties}>
        <PageHeader
          title="App Video"
          badge="APP // DESKTOP VIDEO EDITOR"
          backHref="/portfolio/proyectos"
          backLabel={s.back}
        />

        {/* Aviso: en desarrollo */}
        <motion.aside
          role="note"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu mt-10 flex items-start gap-5 rounded-[2rem] border-l-[6px] p-6 sm:items-center sm:p-8"
          style={{ "--accent": warn, borderLeftColor: warn } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="neu-inset-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
          >
            🚧
          </span>
          <div>
            <p className="flex items-center gap-2.5 eyebrow text-accent-ink">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {s.devAlertTitle}
            </p>
            <p className="mt-2 text-lg leading-relaxed">{s.devAlertText}</p>
          </div>
        </motion.aside>

        {/* 1. Presentación */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="neu-inset mt-12 flex flex-col gap-8 rounded-[2rem] p-6 sm:p-10"
        >
          <p className="max-w-4xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">{t(appVideo.intro)}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((st) => (
              <div key={st.value} className="neu rounded-3xl px-6 py-5">
                <p className="font-mono text-3xl font-extrabold text-accent-ink">{st.value}</p>
                <p className="mt-1 text-sm text-muted">{t(st.label)}</p>
              </div>
            ))}
          </div>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-accent self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform hover:translate-x-1"
          >
            {s.viewRepo}
          </a>
        </motion.section>

        {/* 2. Ficha */}
        <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
          <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 eyebrow text-accent-ink">
            {t(appVideo.label)}
          </p>
          <div>
            <p className="max-w-3xl text-lg leading-relaxed">{t(appVideo.desc)}</p>
            <div className="mt-6">
              <TagList tags={tech} accent={accent} />
            </div>
          </div>
        </section>

        {/* 3. Qué puede hacer hoy */}
        <section className="mt-14">
          <h2 className="neu-text text-3xl font-extrabold tracking-tight sm:text-4xl">{s.featuresToday}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {t(funcionalidades).map((f, i) => (
              <li key={f} className="neu flex h-full items-center gap-5 rounded-3xl px-6 py-5">
                <span className="neu-inset-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Decisiones de arquitectura */}
        <section className="mt-14">
          <h2 className="neu-text text-3xl font-extrabold tracking-tight sm:text-4xl">{s.archDecisions}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t(decisiones).map((d) => (
              <div key={d.title} className="neu rounded-[2rem] p-6 sm:p-8">
                <h3 className="text-xl font-extrabold tracking-tight text-accent-ink">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Próximos pasos */}
        <section className="neu mt-14 rounded-[2rem] p-6 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight">{s.nextSteps}</h2>
          <ul className="mt-4 flex flex-col gap-2 text-muted">
            {t(proximosPasos).map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed">
                <span className="text-accent-ink">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
