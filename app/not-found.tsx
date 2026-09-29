import type { Metadata } from "next";
import ErrorScreen from "@/components/ErrorScreen";

export const metadata: Metadata = {
  title: "Página no encontrada | Iván Martín Vallejo",
};

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      log="SYS.LOG // ROUTE_NOT_FOUND"
      title="Página no encontrada"
      message="La ruta que buscas no existe o se ha movido. Vuelve al inicio o entra directamente al menú."
    />
  );
}
