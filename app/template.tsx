"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Transición de entrada en cada navegación. Se usa la ruta como key porque el
// template raíz solo se vuelve a montar al cambiar el primer segmento.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
