// src/App.tsx
import React, { type JSX } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'; // Asegúrate de importar Link
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import ReportsPage from './pages/ReportsPage';
import CaseDetailsPage from './pages/CaseDetailsPage/CaseDetailsPage';
import PublicacionesPage from './pages/PublicacionesPages/PublicacionesPage';
import CrearPublicacionPage from './pages/PublicacionesPages/CrearPublicacionPage';
import EditarPublicacionPage from './pages/PublicacionesPages/EditarPublicacionPage';
import ConfiguracionPreguntasPage from './pages/Preguntas/ConfiguracionPreguntasPage';
import PreguntasListPage from "./pages/Preguntas/PreguntasListPage";
import MatricesPage from './pages/Matrices/MatricesPage';
import VerMatrizPage from './pages/Matrices/VerMatrizPage';


// --- Componente Helper para Rutas Protegidas ---
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Verificando sesión...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Muestra la página si está autenticado
  return children;
}

// --- Componente Principal de la Aplicación ---
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta Pública: Página de Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* --- Rutas Protegidas --- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preguntas"
        element={
          <ProtectedRoute>
            <ConfiguracionPreguntasPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preguntas/listado"
        element={
          <ProtectedRoute>
            <PreguntasListPage />
          </ProtectedRoute>
        }
      />


      <Route path="/seguimiento/:id_alerta" element={
        <ProtectedRoute><CaseDetailsPage /></ProtectedRoute>
      } />

      {/* Puedes añadir otras rutas protegidas aquí más tarde */}

      {/* --- Ruta Raíz ("/") --- */}
      <Route path="/reportes" element={<ReportsPage />} />
       <Route path="/publicaciones" element={<PublicacionesPage />} />
      <Route path="/publicaciones/crear" element={<CrearPublicacionPage />} />
      <Route path="/publicaciones/editar/:id_publicacion" element={<EditarPublicacionPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />
       <Route path="/matrices" element={<MatricesPage />} />
<Route path="/matrices/:id" element={<VerMatrizPage />} />




      {/* --- Ruta Catch-all (404 Not Found) --- */}
      <Route path="*" element={
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>404 - Página no encontrada</h1>
            {/* Usamos Link para la navegación interna */}
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>Volver al inicio</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
