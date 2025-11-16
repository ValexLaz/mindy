import { useState } from "react";
import styles from "./PublicacionForm.module.css";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function PublicacionForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState(
    initialData || {
      titulo: "",
      contenido: "",
      tipo: "",
      imagen_url: "",
    }
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>Título</label>
      <input name="titulo" value={form.titulo} onChange={handleChange} />

      <label>Contenido</label>
      <textarea
        name="contenido"
        value={form.contenido}
        onChange={handleChange}
        rows={5}
      />

      <label>Tipo</label>
      <input name="tipo" value={form.tipo} onChange={handleChange} />

      <label>Imagen URL</label>
      <input
        name="imagen_url"
        value={form.imagen_url}
        onChange={handleChange}
      />

      <button className={styles.btn}>Guardar</button>
    </form>
  );
}
