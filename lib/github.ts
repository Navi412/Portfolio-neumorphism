// Contribuciones públicas de GitHub del último año (solo servidor).
// Fuente: github-contributions-api.jogruber.de, que lee el gráfico público del
// perfil y no necesita token. Si falla, se devuelve null y la web no muestra el bloque.

export const GITHUB_USER = "Navi412";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; days: ContributionDay[] };

type ApiResponse = {
  total?: { lastYear?: number };
  contributions?: { date: string; count: number; level: number }[];
};

export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
      next: { revalidate: 86400 }, // como mucho, una consulta al día
    });
    if (!res.ok) return null;

    const json = (await res.json()) as ApiResponse;
    if (!Array.isArray(json.contributions) || json.contributions.length === 0) return null;

    const days = json.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: Math.min(4, Math.max(0, d.level)) as ContributionDay["level"],
    }));
    const total = json.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);

    return { total, days };
  } catch {
    return null;
  }
}
