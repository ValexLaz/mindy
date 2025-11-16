// src/components/Matrices/MatrizCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Matriz } from "../../api/matricesService";

export default function MatrizCard({ matriz }: { matriz: Matriz }) {
  return (
    <div className="card mt-3 p-3">
      <h4>{matriz.nombre}</h4>
      <p>Versión: {matriz.version}</p>

      <Link
        to={`/matrices/${matriz.id_matriz}`}
        className="btn btn-outline-primary"
      >
        Ver matriz
      </Link>
    </div>
  );
}
