"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { actionLinks, estudios, proyectos, skillCategories, type ActionLink } from "@/lib/content";

/* ---------- Profundidad con el ratón ---------- */

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };
const PointerContext = createContext<Pointer | null>(null);

/** Envuelve la escena: registra el ratón (solo punteros finos) como valores de -1 a 1. */
export function ParallaxScene({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 20 });
  const y = useSpring(rawY, { stiffness: 90, damping: 20 });

  return (
    <PointerContext.Provider value={{ x, y }}>
      <div
        className={className}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
          rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        }}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
      >
        {children}
      </div>
    </PointerContext.Provider>
  );
}

export const widgetVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
};

/** Pieza que flota: se desplaza `depth` px como máximo siguiendo al ratón. */
export function Float({ depth, className, children }: { depth: number; className?: string; children: ReactNode }) {
  const pointer = useContext(PointerContext);
  const fallback = useMotionValue(0);
  const x = useTransform(pointer?.x ?? fallback, (v) => v * depth);
  const y = useTransform(pointer?.y ?? fallback, (v) => v * depth);

  return (
    <motion.div variants={widgetVariants} className={className}>
      <motion.div style={{ x, y }} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

const cardLink =
  "neu group flex h-full flex-col rounded-[2rem] p-5 transition-shadow duration-300 active:neu-inset sm:p-6";

/* ---------- Dial de habilidades ---------- */

const allSkills = skillCategories.flatMap((c) => c.skills);
const R = 46;

export function SkillDial() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % allSkills.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const skill = allSkills[index];

  return (
    <Link href="/portfolio/habilidades" className={`${cardLink} items-center`} aria-label="Ver habilidades">
      <div className="flex w-full items-center justify-between">
        <span className="eyebrow text-muted">Technical Skills</span>
        <span className="glow h-2 w-2 rounded-full bg-accent text-accent" aria-hidden="true" />
      </div>

      <div className="neu my-5 rounded-full p-3">
        <div className="neu-inset relative flex h-36 w-36 items-center justify-center rounded-full sm:h-40 sm:w-40">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <motion.circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: skill.level / 100 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 5px var(--accent))" }}
            />
          </svg>
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={skill.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="neu-text text-4xl font-extrabold"
              >
                {skill.level}
              </motion.p>
            </AnimatePresence>
            <p className="eyebrow text-muted">LVL</p>
          </div>
        </div>
      </div>

      <div className="relative h-6 w-full overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-bold"
          >
            {skill.name}
          </motion.p>
        </AnimatePresence>
      </div>
    </Link>
  );
}

/* ---------- Proyecto destacado ---------- */

const pigmentum = proyectos[0];

export function ProjectWidget() {
  return (
    <Link href={`/portfolio/proyectos/${pigmentum.slug}`} className={cardLink} aria-label={`Ver proyecto ${pigmentum.title}`}>
      <div className="neu-inset rounded-3xl p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
          {pigmentum.imageUrl && (
            <Image
              src={pigmentum.imageUrl}
              alt={`Fondo de ${pigmentum.title}`}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-accent-ink">{pigmentum.type}</p>
          <p className="mt-1 truncate text-2xl font-extrabold tracking-tight">{pigmentum.title}</p>
        </div>
        <span
          aria-hidden="true"
          className="neu-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full pl-0.5 text-lg transition-transform duration-300 group-hover:scale-110"
        >
          ▶
        </span>
      </div>
    </Link>
  );
}

/* ---------- Formación en curso ---------- */

const current = estudios.find((e) => e.enCurso) ?? estudios[0];

export function StudyWidget() {
  return (
    <Link href="/portfolio/estudios" className={cardLink} aria-label="Ver estudios">
      <div className="flex items-center justify-between gap-3">
        <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-3 py-1.5 eyebrow">
          <span
            className={`glow h-2 w-2 rounded-full ${
              current.enCurso ? "animate-pulse bg-amber-500 text-amber-500" : "bg-emerald-500 text-emerald-500"
            }`}
            aria-hidden="true"
          />
          {current.status}
        </span>
        <span className="eyebrow text-muted">{current.fecha}</span>
      </div>
      <p className="mt-5 text-lg leading-snug font-extrabold tracking-tight">{current.title}</p>
      <p className="mt-2 text-sm text-muted">{current.centro.split(" · ")[0]}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {current.tags.slice(0, 2).map((t) => (
          <span key={t} className="neu-sm rounded-full px-3 py-1 text-xs font-semibold text-muted">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

/* ---------- Accesos directos ---------- */

const icons: Record<string, ReactNode> = {
  GITHUB: <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />,
  CURRICULUM: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5" />
    </>
  ),
  "CARTA RECOMEND.": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export function ActionButton({ link }: { link: ActionLink }) {
  const inner = (
    <>
      <span className="neu-sm flex h-14 w-14 items-center justify-center rounded-full text-muted transition-all duration-300 group-hover:text-accent group-active:neu-inset-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icons[link.name]}
        </svg>
      </span>
      <span className="eyebrow text-center text-[0.7rem] text-muted transition-colors group-hover:text-accent-ink">
        {link.name}
      </span>
    </>
  );
  const cls = "group flex flex-col items-center gap-2.5";

  if (!link.isExternal) {
    return (
      <Link href={link.url} className={cls}>
        {inner}
      </Link>
    );
  }
  if (link.download) {
    return (
      <a href={link.url} download={link.download} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

export function ActionsWidget() {
  return (
    <div className="neu flex h-full flex-col justify-center rounded-[2rem] p-5 sm:p-6">
      <p className="eyebrow mb-5 text-center text-muted">{"/// ACTIONS ///"}</p>
      <div className="grid grid-cols-3 gap-2">
        {actionLinks.map((a) => (
          <ActionButton key={a.name} link={a} />
        ))}
      </div>
    </div>
  );
}
