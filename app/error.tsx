"use client"; // Los límites de error tienen que ser componentes cliente

import { useEffect } from "react";
import ErrorScreen from "@/components/ErrorScreen";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="ERROR"
      log="SYS.LOG // SYSTEM_ERROR"
      title="Algo ha fallado"
      message="No se ha podido cargar esta página. Prueba a reintentarlo o vuelve al inicio."
      onRetry={retry}
    />
  );
}
