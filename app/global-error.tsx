"use client"; // Los límites de error tienen que ser componentes cliente

import { useEffect } from "react";
import ErrorScreen from "@/components/ErrorScreen";
import { langInitScript, themeInitScript } from "@/lib/initScripts";
import "./globals.css";

// Sustituye al layout raíz si este falla: necesita su propio <html>, estilos y tema.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Error | Iván Martín Vallejo</title>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + ";" + langInitScript }} />
      </head>
      <body className="min-h-full overflow-x-hidden antialiased">
        <ErrorScreen
          code="ERROR"
          log="SYS.LOG // SYSTEM_ERROR"
          variant="global"
          onRetry={retry}
          plainLinks
        />
      </body>
    </html>
  );
}
