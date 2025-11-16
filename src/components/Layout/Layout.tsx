// src/components/Layout/Layout.tsx
import React, { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';
import { MdSelfImprovement } from "react-icons/md";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layoutContainer}>
      {/* --- Sidebar --- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <MdSelfImprovement size={65} color="#4ECDC4" />
          <span>Gabinete Univalle</span>
        </div>

        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.activeLink : '')}
              >
                🏠 Inicio
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/casos"
                className={({ isActive }) => (isActive ? styles.activeLink : '')}
              >
                📂 Casos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contenido"
                className={({ isActive }) => (isActive ? styles.activeLink : '')}
              >
                📝 Contenido
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/reportes"
                className={({ isActive }) => (isActive ? styles.activeLink : '')}
              >
                📊 Reportes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/configuracion"
                className={({ isActive }) => (isActive ? styles.activeLink : '')}
              >
                ⚙️ Configuración
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div></div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.nombre || 'Profesional'}</span>
            <div className={styles.userAvatar}>👤</div>
          </div>
        </header>

        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
