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
      variant="notFound"
    />
  );
}
