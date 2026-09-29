"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { backlog, projectAccents } from "@/lib/content";

const accent = projectAccents.backlog;
const { repoUrl, tech, funcionalidades } = backlog;

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="neu-inset-sm rounded-md px-1.5 py-0.5 font-mono text-[0.85em] text-accent">{children}</code>
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
          className="neu-inset mt-12 flex flex-col gap-8 rounded-[2rem] p-6 sm:p-10"
        >
          <p className="max-w-4xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl">{backlog.intro}</p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-accent self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform hover:translate-x-1"
          >
            ▶ VER REPOSITORIO EN GITHUB
          </a>
        </motion.section>

        {/* 2. Ficha */}
        <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
          <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.2em] text-accent">
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
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {funcionalidades.map((f, i) => (
              <li key={f} className="neu flex items-start gap-4 rounded-3xl p-5">
                <span className="neu-inset-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-2 leading-relaxed">{f}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Uso y diseño técnico */}
        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="neu rounded-[2rem] p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Cómo se usa</h2>
            <p className="mt-4 leading-relaxed text-muted">
              App de escritorio para Windows (instalador .exe, sin necesidad de Node/git/terminal) y APK para
              Android. También corre desde código fuente (<Code>npm start</Code> en navegador,{" "}
              <Code>npm run electron</Code> como app nativa) — mismo backend para ambas formas. CI/CD con GitHub
              Actions compila y publica el instalador de Windows automáticamente al crear un tag de versión.
            </p>
          </div>
          <div className="neu rounded-[2rem] p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight">Diseño técnico</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Arquitectura en capas con dependencia en una sola dirección: <Code>/ui → /api → /db, /sync, /core</Code>.
              El corazón de la app es la derivación de sesiones de juego a partir de pares de instantáneas
              consecutivas del contador acumulado — lógica pura en <Code>/core</Code>, sin dependencias y
              completamente testeable, que trata igual los datos de APIs externas y los introducidos a mano, sin que
              el origen se filtre a la capa de estadísticas.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
