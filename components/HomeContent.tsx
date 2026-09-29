"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ActionsWidget,
  Float,
  ParallaxScene,
  ProjectWidget,
  SkillDial,
  StudyWidget,
  widgetVariants,
} from "@/components/HomeWidgets";
import ContributionsWidget from "@/components/ContributionsWidget";
import type { Contributions } from "@/lib/github";

const marqueeText =
  "SYSTEM.ACCESS // PORTFOLIO // IVÁN MARTÍN // SYSTEM.ACCESS // PORTFOLIO // IVÁN MARTÍN // ";

// Tecnologías principales que se muestran bajo el nombre.
const heroTech = ["Unity 3D", "C# Scripting", "Next.js & React", "Python"];

const scene: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/** Portada: presentación central rodeada de piezas neumórficas. */
export default function HomeContent({ contributions }: { contributions: Contributions | null }) {
  return (
    <ParallaxScene className="flex min-h-screen flex-col px-4 pt-20 pb-10 sm:px-8 lg:justify-center lg:pt-24">
      {/* Decorativo: texto de fondo en movimiento, en una ranura hundida */}
      <div
        aria-hidden="true"
        className="neu-inset-sm pointer-events-none absolute top-6 right-28 left-4 flex overflow-hidden rounded-full py-2 font-mono text-[11px] tracking-[0.35em] whitespace-nowrap text-muted select-none sm:right-36 sm:left-10"
      >
        <span className="marquee flex">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </span>
      </div>

      {/*
        Móvil: presentación arriba y las piezas debajo (2 columnas desde 640px).
        Escritorio: presentación en el centro y dos piezas a cada lado.
      */}
      <motion.div
        variants={scene}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
      >
        {/* Presentación */}
        <motion.section
          variants={widgetVariants}
          className="neu flex flex-col items-center justify-center rounded-[2.5rem] px-6 py-12 text-center sm:col-span-2 sm:px-10 lg:col-span-6 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:rounded-[3rem] lg:py-16"
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 eyebrow text-muted">
              <span className="glow h-2 w-2 animate-pulse rounded-full bg-amber-500 text-amber-500" aria-hidden="true" />
              Cursando IA y Big Data
            </span>
            <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 eyebrow text-muted">
              <span className="glow h-2 w-2 rounded-full bg-accent text-accent" aria-hidden="true" />
              Graduado en DAM
            </span>
          </div>

          <h1 className="mt-6 leading-[0.95] font-extrabold tracking-tight">
            {/* Móvil: en tres líneas */}
            <span className="flex flex-col text-[15vw] sm:hidden">
              <span className="neu-text">IVÁN</span>
              <span className="neu-text">MARTÍN</span>
              <span className="neu-text text-accent">VALLEJO</span>
            </span>
            {/* Escritorio: en dos partes */}
            <span className="hidden flex-col sm:flex">
              <span className="neu-text text-7xl xl:text-8xl">Iván Martín</span>
              <span className="neu-text text-7xl text-accent xl:text-8xl">Vallejo</span>
            </span>
          </h1>

          <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
            {heroTech.map((t) => (
              <li key={t} className="neu-sm rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted">
                {t}
              </li>
            ))}
          </ul>

          <Link
            href="/portfolio"
            className="group neu-sm mt-10 inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-7 text-sm font-bold tracking-[0.15em] uppercase transition-all hover:text-accent-ink active:neu-inset-sm"
          >
            <span className="sm:hidden">ENTRAR</span>
            <span className="hidden sm:inline">Entrar al Portfolio</span>
            <span
              aria-hidden="true"
              className="neu-accent flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.section>

        {/* Izquierda */}
        <Float depth={14} className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <SkillDial />
        </Float>
        <Float depth={8} className="lg:col-span-3 lg:col-start-1 lg:row-start-2">
          <ActionsWidget />
        </Float>

        {/* Derecha */}
        <Float depth={12} className="lg:col-span-3 lg:col-start-10 lg:row-start-1">
          <ProjectWidget />
        </Float>
        <Float depth={18} className="lg:col-span-3 lg:col-start-10 lg:row-start-2">
          <StudyWidget />
        </Float>

        {/* Actividad en GitHub (se omite si no se pudieron obtener los datos) */}
        {contributions && (
          <motion.div variants={widgetVariants} className="min-w-0 sm:col-span-2 lg:col-span-12 lg:row-start-3">
            <ContributionsWidget data={contributions} />
          </motion.div>
        )}
      </motion.div>
    </ParallaxScene>
  );
}
