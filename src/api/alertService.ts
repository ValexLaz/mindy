// src/api/alertService.ts
import axiosInstance from './axiosInstance';

// Define the structure of an Alert object returned by GET /alertas/dashboard
// Based on the backend mapping
export interface AlertData {
  id_alerta: string;
  fecha: string; // ISO date string
  estado: 'nueva' | 'vista' | 'en_seguimiento' | 'resuelta' | 'descartada';
  nivel_riesgo: 'medio' | 'alto';
  evaluacion: {
    id_evaluacion: string;
    puntaje_total: string | number; // Backend might send as string
  } | null;
  estudiante: {
    pseudonimo: string;
    carrera: string;
    semestre: number;
  } | null;
  factores_principales: {
    descripcion: string;
    peso: number;
  }[];
}

// Fetches alerts for the dashboard
export const getDashboardAlerts = async (): Promise<AlertData[]> => {
  try {
    const response = await axiosInstance.get<AlertData[]>('/alertas/dashboard');
    return response.data;
  } catch (error: any) {
    console.error("Error fetching dashboard alerts:", error.response?.data || error.message);
    throw error; // Re-throw for handling in context/component
  }
};

// Marks an alert as viewed
export const markAlertAsViewed = async (alertId: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.patch<{ message: string }>(`/alertas/${alertId}/vista`);
    return response.data;
  } catch (error: any) {
    console.error(`Error marking alert ${alertId} as viewed:`, error.response?.data || error.message);
    throw error;
  }
};