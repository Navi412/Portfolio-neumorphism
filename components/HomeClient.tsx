"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState, useSyncExternalStore } from "react";
import HomeContent from "@/components/HomeContent";
import IntroLoader from "@/components/IntroLoader";
import type { Contributions } from "@/lib/github";
import { INTRO_KEY } from "@/lib/initScripts";

/*
  La pantalla de carga solo se muestra la primera vez que se entra en la portada
  en esta pestaña. Al volver (atrás/adelante, enlaces internos o recargas) se va
  directa al contenido:
  - `introSeen` cubre las navegaciones dentro de la web (el módulo sigue vivo).
  - sessionStorage cubre recargas y vueltas desde otra web; el script de
    app/layout.tsx además oculta el loader antes del primer pintado.
*/
let introSeen = false;

function readSeen() {
  if (introSeen) return true;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== null;
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

export default function HomeClient({ contributions }: { contributions: Contributions | null }) {
  // En el servidor siempre "no vista"; en el navegador se lee al hidratar sin desajustes.
  const seenBefore = useSyncExternalStore(noopSubscribe, readSeen, () => false);
  const [finished, setFinished] = useState(false);

  const finishLoading = useCallback(() => {
    introSeen = true;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* sin almacenamiento: solo se recuerda mientras dure la navegación interna */
    }
    setFinished(true);
  }, []);

  const content = (
    <motion.main
      key="content"
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HomeContent contributions={contributions} />
    </motion.main>
  );

  // Ya vista: directamente al contenido, sin animación de salida del loader.
  if (seenBefore) return content;

  return (
    <AnimatePresence mode="wait">
      {finished ? content : <IntroLoader key="loader" finishLoading={finishLoading} />}
    </AnimatePresence>
  );
}
