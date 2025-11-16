import React, { useState } from "react";
import styles from "./PreguntaForm.module.css";

interface Props {
  categorias: { id_categoria: string; nombre: string }[];
  onSubmit: (id_categoria: string, texto: string, isOpen: boolean) => void;
}

export default function PreguntaForm({ categorias, onSubmit }: Props) {
  const [idCategoria, setIdCategoria] = useState("");
  const [texto, setTexto] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCategoria || !texto.trim()) return;
    onSubmit(idCategoria, texto, isOpen);
    setTexto("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Nueva pregunta</h3>

      <label>Categoría</label>
      <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
        <option value="">Seleccione una categoría</option>
        {categorias.map((c) => (
          <option key={c.id_categoria} value={c.id_categoria}>
            {c.nombre}
          </option>
        ))}
      </select>

      <label>Texto de la pregunta</label>
      <textarea value={texto} onChange={(e) => setTexto(e.target.value)} />

      <label>
        <input
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />
        Pregunta abierta
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
}
