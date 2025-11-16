import React, { useEffect, useState } from "react";
import styles from "./SeguimientoForm.module.css";

interface NotasFormProps {
  defaultValue?: string | null;
  onSave: (notas: string) => Promise<void> | void;
  isSubmitting?: boolean;
  className?: string;
}

const NotasForm: React.FC<NotasFormProps> = ({
  defaultValue = "",
  onSave,
  isSubmitting = false,
  className = "",
}) => {
  const [notas, setNotas] = useState(defaultValue ?? "");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setNotas(defaultValue ?? "");
    setDirty(false);
  }, [defaultValue]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSave(notas.trim());
      setDirty(false);
    } catch {
      setDirty(true);
    }
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Notas del proceso
        <textarea
          className={styles.textarea}
          placeholder="Ej: Avances, acuerdos, derivaciones..."
          value={notas}
          onChange={(e) => {
            setNotas(e.target.value);
            setDirty(true);
          }}
          disabled={isSubmitting}
        />
      </label>

      <div className={styles.actions}>
        <span className={dirty ? styles.error : styles.helper}>
          {dirty ? "Hay cambios sin guardar." : "Sin cambios pendientes."}
        </span>
        <button
          type="submit"
          className={styles.secondaryButton}
          disabled={isSubmitting || !dirty}
        >
          {isSubmitting ? "Guardando..." : "Guardar notas"}
        </button>
      </div>
    </form>
  );
};

export default NotasForm;
