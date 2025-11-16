// src/api/reportesService.ts
import axiosInstance from "./axiosInstance";

export interface ResumenGeneralItem {
  nivel: string;
  cantidad: string | number;
}

export interface FactorItem {
  factor: string;
  frecuencia: string | number;
}

export interface EvolucionItem {
  mes: string;
  promedio: string | number;
}

export interface FiltrosReportes {
  carrera?: string;
  semestre?: string | number;
  fechaInicio?: string;
  fechaFin?: string;
}

export interface OpcionesFiltros {
  carreras: string[];
  semestres: (string | number)[];
}

// Headers automáticos gracias al axiosInstance
// NO necesitas token aquí
// axiosInstance ya lo agrega

// 🔹 Opciones de Filtros
export async function getOpcionesFiltros(): Promise<OpcionesFiltros> {
  const res = await axiosInstance.get('/reportes/filtros');
  return res.data;
}

// 🔹 Resumen General
export async function getResumenGeneral(
  filtros?: FiltrosReportes
): Promise<ResumenGeneralItem[]> {

  const res = await axiosInstance.get('/reportes/general', {
    params: filtros,
  });

  return res.data;
}

// 🔹 Factores Frecuentes
export async function getFactoresFrecuentes(
  filtros?: FiltrosReportes
): Promise<FactorItem[]> {

  const res = await axiosInstance.get('/reportes/factores', {
    params: filtros,
  });

  return res.data;
}

// 🔹 Evolución mensual de riesgo
export async function getEvolucion(
  filtros?: FiltrosReportes
): Promise<EvolucionItem[]> {

  const res = await axiosInstance.get('/reportes/evolucion', {
    params: filtros,
  });

  return res.data;
}
