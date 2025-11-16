// src/components/Alerts/AlertList.tsx
import React from 'react';
import AlertCard from './AlertCard';
import { type AlertData } from '../../api/alertService'; // Import the type
import styles from './AlertList.module.css'; // Create this CSS file

interface AlertListProps {
  alerts: AlertData[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <div className={styles.alertList}>
      {alerts.map((alert) => (
        <AlertCard key={alert.id_alerta} alert={alert} />
      ))}
      {/* Optional: Add pagination controls here later */}
    </div>
  );
};

export default AlertList;