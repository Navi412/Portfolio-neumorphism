"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { PageHeader, PageShell, TagList } from "@/components/ui";
import { pigmentum, projectAccents } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

const accent = projectAccents.pigmentum;
const { gameUrl, tech } = pigmentum;

const overlayBtn =
  "neu-sm rounded-full px-4 py-2 eyebrow transition-all hover:text-accent-ink active:neu-inset-sm";

export default function PigmentumPage() {
  const t = useT();
  const s = useStrings();
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    const el = iframeRef.current as
      | (HTMLIFrameElement & {
          webkitRequestFullscreen?: () => void;
          msRequestFullscreen?: () => void;
        })
      | null;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  return (
    <PageShell bgWord="INFILTRATION">
      <div style={{ "--accent": accent } as React.CSSProperties}>
        <PageHeader title="Pigmentum" badge="UNITY // GAME" backHref="/portfolio/proyectos" backLabel={s.back} />

        {/* Zona de juego */}
        <section aria-label={s.gameArea} className="neu-inset mt-12 rounded-[2rem] p-3 sm:p-4">
          <div className="relative h-[60vh] min-h-[300px] w-full overflow-hidden rounded-3xl bg-black lg:h-[70vh] lg:min-h-[600px]">
            {isPlaying ? (
              <>
                <iframe
                  ref={iframeRef}
                  src={gameUrl}
                  title={s.playTitle}
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
                <div className="absolute top-3 right-3 z-10 flex gap-3">
                  <button type="button" onClick={handleFullscreen} className={overlayBtn}>
                    {s.fullscreen}
                  </button>
                  <button type="button" onClick={() => setIsPlaying(false)} className={overlayBtn}>
                    {s.closeGame}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Image
                  src="/pigmentum-bg.png"
                  alt={s.backgroundOf("Pigmentum")}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  loading="eager"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <motion.button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="neu-accent rounded-full px-7 py-4 text-sm font-bold tracking-[0.18em] sm:px-10 sm:text-base"
                  >
                    {s.startGame}
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Ficha */}
        <section className="neu mt-12 grid gap-6 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[220px_1fr]">
          <p className="neu-inset-sm self-start justify-self-start rounded-full px-4 py-1.5 eyebrow text-accent-ink">
            {pigmentum.label}
          </p>
          <div>
            <p className="max-w-3xl text-lg leading-relaxed">{t(pigmentum.desc)}</p>
            <div className="mt-6">
              <TagList tags={tech} accent={accent} />
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
