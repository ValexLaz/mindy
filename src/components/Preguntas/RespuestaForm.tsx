import React, { useState } from "react";
import styles from "./RespuestaForm.module.css";

interface Props {
  preguntaTexto: string;
  onAdd: (texto: string, peso: number) => void;
  onClose: () => void;
}

export default function RespuestaForm({ preguntaTexto, onAdd, onClose }: Props) {
  const [texto, setTexto] = useState("");
  const [peso, setPeso] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    onAdd(texto, peso);
    setTexto("");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Respuestas para:</h2>
        <p className={styles.pregunta}>{preguntaTexto}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Respuesta</label>
          <input value={texto} onChange={(e) => setTexto(e.target.value)} />

          <label>Peso</label>
          <input
            type="number"
            min={0}
            max={10}
            step={1}
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
          />

          <button type="submit">Agregar</button>
        </form>

        <button className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
