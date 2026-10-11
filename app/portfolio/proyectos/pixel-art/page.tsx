"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { pixelArt, projectAccents } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

const accent = projectAccents["pixel-art"];
const { tech, funcionalidades, decisiones } = pixelArt;

export default function PixelArtPage() {
  const t = useT();
  const s = useStrings();
  return (
    <PageShell bgWord="PIXEL">
      <div style={{ "--accent": accent } as React.CSSProperties}>
        <PageHeader
          title="Editor de píxel art"
          badge="APP // WEB & DESKTOP"
          backHref="/portfolio/proyectos"
          backLabel={s.back}
        />

        {/* 1. Presentación */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="neu-inset mt-12 rounded-[2rem] p-6 sm:p-10"
        >
          <p className="max-w-4xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">{t(pixelArt.intro)}</p>
        </motion.section>

        {/* 2. Ficha */}
        <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
          <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 eyebrow text-accent-ink">
            {t(pixelArt.label)}
          </p>
          <div>
            <p className="max-w-3xl text-lg leading-relaxed">{t(pixelArt.desc)}</p>
            <div className="mt-6">
              <TagList tags={tech} accent={accent} />
            </div>
          </div>
        </section>

        {/* 3. Qué se puede hacer */}
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

        {/* 4. Decisiones técnicas */}
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

        {/* 5. Versión de escritorio */}
        <section className="neu mt-14 rounded-[2rem] p-6 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {t({ es: "Versión de escritorio", en: "Desktop version" })}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t(pixelArt.escritorio)}</p>
        </section>
      </div>
    </PageShell>
  );
}
