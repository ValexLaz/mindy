import { useCallback, useEffect, useState } from "react";
import type { Categoria } from "../api/preguntasService";
import { getCategorias, crearCategoria } from "../api/preguntasService";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    const data = await getCategorias();
    setCategorias(data);
    setLoading(false);
  }, []);

  const crear = async (nombre: string, descripcion: string) => {
    await crearCategoria(nombre, descripcion);
    await cargar();
  };

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {
    categorias,
    loading,
    crear,
    refresh: cargar,
  };
}
