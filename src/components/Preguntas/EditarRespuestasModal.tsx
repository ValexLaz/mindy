import React, { useState } from "react";
import styles from "./Modal.module.css";
import type { Pregunta, Respuesta } from "../../api/preguntasService";
import { crearRespuesta, eliminarRespuesta } from "../../api/preguntasService";

interface Props {
  pregunta: Pregunta;
  onClose: () => void;
}

export default function EditarRespuestasModal({ pregunta, onClose }: Props) {
  const [texto, setTexto] = useState("");
  const [peso, setPeso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuesta[]>(pregunta.respuestas ?? []);

  async function agregarRespuesta() {
    if (!texto.trim()) return;
    const nueva = await crearRespuesta(pregunta.id_pregunta, texto, peso);
    setRespuestas((prev) => [...prev, nueva]);
    setTexto("");
    setPeso(0);
  }

  async function borrar(id_respuesta: string) {
    await eliminarRespuesta(id_respuesta);
    setRespuestas((prev) => prev.filter((r) => r.id_respuesta !== id_respuesta));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar respuestas</h2>

        <h3>Opciones actuales</h3>
        <ul>
          {respuestas.length === 0 ? (
            <li>No hay respuestas registradas.</li>
          ) : (
            respuestas.map((r: Respuesta) => (
              <li key={r.id_respuesta}>
                {r.texto} - Peso {r.peso}
                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => borrar(r.id_respuesta)}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>

        <h3>Agregar respuesta nueva</h3>

        <input
          placeholder="Texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <input
          placeholder="Peso"
          type="number"
          value={peso}
          onChange={(e) => setPeso(Number(e.target.value))}
        />

        <button className={styles.save} type="button" onClick={agregarRespuesta}>
          Agregar
        </button>

        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
