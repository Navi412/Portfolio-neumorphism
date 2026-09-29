"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BgWord } from "@/components/ui";
import { actionLinks, menuItems, type ActionLink } from "@/lib/content";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const highlightSpring: Transition = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 };

function ActionAnchor({ link, className }: { link: ActionLink; className: string }) {
  if (!link.isExternal) {
    return (
      <Link href={link.url} className={className}>
        {link.name}
      </Link>
    );
  }
  if (link.download) {
    return (
      <a href={link.url} download={link.download} className={className}>
        {link.name}
      </a>
    );
  }
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={className}>
      {link.name}
    </a>
  );
}

export default function PortfolioMenu() {
  const [selected, setSelected] = useState(0);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-20 pb-10 sm:px-8 lg:py-16">
      <BgWord word="NAVI" />

      {/*
        Móvil: identidad → menú → acciones (una columna).
        Escritorio: menú a la izquierda; identidad y acciones apiladas a la derecha.
      */}
      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-10">
        {/* Identidad */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neu flex items-center gap-5 rounded-[2rem] p-5 lg:col-start-2 lg:row-start-1 lg:p-7"
        >
          <span className="neu-inset flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl lg:h-16 lg:w-16">
            <span className="glow h-3.5 w-3.5 rounded-full bg-accent text-accent" />
          </span>
          <div className="min-w-0">
            <p className="neu-text text-3xl leading-none font-extrabold tracking-tight lg:text-4xl">Iván</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Graduado en DAM</p>
          </div>
        </motion.section>

        {/* Menú principal */}
        <motion.nav
          aria-label="Menú principal"
          variants={list}
          initial="hidden"
          animate="show"
          className="lg:neu-inset lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:rounded-[2.5rem] lg:p-4"
        >
          <ul className="flex h-full flex-col gap-5 lg:justify-between lg:gap-2">
            {menuItems.map((m, i) => {
              const active = i === selected;
              return (
                <motion.li key={m.url} variants={item}>
                  <Link
                    href={m.url}
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    aria-current={active ? "true" : undefined}
                    className="neu relative isolate flex items-center justify-between gap-4 rounded-3xl px-6 py-5 transition-shadow duration-300 active:neu-inset lg:rounded-[1.75rem] lg:px-8 lg:py-6 lg:[background:transparent] lg:[box-shadow:none]"
                  >
                    {/* Escritorio: una sola pieza en relieve que se desliza hasta el elegido */}
                    {active && (
                      <motion.span
                        layoutId="menu-highlight"
                        aria-hidden="true"
                        className="neu absolute inset-0 -z-10 hidden rounded-[1.75rem] lg:block"
                        transition={highlightSpring}
                      />
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span
                        className={`text-3xl leading-tight font-extrabold tracking-tight transition-colors duration-500 ease-out sm:text-4xl lg:text-5xl ${
                          active ? "lg:text-accent" : "lg:text-muted"
                        }`}
                      >
                        {m.title}
                      </span>
                      <span
                        className={`mt-1 font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-all duration-500 ease-out lg:mt-2 lg:text-muted ${
                          active ? "" : "lg:-translate-x-2 lg:opacity-0"
                        }`}
                      >
                        {m.subtitle}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`neu-inset-sm flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-500 ease-out lg:h-11 lg:w-11 lg:text-accent ${
                        active ? "" : "lg:scale-50 lg:opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>

        {/* Acciones */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="lg:neu flex flex-col lg:col-start-2 lg:row-start-2 lg:justify-center lg:rounded-[2rem] lg:p-7"
        >
          <p className="mb-6 text-center font-mono text-[11px] tracking-[0.3em] text-muted">{"/// ACTIONS ///"}</p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {actionLinks.map((a) => (
              <li key={a.name}>
                <ActionAnchor
                  link={a}
                  className="neu-sm block rounded-full px-5 py-3.5 text-center font-mono text-xs font-medium tracking-[0.18em] text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-accent active:translate-y-0 active:neu-inset-sm"
                />
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
