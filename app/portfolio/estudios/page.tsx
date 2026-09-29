"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { estudios } from "@/lib/content";

// Logos con mucho margen propio: se muestran más grandes para igualar tamaños.
const logoScale: Record<string, string> = {
  "/logo-bachiller.png": "scale-[1.3]",
  "/logotipo-universidad-nebrija.jpg": "scale-[1.2]",
};

export default function EstudiosPage() {
  return (
    <PageShell bgWord="STATS">
      <PageHeader title="Estudios" badge="TRAINING & SKILLS" backHref="/portfolio" backLabel="ATRÁS" />

      <div className="mt-12 flex flex-col gap-10">
        {estudios.map((e, i) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
            className="neu relative grid gap-6 rounded-[2rem] p-6 sm:grid-cols-[160px_1fr] sm:gap-8 sm:p-10"
          >
            <p className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.15em] text-muted" aria-hidden="true">
              <span className="hidden sm:inline">SYS.LOG // RECORD_FOUND</span>
              <span className="sm:hidden">ID: {e.id}</span>
            </p>

            <div className="neu-inset flex h-32 w-32 items-center justify-center rounded-3xl p-3 sm:h-40 sm:w-40">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
                {e.logo ? (
                  <Image
                    src={e.logo}
                    alt={`Logo de ${e.centro}`}
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
              <p className="eyebrow text-accent-ink">{e.subtitle}</p>
              <h2 className="mt-2 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{e.title}</h2>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 eyebrow">
                  <span
                    className={`glow h-2 w-2 rounded-full ${
                      e.enCurso ? "animate-pulse bg-amber-500 text-amber-500" : "bg-emerald-500 text-emerald-500"
                    }`}
                    aria-hidden="true"
                  />
                  {e.status}
                </span>
                <span className="font-semibold">{e.centro}</span>
                <span className="font-semibold text-muted">{e.fecha}</span>
              </div>

              <p className="mt-5 max-w-3xl leading-relaxed text-muted">{e.desc}</p>
              <div className="mt-6">
                <TagList tags={e.tags} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
