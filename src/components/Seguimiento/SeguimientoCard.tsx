import React from "react";
import styles from "./SeguimientoCard.module.css";

import type { Seguimiento } from "../../api/seguimientoService";



interface Props {
  seguimiento: Seguimiento;
}

export default function SeguimientoCard({ seguimiento }: Props) {
  return (
    <div className={styles.card}>
      <h3>Seguimiento del caso</h3>

      <p>
        <strong>Psicólogo:</strong>{" "}
        {seguimiento.psicologo?.usuario?.nombre ?? "No asignado"}
      </p>

      <p>
        <strong>Fecha inicio:</strong>{" "}
        {seguimiento.fecha_inicio
  ? new Date(seguimiento.fecha_inicio).toLocaleDateString()
  : "—"}

      </p>

      {seguimiento.fecha_fin && (
        <p>
          <strong>Fecha fin:</strong>{" "}
          {new Date(seguimiento.fecha_fin).toLocaleDateString()}
        </p>
      )}

      <p>
        <strong>Estado:</strong> {seguimiento.estado}
      </p>
    </div>
  );
}
