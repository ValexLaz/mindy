import React from 'react';
import styles from './ReportFilters.module.css';
import { type FiltrosReportes } from '../../api/reportesService';

interface Props {
  value: FiltrosReportes;
  onChange: (value: FiltrosReportes) => void;
  onApply: () => void;
  opciones: { carreras: string[]; semestres: (string | number)[] };
}

const ReportFilters: React.FC<Props> = ({ value, onChange, onApply, opciones }) => {
  const handleChange = (field: keyof FiltrosReportes, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.row}>
        {/* 🔹 Carrera */}
        <div className={styles.field}>
          <label>Carrera</label>
          <select
            value={value.carrera ?? ''}
            onChange={e => handleChange('carrera', e.target.value)}
          >
            <option value="">Todas</option>
            {opciones.carreras.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* 🔹 Semestre */}
        <div className={styles.field}>
          <label>Semestre</label>
          <select
            value={value.semestre ?? ''}
            onChange={e => handleChange('semestre', e.target.value)}
          >
            <option value="">Todos</option>
            {opciones.semestres.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* 🔹 Fechas */}
        <div className={styles.field}>
          <label>Fecha inicio</label>
          <input
            type="date"
            value={value.fechaInicio ?? ''}
            onChange={e => handleChange('fechaInicio', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Fecha fin</label>
          <input
            type="date"
            value={value.fechaFin ?? ''}
            onChange={e => handleChange('fechaFin', e.target.value)}
          />
        </div>

        <button className={styles.applyButton} onClick={onApply}>Aplicar</button>
      </div>
    </div>
  );
};

export default ReportFilters;
