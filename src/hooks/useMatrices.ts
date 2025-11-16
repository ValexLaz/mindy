// src/hooks/useMatrices.ts
import { useEffect, useState } from "react";
import {
  getMatrices,
  getMatrizPorId,
  getUltimaMatriz,
  crearMatriz,
  type Matriz,
} from "../api/matricesService";

export function useMatrices() {
  const [matrices, setMatrices] = useState<Matriz[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await getMatrices();
      setMatrices(data);
    } finally {
      setLoading(false);
    }
  }

  async function crear(nombre: string, configuracion: any, version: number) {
    const nueva = await crearMatriz(nombre, configuracion, version);
    setMatrices((prev) => [...prev, nueva]);
  }

  useEffect(() => {
    load();
  }, []);

  return { matrices, loading, crear, load };
}

export function useMatriz(id?: string) {
  const [matriz, setMatriz] = useState<Matriz | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getMatrizPorId(id);
      setMatriz(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  return { matriz, loading, load };
}
