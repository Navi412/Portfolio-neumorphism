"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { cursos, estudios } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

// Logos con mucho margen propio: se muestran más grandes para igualar tamaños.
const logoScale: Record<string, string> = {
  "/logo-bachiller.png": "scale-[1.3]",
  "/logotipo-universidad-nebrija.jpg": "scale-[1.2]",
};

export default function EstudiosPage() {
  const t = useT();
  const s = useStrings();
  return (
    <PageShell bgWord="STATS">
      <PageHeader title={s.studiesTitle} badge="TRAINING & SKILLS" backHref="/portfolio" backLabel={s.back} />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col gap-10">
          {estudios.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
              className="neu relative grid gap-6 rounded-[2rem] p-6 sm:grid-cols-[160px_1fr] sm:gap-8 sm:p-10"
            >
              <p
                className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.15em] text-muted"
                aria-hidden="true"
              >
                <span className="hidden sm:inline">SYS.LOG // RECORD_FOUND</span>
                <span className="sm:hidden">ID: {e.id}</span>
              </p>

              <div className="neu-inset flex h-32 w-32 items-center justify-center rounded-3xl p-3 sm:h-40 sm:w-40">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
                  {e.logo ? (
                    <Image
                      src={e.logo}
                      alt={s.logoOf(t(e.centro).split(" · ")[0])}
                      width={144}
                      height={144}
                      className={`h-full w-full object-contain p-2 ${logoScale[e.logo] ?? ""}`}
                    />
                  ) : (
                    <span className="text-4xl font-extrabold text-muted">{e.id}</span>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <p className="eyebrow text-accent-ink">{t(e.subtitle)}</p>
                <h2 className="mt-2 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{t(e.title)}</h2>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 eyebrow">
                    <span
                      className={`glow h-2 w-2 rounded-full ${
                        e.enCurso ? "animate-pulse bg-amber-500 text-amber-500" : "bg-emerald-500 text-emerald-500"
                      }`}
                      aria-hidden="true"
                    />
                    {t(e.status)}
                  </span>
                  <span className="font-semibold">{t(e.centro)}</span>
                  <span className="font-semibold text-muted">{e.fecha}</span>
                </div>

                <p className="mt-5 max-w-3xl leading-relaxed text-muted">{t(e.desc)}</p>
                <div className="mt-6">
                  <TagList tags={t(e.tags)} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <aside aria-labelledby="cursos-title" className="lg:sticky lg:top-8">
          <h2 id="cursos-title" className="eyebrow text-accent-ink">
            {s.coursesTitle}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cursos.map((c, i) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                className="group neu rounded-3xl transition-transform hover:-translate-y-0.5"
              >
                <Link href={`/portfolio/estudios/${c.id}`} className="block p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`glow h-2 w-2 shrink-0 rounded-full ${
                        c.enCurso ? "animate-pulse bg-amber-500 text-amber-500" : "bg-emerald-500 text-emerald-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{s.courseStatus(!!c.enCurso)}:</span>
                    <span className="font-semibold">{c.proveedor}</span>
                    <span className="font-semibold text-muted">· {t(c.fecha)}</span>
                  </div>
                  <h3 className="mt-2 leading-snug font-extrabold tracking-tight">
                    {t(c.title)}
                    <span
                      className="ml-1.5 inline-block text-accent-ink transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </h3>
                  <div className="mt-3">
                    <TagList tags={t(c.tags)} />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
