import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Importa el componente principal de la aplicación
import { AuthProvider } from './contexts/AuthContext'; // Importa tu proveedor de autenticación
import { AlertProvider } from './contexts/AlertContext'; // Importa tu proveedor de alertas
import './styles/global.css'; // Importa tus estilos globales (asegúrate que exista)

// Obtiene el elemento raíz del HTML
const rootElement = document.getElementById('root');

// Asegúrate de que el elemento raíz exista antes de renderizar
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Habilita el enrutamiento en toda la aplicación */}
      <BrowserRouter>
        {/* Gestiona el estado de autenticación del usuario */}
        <AuthProvider>
          {/* Gestiona el estado de las alertas (depende de AuthProvider) */}
          <AlertProvider>
            {/* Componente principal que contiene las rutas */}
            <App />
          </AlertProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element. Make sure your index.html has an element with id='root'.");
}