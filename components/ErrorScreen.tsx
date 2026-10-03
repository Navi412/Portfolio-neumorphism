"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useStrings } from "@/lib/strings";

type ErrorScreenProps = {
  code: string;
  log: string;
  /** Qué textos mostrar (se eligen según el idioma). */
  variant: "notFound" | "error" | "global";
  /** Si se pasa, muestra el botón de reintentar. */
  onRetry?: () => void;
  /** En global-error no hay layout ni router fiable: se usan enlaces normales. */
  plainLinks?: boolean;
};

const secondaryBtn =
  "neu-sm rounded-full px-6 py-3 eyebrow text-muted transition-all duration-300 hover:text-accent-ink active:neu-inset-sm";

function Nav({ href, plain, className, children }: { href: string; plain?: boolean; className: string; children: ReactNode }) {
  return plain ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Pantalla de error neumórfica, compartida por la 404 y los errores de carga. */
export default function ErrorScreen({ code, log, variant, onRetry, plainLinks }: ErrorScreenProps) {
  const s = useStrings();
  const title = variant === "notFound" ? s.notFoundTitle : s.errorTitle;
  const message =
    variant === "notFound" ? s.notFoundMessage : variant === "global" ? s.globalErrorMessage : s.errorMessage;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-32 pb-16 sm:py-32">
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="neu relative w-full max-w-2xl rounded-[2.5rem] px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <p className="neu-inset-sm mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.15em] text-muted">
          <span className="glow h-2 w-2 animate-pulse rounded-full bg-accent text-accent" aria-hidden="true" />
          {log}
        </p>

        {/* Código grande en relieve */}
        <div className="neu-inset mx-auto mt-8 flex w-fit items-center justify-center rounded-[2rem] px-8 py-4 sm:px-12">
          <span
            className={`neu-emboss leading-none font-extrabold tracking-tighter ${
              code.length > 3 ? "text-5xl sm:text-8xl" : "text-7xl sm:text-9xl"
            }`}
            aria-hidden="true"
          >
            {code}
          </span>
        </div>

        <h1 className="neu-text mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">{message}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="neu-accent rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {s.retry}
            </button>
          )}
          <Nav
            href="/"
            plain={plainLinks}
            className={
              onRetry
                ? secondaryBtn
                : "neu-accent rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform duration-300 hover:-translate-y-0.5"
            }
          >
            {s.home}
          </Nav>
          <Nav href="/portfolio" plain={plainLinks} className={secondaryBtn}>
            {s.menu}
          </Nav>
        </div>
      </motion.section>
    </main>
  );
}
