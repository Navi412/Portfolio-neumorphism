"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { projectAccents, proyectos } from "@/lib/content";

export default function ProyectosPage() {
  return (
    <PageShell bgWord="INFILTRATION">
      <PageHeader title="Log de Proyectos" badge="PROYECTOS Y DESARROLLOS" backHref="/portfolio" backLabel="ATRÁS" />

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
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={`Fondo de ${p.title}`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover lg:opacity-70 lg:saturate-0 lg:transition-all lg:duration-500 lg:group-hover:scale-105 lg:group-hover:opacity-100 lg:group-hover:saturate-100"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-xs tracking-[0.2em] text-accent">
                        {p.imagePlaceholder}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col px-2 pb-2 lg:py-4 lg:pr-4">
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em]">
                    <span className="neu-inset-sm rounded-full px-3 py-1 font-medium text-accent">
                      <span className="sm:hidden">#{p.id}</span>
                      <span className="hidden sm:inline">{p.id}</span>
                    </span>
                    <span className="text-muted">{p.type}</span>
                  </div>
                  <h2 className="neu-text mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted">{p.desc}</p>
                  <div className="mt-6">
                    <TagList tags={p.tech} accent={accent} />
                  </div>
                  <span className="neu-accent mt-8 self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.18em] transition-transform lg:group-hover:translate-x-1.5">
                    ▶ VER PROYECTO
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
