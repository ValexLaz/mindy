// src/api/matricesService.ts
import axiosInstance from "./axiosInstance";

export interface Recomendacion {
  id_recomendacion: string;
  categoria: string;
  nivel_riesgo: string;
  mensaje: string;
}

export interface Matriz {
  id_matriz: string;
  nombre: string;
  configuracion: any;
  version: number;
  fecha_creacion: string;
  recomendaciones: Recomendacion[];
}

export async function getMatrices() {
  const res = await axiosInstance.get("/matrices");
  return res.data;
}

export async function getMatrizPorId(id: string) {
  const res = await axiosInstance.get(`/matrices/${id}`);
  return res.data;
}

export async function getUltimaMatriz() {
  const res = await axiosInstance.get("/matrices/ultima");
  return res.data;
}

export async function crearMatriz(
  nombre: string,
  configuracion: any,
  version: number
) {
  const res = await axiosInstance.post("/matrices", {
    nombre,
    configuracion,
    version,
  });
  return res.data;
}
