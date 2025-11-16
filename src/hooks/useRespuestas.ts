import { useCallback, useState } from "react";
import type { Respuesta } from "../api/preguntasService";
import { crearPregunta, crearRespuesta, getRespuestas } from "../api/preguntasService";

export function useRespuestas(id_pregunta: string) {
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [loading, setLoading] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    const data = await getRespuestas(id_pregunta);
    setRespuestas(data);
    setLoading(false);
  }, [id_pregunta]);

  const crear = async (id_categoria: string, texto: string, is_open_ended: boolean) => {
  const nueva = await crearPregunta(id_categoria, texto, is_open_ended);
  await cargar();
  return nueva;   // 👈 ESTA LÍNEA ERA LO QUE FALTABA
};


  return {
    respuestas,
    loading,
    crear,
    refresh: cargar,
  };
}
