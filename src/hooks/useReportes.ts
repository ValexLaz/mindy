// src/hooks/useReportes.ts
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import {
  getOpcionesFiltros,
  getResumenGeneral,
  getFactoresFrecuentes,
  getEvolucion,
  type FiltrosReportes,
  type ResumenGeneralItem,
  type FactorItem,
  type EvolucionItem,
  type OpcionesFiltros,
} from '../api/reportesService';

export function useReportes() {
  const token = useAuth().token ?? undefined;
  const [opciones, setOpciones] = useState<OpcionesFiltros>({ carreras: [], semestres: [] });

  const [filtros, setFiltros] = useState<FiltrosReportes>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resumen, setResumen] = useState<ResumenGeneralItem[]>([]);
  const [factores, setFactores] = useState<FactorItem[]>([]);
  const [evolucion, setEvolucion] = useState<EvolucionItem[]>([]);

  const cargarOpciones = useCallback(async () => {
    try {
      const data = await getOpcionesFiltros(token);
      setOpciones(data);
    } catch (err) {
      console.error('Error cargando filtros:', err);
    }
  }, [token]);

  useEffect(() => {
    cargarOpciones();
  }, [cargarOpciones]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [r, f, e] = await Promise.all([
        getResumenGeneral(token, filtros),
        getFactoresFrecuentes(token, filtros),
        getEvolucion(token, filtros),
      ]);

      // 🔸 Convertir strings numéricos + excluir categoría "General"
      setResumen(
        r.map(item => ({
          ...item,
          cantidad: Number(item.cantidad),
        }))
      );

      setFactores(
        f
          .filter(item => item.factor.toLowerCase() !== "general") // ❌ ocultar General
          .map(item => ({
            ...item,
            frecuencia: Number(item.frecuencia),
          }))
      );

      setEvolucion(
        e.map(item => ({
          ...item,
          promedio: Number(item.promedio),
        }))
      );

    } catch (err: any) {
      setError(err.message ?? 'Error al cargar reportes');
    } finally {
      setLoading(false);
    }
  }, [token, filtros]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    opciones, filtros, setFiltros,
    resumen, factores, evolucion,
    loading, error,
    refresh: fetchAll,
  };
}
