"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const words = ["TAKE", "YOUR", "TIME"];
// Índice global de la primera letra de cada palabra (para el retardo escalonado).
const wordOffsets = words.map((_, i) => words.slice(0, i).join("").length);

type IntroLoaderProps = { finishLoading: () => void };

export default function IntroLoader({ finishLoading }: IntroLoaderProps) {
  const finishLoadingRef = useRef(finishLoading);
  useEffect(() => {
    finishLoadingRef.current = finishLoading;
  }, [finishLoading]);

  useEffect(() => {
    const timer = setTimeout(() => finishLoadingRef.current(), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-14 bg-base px-4"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      role="status"
      aria-label="TAKE YOUR TIME"
    >
      <div className="flex flex-col items-center gap-2 leading-none font-extrabold tracking-tight sm:flex-row sm:gap-8">
        {words.map((word, w) => (
          <span key={word} className="flex text-6xl sm:text-8xl lg:text-9xl" aria-hidden="true">
            {word.split("").map((letter, i) => {
              const delay = (wordOffsets[w] + i) * 0.04 + 0.2;
              return (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className={word === "YOUR" ? "neu-text text-accent" : "neu-text text-fg"}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        ))}
      </div>

      <div className="neu-inset h-3 w-56 overflow-hidden rounded-full p-0.5" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-accent glow text-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
