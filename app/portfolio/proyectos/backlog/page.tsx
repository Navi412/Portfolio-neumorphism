"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { backlog, projectAccents } from "@/lib/content";

const accent = projectAccents.backlog;
const { repoUrl, tech, funcionalidades } = backlog;

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="neu-inset-sm rounded-md px-1.5 py-0.5 font-mono text-[0.85em] text-accent-ink">{children}</code>
);

export default function BacklogPage() {
  return (
    <PageShell bgWord="BACKLOG">
      <div style={{ "--accent": accent } as React.CSSProperties}>
        <PageHeader
          title="Backlog"
          badge="APP // DESKTOP & ANDROID"
          backHref="/portfolio/proyectos"
          backLabel="ATRÁS"
        />

        {/* 1. Presentación */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu-inset mt-12 flex flex-col gap-8 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:p-10"
        >
          <Image
            src="/icon8b.svg"
            alt="Icono de Backlog"
            width={112}
            height={112}
            unoptimized
            className="h-20 w-20 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.25)] sm:h-28 sm:w-28"
          />
          <div className="flex flex-col gap-6">
            <p className="max-w-4xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">{backlog.intro}</p>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-accent self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform hover:translate-x-1"
            >
              ▶ VER REPOSITORIO EN GITHUB
            </a>
          </div>
        </motion.section>

        {/* 2. Ficha */}
        <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
          <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 eyebrow text-accent-ink">
            {backlog.label}
          </p>
          <div>
            <p className="max-w-3xl text-lg leading-relaxed">{backlog.desc}</p>
            <div className="mt-6">
              <TagList tags={tech} accent={accent} />
            </div>
          </div>
        </section>

        {/* 3. Qué hace */}
        <section className="mt-14">
          <h2 className="neu-text text-3xl font-extrabold tracking-tight sm:text-4xl">Qué hace</h2>
          {/* Filas de igual altura y número centrado con su texto */}
          <ol className="mt-8 grid auto-rows-fr gap-6 md:grid-cols-2">
            {funcionalidades.map((f, i) => (
              <li key={f} className="neu flex h-full items-center gap-5 rounded-3xl px-6 py-5">
                <span className="neu-inset-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Uso y diseño técnico */}
        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="neu rounded-[2rem] p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Cómo se usa</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Instalador para Windows y APK para Android, sin necesidad de terminal. Con cada versión nueva, GitHub
              Actions compila y publica el instalador automáticamente.
            </p>
          </div>
          <div className="neu rounded-[2rem] p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Diseño técnico</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Arquitectura por capas: <Code>/ui → /api → /db, /sync, /core</Code>. El núcleo calcula las sesiones de
              juego comparando instantáneas del contador de horas: lógica pura, sin dependencias y fácil de testear.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
