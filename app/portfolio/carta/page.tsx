"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell } from "@/components/ui";
import { carta } from "@/lib/content";
import { useStrings } from "@/lib/strings";

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-accent-ink">{children}</strong>
);

export default function CartaPage() {
  const s = useStrings();
  return (
    <PageShell bgWord="DOCS">
      <PageHeader
        title="Reference"
        badge="VERIFIED FILE"
        hideBadgeOnMobile
        backHref="/portfolio"
        backLabel={s.backToMenu}
      />

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="neu-inset-sm self-start rounded-full px-4 py-2 font-mono text-xs tracking-[0.12em] text-muted">
          {carta.fileName}
        </p>
        <a
          href={carta.pdfUrl}
          download={carta.pdfDownload}
          className="neu-accent self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.15em] transition-transform hover:-translate-y-0.5 sm:self-auto"
        >
          {s.downloadPdf}
        </a>
      </div>

      {/* En inglés: aviso de que la carta se muestra en su idioma original */}
      {s.letterNote && (
        <p className="mt-4 eyebrow text-accent-ink" lang="en">
          {s.letterNote}
        </p>
      )}

      <motion.article
        lang="es"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="neu relative mt-8 rounded-[2rem] px-6 py-10 sm:px-14 sm:py-14"
      >
        <p className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.15em] text-muted" aria-hidden="true">
          SYS.LOG // REFERENCE_VERIFIED
        </p>

        <address className="text-sm leading-relaxed text-muted not-italic">
          {carta.remitente.map((line, i) => (
            <span key={line} className={`block ${i === 0 ? "text-base font-bold text-fg" : ""}`}>
              {line}
            </span>
          ))}
        </address>

        <div className="mt-10 max-w-3xl space-y-6 leading-relaxed">
          <p className="font-bold">{carta.saludo}</p>

          <p>
            Por medio de la presente hago constar que <B>Iván Martín Vallejo</B> ha trabajado durante 410h en el
            equipo de programadores de nuestro videojuego Moción desde el 12 de enero de 2026 al 28 de mayo de 2026,
            con el objetivo de completar sus prácticas de empresa del Grado superior de Desarrollo de Aplicaciones
            Multiplataforma en el centro iFP – Innovación en Formación Profesional.
          </p>

          <p>
            Puedo decir como tutor suyo que su implicación en la tarea encomendada, su capacidad de análisis y
            resolución de los retos que se le presentaban, y su creatividad para proponer innovaciones o
            características que veía útiles en el contexto, han sido valores y aptitudes más que sobresalientes en
            Iván. Como programador del sector de la cinemática machinima final (Sector S16) ha logrado conjugar el arte
            de unas perspectivas y automatizaciones muy cinematográficas, con sus conocimientos en <B>Unity 3D y C#</B>.
            En concreto, aprendió desde cero y con gran capacidad la técnica de <B>Cinemachine</B>, configuró las
            secuencias junto con sus efectos especiales vfx y sfx, e incluso grabó para el resto de compañeros/as un
            video-tutorial explicativo para facilitar el aprendizaje y compartir sus conocimientos. Su trabajo se ha
            desarrollado en cinco escenarios completos distintos (CasaSamuel, Exteriores, UniversidadPlanta0,
            LaboratorioFuturo, Dormitorio), dentro de los cuales ha dejado programadas las
            cinemáticas con gran precisión y calidad. Además de todo esto, ha contribuido siempre que ha podido a crear
            buen entendimiento en el equipo, ha apoyado a los y las compañeras que tenían problemas con machinimas, y
            destaco también su gran capacidad de trabajar autónomamente y con responsabilidad las tareas encomendadas,
            y la comunicación de informes muy completos de sus avances.
          </p>

          <blockquote className="neu-inset rounded-3xl p-6 text-lg leading-relaxed font-semibold sm:p-8">
            Por todos estos motivos, considero que Iván Martín Vallejo es un muy buen candidato para ocupar cualquier
            puesto de trabajo relacionado con la programación y el desarrollo de videojuegos. Si desean más
            información, estoy a vuestra disposición para lo que necesiten. Sin duda volveríamos a reclutarlo para
            nuestro proyecto, pues hemos quedado muy contentos y agradecidos con él.
          </blockquote>

          <p>{carta.despedida}</p>
        </div>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="leading-relaxed">
            {carta.firma.map((line, i) => (
              <span key={line} className={`block ${i === 1 ? "font-bold" : ""}`}>
                {line}
              </span>
            ))}
          </p>
          <div className="neu-sm flex items-center gap-4 self-start rounded-3xl px-5 py-4 sm:self-auto">
            <span className="neu-inset-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
              <span className="glow h-3 w-3 rounded-full bg-emerald-500 text-emerald-500" aria-hidden="true" />
            </span>
            <div className="font-mono text-xs leading-relaxed tracking-wide">
              {carta.sello.map((line, i) => (
                <span key={line} className={`block ${i === 0 ? "font-bold text-accent-ink" : "text-muted"}`}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </PageShell>
  );
}
