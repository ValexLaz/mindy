import { useState, useEffect, useCallback } from "react";
import {
  getSeguimientoPorAlerta,
  crearSeguimiento,
  actualizarNotas,
  cerrarSeguimiento,
  type Seguimiento
} from "../api/seguimientoService";

export function useSeguimiento(id_alerta?: string) {
  const [seguimiento, setSeguimiento] = useState<Seguimiento | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!id_alerta) return;
    setLoading(true);
    try {
      const data = await getSeguimientoPorAlerta(id_alerta);
      setSeguimiento(data);
    } catch {
      setSeguimiento(null);
    }
    setLoading(false);
  }, [id_alerta]);

  useEffect(() => {
    load();
  }, [id_alerta]);

  const crear = async (plan: string) => {
    const nuevo = await crearSeguimiento(id_alerta!, plan);
    setSeguimiento(nuevo);
    return nuevo;
  };

  const actualizar = async (id: string, notas: string) => {
    const updated = await actualizarNotas(id, notas);
    setSeguimiento(updated);
    return updated;
  };

  const cerrar = async (id: string) => {
    const closed = await cerrarSeguimiento(id);
    setSeguimiento(closed);
    return closed;
  };

  return { seguimiento, loading, load, crear, actualizar, cerrar };
}
