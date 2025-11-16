// src/api/seguimientoService.ts
import axios from "../api/axiosInstance";

export interface Seguimiento {
  id_seguimiento: string;
  id_alerta: string;
  id_psicologo: string;
  estado: string;
  plan_intervencion: string | null;
  notas: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  psicologo?: {
    id_psicologo: string;
    especialidad?: string;
    usuario?: {
      nombre: string;
      correo: string;
    } | null;
  } | null;
}

export async function getSeguimientoPorAlerta(id_alerta: string) {
  const res = await axios.get(`/seguimiento/alerta/${id_alerta}`);
  return res.data;
}

export async function crearSeguimiento(id_alerta: string, plan_intervencion: string) {
  const res = await axios.post(`/seguimiento`, { id_alerta, plan_intervencion });
  return res.data;
}

export async function actualizarNotas(id_seguimiento: string, notas: string) {
  const res = await axios.patch(`/seguimiento/${id_seguimiento}/notas`, { notas });
  return res.data;
}

export async function cerrarSeguimiento(id_seguimiento: string) {
  const res = await axios.patch(`/seguimiento/${id_seguimiento}/cerrar`);
  return res.data;
}
