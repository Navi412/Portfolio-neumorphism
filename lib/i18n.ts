// Idioma de la web (español / inglés).
// El idioma vive en <html lang>: lo fija antes del primer pintado el script de
// lib/initScripts.ts y los componentes cliente lo leen con useLang().

import { useSyncExternalStore } from "react";
import { LANG_KEY } from "@/lib/initScripts";

export type Lang = "es" | "en";

/** Un valor que cambia según el idioma. */
export type Tr<V> = { es: V; en: V };
/** Un valor que puede ser igual en ambos idiomas (V) o traducido (Tr<V>). */
export type Loc<V> = V | Tr<V>;

function isTr<V>(v: Loc<V>): v is Tr<V> {
  return typeof v === "object" && v !== null && !Array.isArray(v) && "es" in v && "en" in v;
}

/** Devuelve el valor en el idioma dado. */
export function pick<V>(v: Loc<V>, lang: Lang): V {
  return isTr(v) ? v[lang] : v;
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Lang => (document.documentElement.lang === "en" ? "en" : "es");
const getServerSnapshot = (): Lang => "es";

/** Idioma actual (en el servidor, siempre español). */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Atajo: `const t = useT(); t(texto)`. */
export function useT() {
  const lang = useLang();
  return <V,>(v: Loc<V>) => pick(v, lang);
}

export function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* sin almacenamiento: el cambio dura solo esta visita */
  }
}
