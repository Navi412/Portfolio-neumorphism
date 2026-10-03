"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useSyncExternalStore } from "react";
import { setLang, useLang } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

const spring: Transition = { type: "spring", stiffness: 320, damping: 26 };

// true solo en el navegador: el pomo se pinta cuando ya se conoce el idioma real,
// para que al cargar una página en inglés no se deslice desde "ES".
const noopSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/** Interruptor ES / EN, debajo del de modo claro/oscuro y con su mismo estilo. */
export default function LangToggle() {
  const lang = useLang();
  const s = useStrings();
  const isEn = lang === "en";
  const mounted = useMounted();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={s.langLabel}
      title={s.toOtherLang}
      onClick={() => setLang(isEn ? "es" : "en")}
      className="neu-inset fixed top-[4.25rem] right-4 z-40 h-11 w-[5.25rem] rounded-full p-1 sm:top-[5.25rem] sm:right-6"
    >
      {/* Etiquetas grabadas en la ranura */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-between px-3 text-[0.7rem] font-extrabold tracking-wider text-muted"
      >
        <span>ES</span>
        <span>EN</span>
      </span>

      {/* Pomo deslizante con el idioma activo */}
      {mounted && (
        <motion.span
          aria-hidden="true"
          className="neu-sm relative flex h-9 w-9 items-center justify-center rounded-full text-[0.72rem] font-extrabold tracking-wide text-accent-ink"
          initial={false}
          animate={{ x: isEn ? 40 : 0 }}
          transition={spring}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
              transition={{ duration: 0.18 }}
            >
              {isEn ? "EN" : "ES"}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      )}
    </button>
  );
}
