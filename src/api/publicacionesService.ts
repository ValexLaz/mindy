import axios from "../api/axiosInstance";
export const obtenerPublicaciones = () =>
  axios.get("/publicaciones");

export const obtenerPublicacionPorId = (id: string) =>
  axios.get(`/publicaciones/${id}`);

export const crearPublicacion = (data: any) =>
  axios.post("/publicaciones", data);

export const actualizarPublicacion = (id: string, data: any) =>
  axios.patch(`/publicaciones/${id}`, data);

export const eliminarPublicacion = (id: string) =>
  axios.delete(`/publicaciones/${id}`);
