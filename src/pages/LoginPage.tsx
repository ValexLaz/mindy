// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Use the custom hook
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { MdSelfImprovement } from "react-icons/md";
// Assuming your logo is in public/ folder or src/assets/
// import mindyLogo from '../assets/mindy_logo.png'; // If in src/assets

const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(correo, contrasena);
      navigate('/dashboard'); // Redirect on success
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* If logo is in public folder: */}
        <MdSelfImprovement size={65} color="#4ECDC4" />
        {/* If logo is imported from src/assets: */}
        {/* <img src={mindyLogo} alt="Mindy Logo" className={styles.logo} /> */}

        <h2>Gabinete Psicológico Univalle</h2>
        <p>Portal de profesionales en bienestar estudiantil</p>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="correo">📧 Correo institucional</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="correo@univalle.edu.bo"
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="contrasena">🔒 Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              placeholder="******"
              disabled={loading}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.loginButton}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className={styles.links}>
          {/* Link component if using React Router */}
          <a href="#">¿Olvidaste tu contraseña?</a>
           {/* Add register link later */}
          {/* <a href="/register" className={styles.registerLink}>Registrarse</a> */}
        </div>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Universidad del Valle — Gabinete Psicológico
        </p>
      </div>
    </div>
  );
};

export default LoginPage;