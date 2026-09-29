// Scripts en línea que app/layout.tsx ejecuta en <head> antes del primer pintado.
// Viven en un módulo normal (sin "use client") para poder usarlos desde el servidor.

export const THEME_KEY = "theme";
export const INTRO_KEY = "intro-seen";

/** Aplica el tema guardado (o el del sistema) para que no haya parpadeo. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

/** Marca <html data-intro-seen> si la intro ya se vio en esta pestaña (oculta el loader). */
export const introInitScript = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.dataset.introSeen=""}catch(e){}`;
