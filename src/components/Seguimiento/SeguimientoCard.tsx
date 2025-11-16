import React from "react";
import styles from "./SeguimientoCard.module.css";
import type { Seguimiento } from "../../api/seguimientoService";

interface Props {
  seguimiento: Seguimiento;
}

export default function SeguimientoCard({ seguimiento }: Props) {
  return (
    <div className={styles.card}>
      {/* ==== Header principal ==== */}
      <div className={styles.headerTop}>
        <h3 className={styles.title}>Seguimiento del Caso</h3>

        <span
          className={`${styles.status} ${
            styles[`status_${seguimiento.estado}`] || ""
          }`}
        >
          {seguimiento.estado.toUpperCase()}
        </span>
      </div>

      {/* ==== Plan de intervención ==== */}
      <div className={styles.planBox}>
        <h4>📌 Plan de intervención</h4>
        <p className={styles.planText}>
          {seguimiento.plan_intervencion || "Sin plan registrado"}
        </p>
      </div>

      {/* ==== Datos del seguimiento ==== */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>Psicólogo asignado</dt>
          <dd>
            {seguimiento.psicologo?.usuario?.nombre ?? "No asignado"}
          </dd>
        </div>

        <div className={styles.metaItem}>
          <dt>Fecha de inicio</dt>
          <dd>
            {seguimiento.fecha_inicio
              ? new Date(seguimiento.fecha_inicio).toLocaleDateString()
              : "—"}
          </dd>
        </div>

        <div className={styles.metaItem}>
          <dt>Fecha de cierre</dt>
          <dd>
            {seguimiento.fecha_fin
              ? new Date(seguimiento.fecha_fin).toLocaleDateString()
              : "—"}
          </dd>
        </div>
      </div>
    </div>
  );
}
