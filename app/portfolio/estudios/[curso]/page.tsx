import { notFound } from "next/navigation";
import CursoDetail from "@/components/CursoDetail";
import { cursos } from "@/lib/content";

// Solo existen las páginas de los cursos de lib/content.ts; el resto da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cursos.map((c) => ({ curso: c.id }));
}

export default async function CursoPage({ params }: { params: Promise<{ curso: string }> }) {
  const { curso: id } = await params;
  if (!cursos.some((c) => c.id === id)) notFound();
  return <CursoDetail id={id} />;
}
