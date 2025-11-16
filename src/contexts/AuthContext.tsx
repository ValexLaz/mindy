// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from 'react';
import { loginUser } from '../api/authService';

// --- USER INTERFACE UPDATED ---
interface User {
  id_usuario: string;
  nombre: string;
  correo: string;
  // Type changed from object to string
  rol: string;
}
// --- END USER INTERFACE UPDATE ---

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (correo: string, contrasena: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true
  const [error, setError] = useState<string | null>(null);

  // Check token on initial load
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        // --- TODO: IMPORTANT ---
        // You MUST implement a backend endpoint (e.g., /auth/profile or /auth/validate-token)
        // that takes the token and returns the user details.
        // Call that endpoint here to validate the token and get the user.
        // Without this, just having a token in localStorage doesn't guarantee it's valid.

        // --- TEMPORARY Placeholder ---
        // Replace this with a real API call to validate token and fetch user
        try {
          // const userProfile = await fetchUserProfile(storedToken); // Example API call
          // setUser(userProfile);

          // For now, decode the token locally (less secure, only for basic info)
          const payloadBase64 = storedToken.split('.')[1];
          if (payloadBase64) {
             const decodedPayload = JSON.parse(atob(payloadBase64));
              setUser({
                 id_usuario: decodedPayload.sub, // 'sub' usually holds the user ID
                 nombre: decodedPayload.nombre || 'Usuario', // Get name if available in token
                 correo: decodedPayload.correo,
                 rol: decodedPayload.rol, // Get role from token
              });
          } else {
             throw new Error("Invalid token format");
          }
        } catch (tokenError) {
           console.error("Token validation failed:", tokenError);
           localStorage.removeItem('authToken');
           setToken(null);
           setUser(null);
        }
        // --- END TEMPORARY Placeholder ---

      }
      setIsLoading(false); // Stop loading after checking
    };
    checkToken();
  }, []); // Run only once on mount

  const login = useCallback(async (correo: string, contrasena: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(correo, contrasena);
      localStorage.setItem('authToken', response.access_token);
      setToken(response.access_token);
      // Use the 'usuario' field from the response
      setUser(response.usuario);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    isAuthenticated: !!token && !!user,
    user,
    token,
    isLoading,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};