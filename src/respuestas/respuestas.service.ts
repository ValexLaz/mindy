import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../preguntas/pregunta.entity';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}

  
  async create(dto: CreateRespuestaDto): Promise<Respuesta> {
    const pregunta = await this.preguntaRepository.findOne({
      where: { id_pregunta: dto.id_pregunta },
    });

    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');

    const respuesta = this.respuestaRepository.create({
      texto: dto.texto,
      peso: dto.peso,
      pregunta,
    });

    return await this.respuestaRepository.save(respuesta);
  }

  // Listar todas las respuestas
  async findAll(): Promise<Respuesta[]> {
    return await this.respuestaRepository.find({
      relations: ['pregunta'],
      order: { texto: 'ASC' },
    });
  }

  // Listar respuestas por pregunta
  async findByPregunta(id_pregunta: string): Promise<Respuesta[]> {
    return await this.respuestaRepository.find({
      where: { pregunta: { id_pregunta } },
      order: { peso: 'ASC' },
    });
  }
}
