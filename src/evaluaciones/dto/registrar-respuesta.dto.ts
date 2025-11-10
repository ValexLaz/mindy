export class RegistrarRespuestaDto {
  id_evaluacion: string;
  id_pregunta: string;
  id_respuesta?: string; // si es opción predefinida
  respuesta_texto?: string; // si es abierta
  valor_peso?: number;
}
