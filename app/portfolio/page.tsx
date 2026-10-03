"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ActionButton } from "@/components/HomeWidgets";
import { BgWord } from "@/components/ui";
import { actionLinks, estudios, menuItems, proyectos, skillCategories, socialLinks } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings, type Strings } from "@/lib/strings";

const scene: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } },
};

const ringSpring: Transition = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 };

// Dato real de cada sección, sacado del propio contenido.
const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);
const tileMeta = (s: Strings): Record<string, string> => ({
  "/portfolio/estudios": s.countStudies(estudios.length),
  "/portfolio/proyectos": s.countProjects(proyectos.length),
  "/portfolio/habilidades": s.countSkills(skillCount),
  "/portfolio/social": s.countChannels(socialLinks.length),
});

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const tileIcons: Record<string, ReactNode> = {
  // Birrete
  "/portfolio/estudios": (
    <svg {...iconProps}>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </svg>
  ),
  // Mando
  "/portfolio/proyectos": (
    <svg {...iconProps}>
      <path d="M7 8h10a5 5 0 0 1 5 5v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a5 5 0 0 1 5-5z" />
      <path d="M7 11v3M5.5 12.5h3M15.5 12h.01M17.5 13.5h.01" />
    </svg>
  ),
  // Deslizadores
  "/portfolio/habilidades": (
    <svg {...iconProps}>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  // Bocadillo
  "/portfolio/social": (
    <svg {...iconProps}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </svg>
  ),
};

export default function PortfolioMenu() {
  const [selected, setSelected] = useState(0);
  const t = useT();
  const s = useStrings();
  const meta = tileMeta(s);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-32 pb-10 sm:px-8 lg:pt-36 lg:pb-14">
      <BgWord word="NAVI" />

      <motion.div
        variants={scene}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-6xl flex-col gap-6 lg:gap-8"
      >
        {/* Barra superior: identidad + accesos */}
        <motion.div
          variants={rise}
          className="neu flex flex-col gap-6 rounded-[2rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-center gap-4">
            <span className="neu-inset flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
              <span className="glow h-3.5 w-3.5 rounded-full bg-accent text-accent" />
            </span>
            <div className="min-w-0">
              <p className="neu-text text-3xl leading-none font-extrabold tracking-tight">Iván</p>
              <p className="mt-2 eyebrow text-muted">{s.graduated}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="eyebrow text-center text-muted sm:hidden">{"/// ACTIONS ///"}</p>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-6">
              {actionLinks.map((a) => (
                <ActionButton key={a.icon} link={a} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Secciones */}
        <nav aria-label={s.mainMenu}>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
            {menuItems.map((m, i) => {
              const active = i === selected;
              return (
                <motion.li key={m.url} variants={rise}>
                  <Link
                    href={m.url}
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    aria-current={active ? "true" : undefined}
                    className="group neu relative isolate flex h-full min-h-44 flex-col overflow-hidden rounded-[2rem] p-6 transition-shadow duration-300 active:neu-inset sm:min-h-52 lg:min-h-60 lg:p-8"
                  >
                    {/* Escritorio: anillo de color que viaja hasta la sección elegida */}
                    {active && (
                      <motion.span
                        layoutId="tile-ring"
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10 hidden rounded-[2rem] lg:block"
                        style={{
                          boxShadow:
                            "inset 0 0 0 2px var(--accent), 0 0 28px color-mix(in oklab, var(--accent) 35%, transparent)",
                        }}
                        transition={ringSpring}
                      />
                    )}

                    {/* Número en relieve de fondo */}
                    <span
                      aria-hidden="true"
                      className="neu-emboss pointer-events-none absolute -right-2 -bottom-6 -z-10 text-[7rem] leading-none font-extrabold tracking-tighter select-none lg:text-[9rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`neu-inset flex h-14 w-14 items-center justify-center rounded-2xl text-accent transition-colors duration-500 [&>svg]:h-7 [&>svg]:w-7 ${
                          active ? "" : "lg:text-muted"
                        }`}
                      >
                        {tileIcons[m.url]}
                      </span>
                      <span className="neu-inset-sm rounded-full px-3 py-1 eyebrow text-muted">{meta[m.url]}</span>
                    </div>

                    <div className="mt-auto pt-8">
                      <span
                        className={`block text-3xl leading-tight font-extrabold tracking-tight transition-colors duration-500 sm:text-4xl lg:text-5xl ${
                          active ? "lg:text-accent" : ""
                        }`}
                      >
                        {t(m.title)}
                      </span>
                      <span className="mt-2 flex items-center gap-3">
                        <span
                          className={`eyebrow text-accent-ink transition-all duration-500 ease-out ${
                            active ? "" : "lg:-translate-x-2 lg:opacity-0"
                          }`}
                        >
                          {m.subtitle}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`neu-accent flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-500 ease-out group-hover:translate-x-1 ${
                            active ? "" : "lg:scale-50 lg:opacity-0"
                          }`}
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </main>
  );
}
