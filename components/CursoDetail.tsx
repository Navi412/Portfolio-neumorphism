"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { cursos } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

export default function CursoDetail({ id }: { id: string }) {
  const t = useT();
  const s = useStrings();
  const c = cursos.find((x) => x.id === id)!;
  const aprendizajes = c.aprendizajes ? t(c.aprendizajes) : [];

  return (
    <PageShell bgWord="COURSE">
      <PageHeader
        title={t(c.title)}
        badge={c.proveedor.toUpperCase()}
        backHref="/portfolio/estudios"
        backLabel={s.back}
      />

      {/* 1. Presentación */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="neu-inset mt-12 flex flex-col gap-6 rounded-[2rem] p-6 sm:p-10"
      >
        <p className="max-w-4xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">{t(c.desc)}</p>
        {(c.url || c.verifyUrl) && (
          <div className="flex flex-wrap gap-4">
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-accent rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform hover:translate-x-1"
              >
                {s.viewCertificate}
              </a>
            )}
            {c.verifyUrl && (
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-sm rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] text-muted transition-all hover:text-accent-ink active:neu-inset-sm"
              >
                {s.verifyBadge}
              </a>
            )}
          </div>
        )}
      </motion.section>

      {/* 2. Ficha */}
      <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
        <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 eyebrow text-accent-ink">
          {s.courseInfo}
        </p>
        <div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-muted">{s.provider}</dt>
              <dd className="mt-1 font-semibold">{c.proveedor}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{s.date}</dt>
              <dd className="mt-1 font-semibold">{t(c.fecha)}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">{s.status}</dt>
              <dd className="mt-1 inline-flex items-center gap-2 font-semibold">
                <span
                  className={`glow h-2 w-2 rounded-full ${
                    c.enCurso ? "animate-pulse bg-amber-500 text-amber-500" : "bg-emerald-500 text-emerald-500"
                  }`}
                  aria-hidden="true"
                />
                {s.courseStatus(!!c.enCurso)}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <TagList tags={t(c.tags)} />
          </div>
        </div>
      </section>

      {/* 3. Qué estoy aprendiendo / qué aprendí */}
      {aprendizajes.length > 0 && (
        <section className="mt-14">
          <h2 className="neu-text text-3xl font-extrabold tracking-tight sm:text-4xl">
            {s.whatILearn(!!c.enCurso)}
          </h2>
          <ol className="mt-8 grid auto-rows-fr gap-6 md:grid-cols-2">
            {aprendizajes.map((a, i) => (
              <li key={a} className="neu flex h-full items-center gap-5 rounded-3xl px-6 py-5">
                <span className="neu-inset-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 4. Qué aporta a mi perfil */}
      {c.aporta && (
        <section className="neu mt-14 rounded-[2rem] p-6 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight">{s.whatItGivesMe}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t(c.aporta)}</p>
        </section>
      )}
    </PageShell>
  );
}
