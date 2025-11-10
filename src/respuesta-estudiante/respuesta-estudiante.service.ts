import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RespuestaEstudiante } from './respuesta-estudiante.entity';
import { CreateRespuestaEstudianteDto } from './dto/create-respuesta-estudiante.dto';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';
import { Pregunta } from '../preguntas/pregunta.entity';
import { Respuesta } from '../respuestas/respuesta.entity';

@Injectable()
export class RespuestaEstudianteService {
  constructor(
    @InjectRepository(RespuestaEstudiante)
    private readonly respuestaEstRepository: Repository<RespuestaEstudiante>,

    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  async create(dto: CreateRespuestaEstudianteDto): Promise<RespuestaEstudiante> {
    const evaluacion = await this.evaluacionRepository.findOne({ where: { id_evaluacion: dto.id_evaluacion } });
    if (!evaluacion) throw new NotFoundException('Evaluación no encontrada');

    const pregunta = await this.preguntaRepository.findOne({ where: { id_pregunta: dto.id_pregunta } });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');

    const respuesta = await this.respuestaRepository.findOne({ where: { id_respuesta: dto.id_respuesta } });
    if (!respuesta) throw new NotFoundException('Respuesta no encontrada');

    const nueva = this.respuestaEstRepository.create({
      evaluacion,
      pregunta,
      respuesta,
      respuesta_texto: dto.respuesta_texto,
      
    });

    return await this.respuestaEstRepository.save(nueva);
  }

  async findByEvaluacion(id_evaluacion: string): Promise<RespuestaEstudiante[]> {
    return this.respuestaEstRepository.find({
      where: { evaluacion: { id_evaluacion } },
      relations: ['pregunta', 'respuesta'],
    });
  }
}
