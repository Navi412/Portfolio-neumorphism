"use client";

import { motion, type Transition } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Script que fija el tema antes del primer pintado (ver app/layout.tsx). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.dataset.theme as Theme | undefined) ?? null;
const getServerSnapshot = () => null;

function readStored(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  window.setTimeout(() => root.classList.remove("theme-switching"), 500);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* sin almacenamiento: el cambio dura solo esta visita */
    }
  }
}

const spring: Transition = { type: "spring", stiffness: 320, damping: 26 };

// Rayos del sol: 8 líneas alrededor del centro (12, 12)
const rays = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return {
    x1: 12 + Math.cos(a) * 8.2,
    y1: 12 + Math.sin(a) * 8.2,
    x2: 12 + Math.cos(a) * 10.4,
    y2: 12 + Math.sin(a) * 10.4,
  };
});

const stars = [
  { cx: 14, cy: 11, r: 1.4, delay: 0 },
  { cx: 24, cy: 22, r: 1, delay: 0.5 },
  { cx: 34, cy: 12, r: 1.2, delay: 1 },
];

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  // Si el usuario no ha elegido, seguir los cambios del sistema.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!readStored()) applyTheme(mq.matches ? "dark" : "light", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Modo oscuro"
      title={label}
      onClick={() => applyTheme(isDark ? "light" : "dark", true)}
      className="neu-inset fixed top-4 right-4 z-40 h-11 w-[5.25rem] rounded-full p-1 sm:top-6 sm:right-6"
    >
      {theme && (
        <>
          {/* Estrellas del fondo (solo de noche) */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 84 44" aria-hidden="true">
            {stars.map((s) => (
              <motion.circle
                key={s.cx}
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                fill="var(--accent)"
                initial={false}
                animate={isDark ? { opacity: [0.35, 1, 0.35], scale: 1 } : { opacity: 0, scale: 0 }}
                transition={
                  isDark
                    ? { opacity: { duration: 2.2, repeat: Infinity, delay: s.delay }, scale: spring }
                    : { duration: 0.25 }
                }
                style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
              />
            ))}
          </svg>

          {/* Pomo deslizante con el sol / la luna */}
          <motion.span
            className="neu-sm relative flex h-9 w-9 items-center justify-center rounded-full text-accent"
            initial={false}
            animate={{ x: isDark ? 40 : 0 }}
            transition={spring}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              aria-hidden="true"
              initial={false}
              animate={{ rotate: isDark ? -40 : 90 }}
              transition={spring}
            >
              <mask id="theme-toggle-moon">
                <rect x="0" y="0" width="24" height="24" fill="white" />
                <motion.circle
                  r="6.5"
                  fill="black"
                  initial={false}
                  animate={isDark ? { cx: 16.5, cy: 7.5 } : { cx: 30, cy: -6 }}
                  transition={spring}
                />
              </mask>
              <motion.circle
                cx="12"
                cy="12"
                fill="currentColor"
                mask="url(#theme-toggle-moon)"
                initial={false}
                animate={{ r: isDark ? 8 : 5 }}
                transition={spring}
                style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
              />
              <motion.g
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={false}
                animate={isDark ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
                transition={spring}
                style={{ transformOrigin: "12px 12px" }}
              >
                {rays.map((r, i) => (
                  <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
                ))}
              </motion.g>
            </motion.svg>
          </motion.span>
        </>
      )}
    </button>
  );
}
