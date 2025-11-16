import React, { useState } from "react";
import styles from "./SeguimientoForm.module.css";

interface CrearSeguimientoFormProps {
  onSubmit: (plan: string) => Promise<void> | void;
  isSubmitting?: boolean;
  className?: string;
}

const MIN_LENGTH = 10;

const CrearSeguimientoForm: React.FC<CrearSeguimientoFormProps> = ({
  onSubmit,
  isSubmitting = false,
  className = "",
}) => {
  const [plan, setPlan] = useState("");
  const [touched, setTouched] = useState(false);
  const trimmedPlan = plan.trim();
  const isValid = trimmedPlan.length >= MIN_LENGTH;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;

    try {
      await onSubmit(trimmedPlan);
      setPlan("");
      setTouched(false);
    } catch {
      // El mensaje de error se gestiona a nivel de página.
    }
  };
  const helperText =
    !touched || isValid
      ? "Describe las acciones iniciales para atender este caso."
      : `El plan debe tener al menos ${MIN_LENGTH} caracteres.`;
  const helperClass = !touched || isValid ? styles.helper : styles.error;

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit} noValidate>
      <label className={styles.label}>
        Plan de intervención
        <textarea
          className={styles.textarea}
          placeholder="Ej: Coordinación con tutor, sesión inicial de apoyo emocional..."
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <div className={styles.actions}>
        <span className={helperClass}>{helperText}</span>
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear seguimiento"}
        </button>
      </div>
    </form>
  );
};

export default CrearSeguimientoForm;
