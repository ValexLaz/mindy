import React, { useState } from "react";
import type { Pregunta } from "../../api/preguntasService";

import styles from "./PreguntaListCard.module.css";
import EditarPreguntaModal from "./EditarPreguntaModal";
import EditarRespuestasModal from "./EditarRespuestasModal";

interface Props {
  pregunta: Pregunta;
  onEdit: (pregunta: Pregunta) => void;
  onDelete: (id_pregunta: string) => void;
  onEditRespuestas: (pregunta: Pregunta) => void;
}

export default function PreguntaListCard({
  pregunta,
  onEdit,
  onDelete,
  onEditRespuestas,
}: Props) {
  return (
    <div className={styles.card}>
      <h3>{pregunta.texto}</h3>
      <span>{pregunta.is_open_ended ? "Abierta" : "Cerrada"}</span>

      <p>
        <b>Categoría:</b> {pregunta.categoria?.nombre}
      </p>

      {!pregunta.is_open_ended && (
        <>
          <p><b>Opciones:</b></p>
          <ul>
            {pregunta.respuestas.map((r) => (
              <li key={r.id_respuesta}>
                {r.texto} — <b>Peso:</b> {r.peso}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(pregunta)}>
          Editar
        </button>

        <button className={styles.delete} onClick={() => onDelete(pregunta.id_pregunta)}>
          Eliminar
        </button>

        {!pregunta.is_open_ended && (
          <button className={styles.secondary} onClick={() => onEditRespuestas(pregunta)}>
            Editar respuestas
          </button>
        )}
      </div>
    </div>
  );
}
