import axiosInstance from "./axiosInstance";

export interface Categoria {
  id_categoria: string;
  nombre: string;
  descripcion: string;
}

export interface Respuesta {
  id_respuesta: string;
  texto: string;
  peso: number | null;
}

export interface Pregunta {
  id_pregunta: string;
  texto: string;
  is_open_ended: boolean;
  categoria: Categoria;
  respuestas: Respuesta[];
}


export async function getCategorias() {
  const res = await axiosInstance.get("/preguntas/categoria");
  return res.data;
}

export async function crearCategoria(nombre: string, descripcion: string) {
  const res = await axiosInstance.post("/preguntas/categoria", {
    nombre,
    descripcion,
  });
  return res.data;
}


export async function getPreguntas() {
  const res = await axiosInstance.get("/preguntas");
  return res.data;
}

export async function crearPregunta(id_categoria: string, texto: string, is_open_ended: boolean) {
  const res = await axiosInstance.post("/preguntas", {
    id_categoria,
    texto,
    is_open_ended,
  });
  return res.data;
}



export async function crearRespuesta(id_pregunta: string, texto: string, peso: number) {
  const res = await axiosInstance.post("/preguntas/respuesta", {
    id_pregunta,
    texto,
    peso,
  });
  return res.data;
}

export async function getRespuestas(id_pregunta: string) {
  const res = await axiosInstance.get(`/preguntas/respuesta/${id_pregunta}`);
  return res.data;
}
export async function actualizarPregunta(id_pregunta: string, data: any) {
  const res = await axiosInstance.put(`/preguntas/${id_pregunta}`, data);
  return res.data;
}

export async function eliminarPregunta(id_pregunta: string) {
  const res = await axiosInstance.delete(`/preguntas/${id_pregunta}`);
  return res.data;
}

export async function eliminarRespuesta(id_respuesta: string) {
  const res = await axiosInstance.delete(`/preguntas/respuesta/${id_respuesta}`);
  return res.data;
}

export async function actualizarRespuesta(id_respuesta: string, data: any) {
  const res = await axiosInstance.put(`/preguntas/respuesta/${id_respuesta}`, data);
  return res.data;
}
