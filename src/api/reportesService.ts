export interface ResumenGeneralItem {
  nivel: string;        // "Bajo" | "Moderado" | "Alto"
  cantidad: string | number;
}

export interface FactorItem {
  factor: string;
  frecuencia: string | number;
}

export interface EvolucionItem {
  mes: string;          // "YYYY-MM"
  promedio: string | number;
}

export interface FiltrosReportes {
  carrera?: string;
  semestre?: string;
  fechaInicio?: string; // "YYYY-MM-DD"
  fechaFin?: string;    // "YYYY-MM-DD"
}
export interface OpcionesFiltros {
  carreras: string[];
  semestres: (string | number)[];
}

export async function getOpcionesFiltros(token?: string): Promise<OpcionesFiltros> {
  const res = await fetch('/reportes/filtros', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener opciones de filtros`);
  return res.json();
}


const jsonHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

/**
 * 🔹 Reporte general por nivel de riesgo
 */
export async function getResumenGeneral(
  token?: string,
  filtros?: FiltrosReportes
): Promise<ResumenGeneralItem[]> {
  const params = new URLSearchParams();
  if (filtros?.carrera) params.set('carrera', filtros.carrera);
  if (filtros?.semestre) params.set('semestre', filtros.semestre);
  if (filtros?.fechaInicio) params.set('fechaInicio', filtros.fechaInicio);
  if (filtros?.fechaFin) params.set('fechaFin', filtros.fechaFin);

  const res = await fetch(`/reportes/general?${params.toString()}`, {
    method: 'GET',
    headers: jsonHeaders(token),
  });

  if (!res.ok) throw new Error(`Error ${res.status} al obtener resumen general`);
  return res.json();
}

/**
 * 🔹 Factores más frecuentes (Top 10)
 */
export async function getFactoresFrecuentes(
  token?: string,
  filtros?: FiltrosReportes
): Promise<FactorItem[]> {
  const params = new URLSearchParams();
  if (filtros?.carrera) params.set('carrera', filtros.carrera);
  if (filtros?.semestre) params.set('semestre', filtros.semestre);
  if (filtros?.fechaInicio) params.set('fechaInicio', filtros.fechaInicio);
  if (filtros?.fechaFin) params.set('fechaFin', filtros.fechaFin);

  const res = await fetch(`/reportes/factores?${params.toString()}`, {
    method: 'GET',
    headers: jsonHeaders(token),
  });

  if (!res.ok) throw new Error(`Error ${res.status} al obtener factores`);
  return res.json();
}

/**
 * 🔹 Evolución de riesgo (promedio mensual)
 */
export async function getEvolucion(
  token?: string,
  filtros?: FiltrosReportes
): Promise<EvolucionItem[]> {
  const params = new URLSearchParams();
  if (filtros?.carrera) params.set('carrera', filtros.carrera);
  if (filtros?.semestre) params.set('semestre', filtros.semestre);
  if (filtros?.fechaInicio) params.set('fechaInicio', filtros.fechaInicio);
  if (filtros?.fechaFin) params.set('fechaFin', filtros.fechaFin);

  const res = await fetch(`/reportes/evolucion?${params.toString()}`, {
    method: 'GET',
    headers: jsonHeaders(token),
  });

  if (!res.ok) throw new Error(`Error ${res.status} al obtener evolución`);
  return res.json();
}
