import { useCallback, useEffect, useState } from "react";
import { getPreguntas, crearPregunta as apiCrear, type Pregunta,actualizarPregunta as apiUpdate,
  eliminarPregunta as apiDelete, } from "../api/preguntasService";

export function usePreguntas() {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    const data = await getPreguntas();
    setPreguntas(data);
    setLoading(false);
  }, []);

  const crear = async (id_categoria: string, texto: string, is_open_ended: boolean): Promise<Pregunta> => {
    const nueva = await apiCrear(id_categoria, texto, is_open_ended);
    await cargar();
    return nueva;  
  };
  const actualizar = async (id_pregunta: string, data: any) => {
    const updated = await apiUpdate(id_pregunta, data);
    await cargar();
    return updated;
  };

  const eliminar = async (id_pregunta: string) => {
    await apiDelete(id_pregunta);
    await cargar();
  };

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {
    preguntas,
    loading,
    crear,
    actualizar,
    eliminar,
    refresh: cargar,
  };
}
