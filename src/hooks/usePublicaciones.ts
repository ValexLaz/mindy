import { useEffect, useState } from "react";
import {
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
} from "../api/publicacionesService";

export function usePublicaciones(id?: string) {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [publicacion, setPublicacion] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await obtenerPublicaciones();
      setPublicaciones(res.data);
    } finally {
      setLoading(false);
    }
  };

  const loadOne = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await obtenerPublicacionPorId(id);
      setPublicacion(res.data);
    } finally {
      setLoading(false);
    }
  };

  const crear = async (data: any) => {
    const res = await crearPublicacion(data);
    return res.data;
  };

  const editar = async (data: any) => {
    if (!id) return;
    const res = await actualizarPublicacion(id, data);
    return res.data;
  };

  const eliminarP = async (id: string) => {
    const res = await eliminarPublicacion(id);
    return res.data;
  };

  useEffect(() => {
    if (id) loadOne();
    else load();
  }, [id]);

  return {
    publicaciones,
    publicacion,
    loading,
    load,
    crear,
    editar,
    eliminarP,
  };
}
