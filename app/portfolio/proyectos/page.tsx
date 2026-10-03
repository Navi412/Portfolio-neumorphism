"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { projectAccents, proyectos } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

export default function ProyectosPage() {
  const t = useT();
  const s = useStrings();
  return (
    <PageShell bgWord="INFILTRATION">
      <PageHeader title={s.projectsTitle} badge={s.projectsBadge} backHref="/portfolio" backLabel={s.back} />

      <div className="mt-12 flex flex-col gap-10">
        {proyectos.map((p, i) => {
          const accent = projectAccents[p.slug];
          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
            >
              <Link
                href={`/portfolio/proyectos/${p.slug}`}
                className="group neu grid gap-6 rounded-[2rem] p-4 transition-all active:neu-inset sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10"
                style={{ "--accent": accent } as React.CSSProperties}
              >
                <div className="neu-inset rounded-3xl p-2.5 sm:p-3">
                  <div className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-72">
                    {p.imageUrl && p.imageFit === "icon" ? (
                      // Icono de app: centrado, entero y flotando sobre el hueco.
                      <div className="flex h-full min-h-48 w-full items-center justify-center p-6">
                        <Image
                          src={p.imageUrl}
                          alt={s.iconOf(p.title)}
                          width={160}
                          height={160}
                          unoptimized
                          className="h-32 w-32 drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)] sm:h-40 sm:w-40 lg:transition-transform lg:duration-500 lg:group-hover:scale-105 lg:group-hover:-rotate-3"
                        />
                      </div>
                    ) : p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={s.backgroundOf(p.title)}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top lg:transition-transform lg:duration-500 lg:group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center eyebrow text-accent-ink">
                        {p.imagePlaceholder}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col px-2 pb-2 lg:py-4 lg:pr-4">
                  <div className="flex items-center justify-between gap-4 eyebrow">
                    <span className="neu-inset-sm rounded-full px-3 py-1 text-accent-ink">
                      <span className="sm:hidden">#{p.id}</span>
                      <span className="hidden sm:inline">{p.id}</span>
                    </span>
                    <span className="text-muted">{p.type}</span>
                  </div>
                  <h2 className="neu-text mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{p.title}</h2>
                  {p.enDesarrollo && (
                    <span
                      className="neu-inset-sm mt-4 flex items-center gap-2 self-start rounded-full px-3 py-1 eyebrow text-accent-ink"
                      style={{ "--accent": "#f59e0b" } as React.CSSProperties}
                    >
                      <span aria-hidden>🚧</span>
                      {s.inDev}
                    </span>
                  )}
                  <p className="mt-4 leading-relaxed text-muted">{t(p.desc)}</p>
                  <div className="mt-6">
                    <TagList tags={p.tech} accent={accent} />
                  </div>
                  <span className="neu-accent mt-8 self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.18em] transition-transform lg:group-hover:translate-x-1.5">
                    {s.seeProject}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
}
