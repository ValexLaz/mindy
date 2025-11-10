import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { CategoriaPreguntas } from './categoria-preguntas.entity';
import { Respuesta } from '../respuestas/respuesta.entity';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
    @InjectRepository(CategoriaPreguntas)
    private readonly categoriaRepo: Repository<CategoriaPreguntas>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,
  ) {}

  // Crear categoría
  async crearCategoria(nombre: string, descripcion?: string) {
    const categoria = this.categoriaRepo.create({ nombre, descripcion });
    return this.categoriaRepo.save(categoria);
  }

  // Listar categorías
  async obtenerCategorias() {
    return this.categoriaRepo.find();
  }

  // Crear pregunta
  async crearPregunta(id_categoria: string, texto: string) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria },
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const pregunta = this.preguntaRepo.create({
      categoria: { id_categoria } as CategoriaPreguntas,
      texto,
    });

    return this.preguntaRepo.save(pregunta);
  }

  // Listar preguntas
  async obtenerPreguntas() {
    return this.preguntaRepo.find({
      relations: ['categoria', 'respuestas'],
    });
  }

  // Crear respuesta asociada a una pregunta
  async crearRespuesta(id_pregunta: string, texto: string, peso: number) {
    const pregunta = await this.preguntaRepo.findOne({
      where: { id_pregunta },
    });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');

    const respuesta = this.respuestaRepo.create({
      pregunta: { id_pregunta } as Pregunta,
      texto,
      peso,
    });

    return this.respuestaRepo.save(respuesta);
  }

  // Obtener respuestas de una pregunta
  async obtenerRespuestasPorPregunta(id_pregunta: string) {
    return this.respuestaRepo.find({
      where: { pregunta: { id_pregunta } },
    });
  }
}
