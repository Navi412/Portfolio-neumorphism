import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import { introInitScript, themeInitScript } from "@/lib/initScripts";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iván Martín Vallejo | Portfolio",
  description: "Portfolio de estudios y proyectos de desarrollo",
  // El sitio ya tiene modo oscuro propio: evita que Dark Reader rompa las sombras.
  other: { "darkreader-lock": "true" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de tema añade data-theme antes de hidratar.
    <html
      lang="es"
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + ";" + introInitScript }} />
      </head>
      <body className="min-h-full overflow-x-hidden">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
