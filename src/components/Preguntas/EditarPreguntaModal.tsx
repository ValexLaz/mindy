import React, { useState } from "react";
import styles from "./Modal.module.css";
import type { Pregunta } from "../../api/preguntasService";

interface Props {
  pregunta: Pregunta;
  onClose: () => void;
  onSave: (data: { 
    texto: string; 
    is_open_ended: boolean; 
    id_categoria: string;
  }) => void;
}

export default function EditarPreguntaModal({ pregunta, onClose, onSave }: Props) {
  const [texto, setTexto] = useState(pregunta.texto);
  const [isOpen, setIsOpen] = useState(pregunta.is_open_ended);
  const [categoria, setCategoria] = useState(pregunta.categoria.id_categoria);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar pregunta</h2>

        <label>Texto</label>
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} />

        <label>
          <input
            type="checkbox"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
          />
          Pregunta abierta
        </label>

        <label>Categoría</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Seleccione...</option>
          {/* TODO: Integrar categorías reales */}
        </select>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancelar</button>

          <button
            className={styles.save}
            onClick={() =>
              onSave({
                texto,
                is_open_ended: isOpen,
                id_categoria: categoria,
              })
            }
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
