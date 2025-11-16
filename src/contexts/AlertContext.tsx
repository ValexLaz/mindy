// src/contexts/AlertContext.tsx
import React, { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from 'react';
import { getDashboardAlerts, type AlertData } from '../api/alertService';
import { useAuth } from './AuthContext'; // Depends on AuthContext

interface AlertContextType {
  alerts: AlertData[];
  isLoading: boolean;
  error: string | null;
  refreshAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth(); // Get auth status

  const fetchAlerts = useCallback(async () => {
    // Only fetch if authenticated
    if (!isAuthenticated) {
        setAlerts([]); // Clear alerts if logged out
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDashboardAlerts();
      setAlerts(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar alertas');
      setAlerts([]); // Clear alerts on error
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // Re-fetch when auth status changes

  // Fetch alerts on initial load (if authenticated) and when auth status changes
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]); // fetchAlerts includes isAuthenticated dependency

  const refreshAlerts = () => {
     fetchAlerts(); // Manually trigger fetch
  };

  const value = {
    alerts,
    isLoading,
    error,
    refreshAlerts,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

// Custom hook
export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};