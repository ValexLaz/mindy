// src/pages/DashboardPage.tsx
import React from 'react';
import Layout from '../components/Layout/Layout';
import AlertList from '../components/Alerts/AlertList';
import { useAlerts } from '../hooks/useAlerts'; // Use custom hook
import styles from './DashboardPage.module.css';
import { useAuth } from '../hooks/useAuth'; // To display user info

const DashboardPage: React.FC = () => {
  const { alerts, isLoading, error, refreshAlerts } = useAlerts();
  const { user } = useAuth(); // Get logged-in user info

  // Placeholder data for summary widgets (replace with real data later)
  const summaryData = {
    evaluatedStudents: alerts.length, // Example: count unique students from alerts?
    completedEvaluations: alerts.length, // Example: count alerts?
    activeCases: 0, // Needs data from 'seguimiento'
  };

  const summaryWidgets = (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryCard}>
        <span className={styles.icon}>👥</span>
        <h3>Estudiantes evaluados</h3>
        <p className={styles.count}>{summaryData.evaluatedStudents}</p>
      </div>
      <div className={styles.summaryCard}>
        <span className={styles.icon}>✅</span>
        <h3>Evaluaciones completadas</h3>
        <p className={styles.count}>{summaryData.completedEvaluations}</p>
      </div>
      <div className={styles.summaryCard}>
        <span className={styles.icon}>❗</span>
        <h3>Casos activos</h3>
        <p className={styles.count}>{summaryData.activeCases}</p>
      </div>
    </div>
  );

  return (
    <Layout> {/* Wrap content in Layout */}
      <div className={styles.dashboardContent}>
        <h1>Bienvenido, {user?.nombre || 'Profesional'}</h1> {/* Display user name */}
        <p className={styles.specialty}>Especialidad: Psicología Clínica</p> {/* Example */}

        {summaryWidgets}

        <div className={styles.alertsSection}>
          <div className={styles.alertsHeader}>
            <h2>Alertas / Casos Prioritarios</h2>
            <button
              onClick={refreshAlerts}
              disabled={isLoading}
              className={styles.refreshButton}
              title="Refrescar Alertas"
            >
              {isLoading ? '⏳' : '🔄'}
            </button>
          </div>

          {/* Conditional Rendering based on state */}
          {error && <p className={styles.errorText}>Error al cargar alertas: {error}</p>}

          {isLoading && alerts.length === 0 && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div> {/* Simple CSS spinner */}
              <p>Cargando alertas...</p>
            </div>
           )}

          {!isLoading && alerts.length === 0 && !error && (
            <div className={styles.noAlerts}>
              <span className={styles.noAlertsIcon}>🎉</span>
              <p>¡Todo en orden! No hay alertas nuevas.</p>
            </div>
          )}

          {alerts.length > 0 && <AlertList alerts={alerts} />}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;