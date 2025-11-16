// src/components/Alerts/AlertCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {type AlertData } from '../../api/alertService'; // Import type
import styles from './AlertCard.module.css';

interface AlertCardProps {
  alert: AlertData;
}

const getRiskColor = (level: 'medio' | 'alto' | string | undefined): string => {
  if (level === 'alto') return '#E57373'; // Reddish
  if (level === 'medio') return '#FFB74D'; // Orangeish
  return '#B0BEC5'; // Grey for unknown/fallback
};

const getStatusStyle = (status: AlertData['estado'] | undefined): React.CSSProperties => {
    switch (status) {
        case 'nueva': return { color: '#dc3545', fontWeight: 'bold' };
        case 'vista': return { color: '#ffc107', fontWeight: 'bold' };
        case 'en_seguimiento': return { color: '#17a2b8', fontWeight: 'bold' };
        case 'resuelta': return { color: '#28a745', fontWeight: 'normal' }; // Green
        case 'descartada': return { color: '#6c757d', textDecoration: 'line-through' }; // Grey strikethrough
        default: return { color: '#6c757d' };
    }
};

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const formattedDate = alert.fecha
    ? format(new Date(alert.fecha), 'dd MMM yy, HH:mm', { locale: es }) // Shorter date format
    : 'Fecha desconocida';

  const riskColor = getRiskColor(alert.nivel_riesgo);
  const statusStyle = getStatusStyle(alert.estado);
  const puntajeTotalNumber = alert.evaluacion?.puntaje_total
    ? Number(alert.evaluacion.puntaje_total).toFixed(0)
    : 'N/A';


  return (
    <div className={styles.alertCard} style={{ borderLeftColor: riskColor }}>
      <div className={styles.cardHeader}>
        <span className={styles.pseudonimo}>
          {alert.estudiante?.pseudonimo || 'Estudiante N/A'}
        </span>
        <span style={statusStyle}>{alert.estado?.replace('_', ' ').toUpperCase()}</span>
        <span className={styles.riskBadge} style={{ backgroundColor: riskColor }}>
          {alert.nivel_riesgo?.toUpperCase() || 'N/A'}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span>🗓️ {formattedDate}</span>
          <span>🎓 {alert.estudiante?.carrera || 'N/A'} ({alert.estudiante?.semestre || 'N/A'}º)</span>
           <span>⭐ Puntaje: {puntajeTotalNumber}</span>
        </div>
        {alert.factores_principales && alert.factores_principales.length > 0 && (
          <div className={styles.factorsRow}>
            <strong>Factores:</strong>
            <span>{alert.factores_principales.map(f => f.descripcion).join(' • ')}</span>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link
          to={`/seguimiento/${alert.id_alerta}`}
          className={styles.detailsButton}
        >
          Ver Detalles
        </Link>
         {/* TODO: Add button to mark as viewed (call markAlertAsViewed from context/service) */}
         {/* {alert.estado === 'nueva' && <button className={styles.markViewedButton}>Marcar Vista</button>} */}
      </div>
    </div>
  );
};

export default AlertCard;
