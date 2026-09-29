"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import IntroLoader from "@/components/IntroLoader";

const marqueeText =
  "SYSTEM.ACCESS // PORTFOLIO // IVÁN MARTÍN // SYSTEM.ACCESS // PORTFOLIO // IVÁN MARTÍN // ";

const rise = (delay: number) => ({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <IntroLoader key="loader" finishLoading={finishLoading} />
      ) : (
        <motion.main
          key="content"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorativo: texto de fondo en movimiento, en una ranura hundida */}
          <div
            aria-hidden="true"
            className="neu-inset-sm pointer-events-none absolute top-6 right-28 left-4 flex sm:right-36 overflow-hidden rounded-full py-2 font-mono text-[11px] tracking-[0.35em] whitespace-nowrap text-muted select-none sm:left-10 sm:top-6"
          >
            <span className="marquee flex">
              <span>{marqueeText}</span>
              <span>{marqueeText}</span>
            </span>
          </div>

          <motion.div
            {...rise(0.05)}
            className="neu w-full max-w-5xl rounded-[2.5rem] px-6 py-12 text-center sm:rounded-[3.5rem] sm:px-12 sm:py-20"
          >
            <h1 className="leading-[0.95] font-extrabold tracking-tight">
              {/* Móvil: en tres líneas */}
              <span className="flex flex-col text-[15vw] sm:hidden">
                <motion.span {...rise(0.15)} className="neu-text">IVÁN</motion.span>
                <motion.span {...rise(0.25)} className="neu-text">MARTÍN</motion.span>
                <motion.span {...rise(0.35)} className="neu-text text-accent">VALLEJO</motion.span>
              </span>
              {/* Escritorio: en dos partes */}
              <span className="hidden flex-col sm:flex">
                <motion.span {...rise(0.15)} className="neu-text text-[9vw] lg:text-8xl">
                  Iván Martín
                </motion.span>
                <motion.span {...rise(0.3)} className="neu-text text-[9vw] text-accent lg:text-8xl">
                  Vallejo
                </motion.span>
              </span>
            </h1>

            <motion.div {...rise(0.5)} className="mt-10 sm:mt-14">
              <Link
                href="/portfolio"
                className="group neu-sm inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-7 text-sm font-bold tracking-[0.15em] uppercase transition-all hover:text-accent active:neu-inset-sm"
              >
                <span className="sm:hidden">ENTRAR</span>
                <span className="hidden sm:inline">Entrar al Portfolio</span>
                <span
                  aria-hidden="true"
                  className="neu-accent flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
