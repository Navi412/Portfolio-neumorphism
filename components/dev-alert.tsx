"use client";

import { motion } from "framer-motion";
import { useStrings } from "@/lib/strings";

/** Ámbar para el aviso de "en desarrollo", independiente del acento del proyecto. */
const warn = "#f59e0b";

export function DevAlert() {
  const s = useStrings();
  return (
    <motion.aside
      role="note"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="neu mt-10 flex items-start gap-5 rounded-[2rem] border-l-[6px] p-6 sm:items-center sm:p-8"
      style={{ "--accent": warn, borderLeftColor: warn } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="neu-inset-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
      >
        🚧
      </span>
      <div>
        <p className="flex items-center gap-2.5 eyebrow text-accent-ink">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          {s.devAlertTitle}
        </p>
        <p className="mt-2 text-lg leading-relaxed">{s.devAlertText}</p>
      </div>
    </motion.aside>
  );
}
