// src/pages/Matrices/VerMatrizPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useMatriz } from "../../hooks/useMatrices";
import VistaMatrizFormulario from "./VistaMatrizFormulario";

export default function VerMatrizPage() {
  const { id } = useParams();
  const { matriz, loading } = useMatriz(id);

  if (loading) return <p>Cargando...</p>;
  if (!matriz) return <p>No encontrada</p>;

  return (
    <div className="container">
      <h1>{matriz.nombre}</h1>
      <p>Versión: {matriz.version}</p>

      <h3>Configuración</h3>
<VistaMatrizFormulario config={matriz.configuracion} />

      <h3>Recomendaciones</h3>
      {matriz.recomendaciones.map((r) => (
        <div key={r.id_recomendacion} className="card mt-2 p-2">
          <strong>{r.categoria}</strong> — {r.nivel_riesgo}
          <p>{r.mensaje}</p>
        </div>
      ))}
    </div>
  );
}
