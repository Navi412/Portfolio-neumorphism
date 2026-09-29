import HomeClient from "@/components/HomeClient";
import { getContributions } from "@/lib/github";

// Las contribuciones de GitHub se piden en el servidor y se refrescan una vez al día.
export default async function Home() {
  const contributions = await getContributions();
  return <HomeClient contributions={contributions} />;
}
