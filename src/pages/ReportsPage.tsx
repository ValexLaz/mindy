// src/pages/ReportsPage.tsx
import React from 'react';
import Layout from '../components/Layout/Layout';
import { useReportes } from '../hooks/useReportes';
import ReportFilters from '../components/Reports/ReportFilters';
import GeneralPieChart from '../components/Reports/GeneralPieChart';
import FactorsBarChart from '../components/Reports/FactorsBarChart';
import EvolutionLineChart from '../components/Reports/EvolutionLineChart';
import styles from './ReportsPage.module.css';

const ReportsPage: React.FC = () => {
  const { filtros, setFiltros, opciones, resumen, factores, evolucion, loading, error, refresh } = useReportes();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Reportes</h1>
          <button onClick={refresh} disabled={loading} className={styles.refreshBtn}>
            {loading ? 'Actualizando...' : 'Refrescar'}
          </button>
        </div>

<ReportFilters
  value={filtros}
  onChange={setFiltros}
  onApply={refresh}
  opciones={opciones}
/>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Distribución por nivel de riesgo</h3>
            <GeneralPieChart data={resumen} />
          </div>

          <div className={styles.card}>
            <h3>Factores de riesgo más frecuentes (Top 10)</h3>
            <FactorsBarChart data={factores} />
          </div>

          <div className={styles.card}>
            <h3>Evolución del puntaje promedio (mensual)</h3>
            <EvolutionLineChart data={evolucion} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
