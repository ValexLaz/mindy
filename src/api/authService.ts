// src/api/authService.ts
import axiosInstance from './axiosInstance';

// --- INTERFACE UPDATED ---
interface LoginResponse {
  access_token: string;
  // Key changed from 'user' to 'usuario'
  usuario: {
    id_usuario: string;
    nombre: string;
    correo: string;
    // Type changed from object to string
    rol: string;
  };
}
// --- END INTERFACE UPDATE ---

export const loginUser = async (correo: string, contrasena: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', {
      correo: correo,
      contraseña: contrasena, // <--- CAMBIO AQUÍ: Usar 'contraseña' con ñ
    });
    return response.data;
  } catch (error: any) {
    console.error("Login API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};