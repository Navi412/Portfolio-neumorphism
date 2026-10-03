"use client";

import { motion } from "framer-motion";
import { PageHeader, PageShell } from "@/components/ui";
import { phone, socialLinks } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { useStrings } from "@/lib/strings";

export default function SocialPage() {
  const t = useT();
  const str = useStrings();
  return (
    <PageShell>
      <PageHeader title="Social Link" badge={str.socialBadge} backHref="/portfolio" backLabel={str.goBack} />

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        {socialLinks.map((s, i) => (
          <motion.a
            key={s.id}
            href={t(s.url)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
            className="group neu flex flex-col rounded-[2rem] p-6 transition-all active:neu-inset sm:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 eyebrow">
              <span className="text-accent-ink">{s.level}</span>
              <span
                className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-3 py-1 text-muted"
                aria-hidden="true"
              >
                <span className="glow h-2 w-2 rounded-full bg-emerald-500 text-emerald-500" />
                STATUS: ACTIVE
              </span>
            </div>
            <h2 className="neu-text mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">{t(s.name)}</h2>
            <p className="mt-4 flex-1 leading-relaxed text-muted">{t(s.description)}</p>
            <span className="neu-sm mt-8 self-start rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] transition-all group-hover:text-accent-ink">
              {str.contact}
            </span>
          </motion.a>
        ))}
      </div>

      <footer className="neu-inset mt-14 flex flex-col gap-6 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="eyebrow text-muted">
          Iván Martín Vallejo // Operational Identity Secure
        </p>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="eyebrow text-accent-ink">{"// Direct contact line"}</p>
          <a
            href={phone.href}
            className="neu-sm self-start rounded-full px-6 py-3 text-2xl font-extrabold tracking-wide transition-all hover:text-accent active:neu-inset-sm sm:self-auto"
          >
            {phone.label}
          </a>
        </div>
      </footer>
    </PageShell>
  );
}
