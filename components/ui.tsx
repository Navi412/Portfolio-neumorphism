import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  badge: string;
  backHref: string;
  backLabel: string;
  /** Oculta la etiqueta en móvil. */
  hideBadgeOnMobile?: boolean;
};

export function PageHeader({ title, badge, backHref, backLabel, hideBadgeOnMobile }: PageHeaderProps) {
  return (
    <header className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p
          className={`neu-inset-sm mb-4 inline-block rounded-full px-4 py-1.5 eyebrow text-accent-ink ${
            hideBadgeOnMobile ? "hidden sm:inline-block" : ""
          }`}
        >
          {badge}
        </p>
        <h1 className="neu-text text-4xl leading-[1.05] font-extrabold tracking-tight break-words sm:text-6xl lg:text-7xl">
          {title}
        </h1>
      </div>
      <Link
        href={backHref}
        className="neu-sm shrink-0 self-start rounded-full px-5 py-2.5 eyebrow text-muted transition-all hover:text-accent-ink active:neu-inset-sm sm:self-auto"
      >
        {`// ${backLabel}`}
      </Link>
    </header>
  );
}

export function PageShell({ children, bgWord }: { children: ReactNode; bgWord?: string }) {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 sm:py-12">
      {bgWord && <BgWord word={bgWord} />}
      <div className="relative z-10">{children}</div>
    </main>
  );
}

/** Palabra decorativa en relieve, del mismo color que el fondo. */
export function BgWord({ word }: { word: string }) {
  return (
    <span
      aria-hidden="true"
      className="neu-emboss pointer-events-none absolute right-0 bottom-4 select-none text-[24vw] leading-none font-extrabold tracking-tighter opacity-70 sm:text-[16vw]"
    >
      {word}
    </span>
  );
}

/** Versión legible de un color de acento para texto pequeño (igual que `text-accent-ink`). */
export const inkColor = (accent: string) => `oklch(from ${accent} var(--ink-l) c h)`;

export function TagList({ tags, accent }: { tags: string[]; accent?: string }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="neu-sm rounded-full px-3.5 py-1.5 text-xs font-semibold"
          style={{ color: accent ? inkColor(accent) : "var(--muted)" }}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
