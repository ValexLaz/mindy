import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './evaluacion.entity';
import { RespuestaEstudiante } from '../respuesta-estudiante/respuesta-estudiante.entity';
import { FactorDetectado } from './factor-detectado.entity';
import { Estudiante } from '../usuarios/estudiante.entity';
import { Matriz } from '../matrices/matriz.entity';
import { Respuesta } from '../respuestas/respuesta.entity';
import { RegistrarRespuestaDto } from './dto/registrar-respuesta.dto';
import { CrearEvaluacionDto } from './dto/crear-evaluacion.dto';
import { Recomendacion } from '../recomendaciones/recomendacion.entity';
import { Pregunta } from '../preguntas/pregunta.entity';
import { CategoriaPreguntas } from '../preguntas/categoria-preguntas.entity';
import { DecisionTreeService } from './arbol.service';
import { PlnService,PlnResult } from './pln.service';
import {AlertasService} from '../alertas/alertas.service';
@Injectable()
export class EvaluacionesService {
  constructor(
    private readonly decisionTree: DecisionTreeService,
    private readonly plnService: PlnService,
    private readonly alertasService: AlertasService,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,

    @InjectRepository(RespuestaEstudiante)
    private readonly respuestaRepo: Repository<RespuestaEstudiante>,

    @InjectRepository(FactorDetectado)
    private readonly factorRepo: Repository<FactorDetectado>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,

    @InjectRepository(Matriz)
    private readonly matrizRepo: Repository<Matriz>,

    @InjectRepository(Respuesta)
    private readonly respuestaBaseRepo: Repository<Respuesta>,

    @InjectRepository(Recomendacion)
    private readonly recomendacionRepo: Repository<Recomendacion>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    @InjectRepository(CategoriaPreguntas)
    private readonly categoriaRepo: Repository<CategoriaPreguntas>,
  ) {}

  
  async iniciarEvaluacion(data: CrearEvaluacionDto): Promise<Evaluacion> {
    const estudiante = await this.estudianteRepo.findOne({
      where: { id_estudiante: data.id_estudiante },
    });
    const matriz = await this.matrizRepo.findOne({
      where: { id_matriz: data.id_matriz },
    });

    if (!estudiante || !matriz)
      throw new NotFoundException('Estudiante o matriz no encontrados');

    const evaluacion = this.evaluacionRepo.create({
      estudiante: { id_estudiante: estudiante.id_estudiante } as any,
      matriz: { id_matriz: matriz.id_matriz } as any,
      fecha: new Date(),
      puntaje_total: 0,
      nivel_riesgo: 'bajo',
    });

    return this.evaluacionRepo.save(evaluacion);
  }

async registrarRespuesta(data: RegistrarRespuestaDto) {
  const evaluacion = await this.evaluacionRepo.findOne({
    where: { id_evaluacion: data.id_evaluacion },
  });
  if (!evaluacion) throw new NotFoundException('Evaluación no encontrada');

  const respuestaBase = data.id_respuesta
    ? await this.respuestaBaseRepo.findOne({
        where: { id_respuesta: data.id_respuesta },
        relations: ['pregunta', 'pregunta.categoria'],
      })
    : null;

  const respuesta = this.respuestaRepo.create({
  evaluacion: { id_evaluacion: data.id_evaluacion } as any,
  pregunta: { id_pregunta: data.id_pregunta } as any,
  respuesta: respuestaBase
    ? ({ id_respuesta: respuestaBase.id_respuesta } as any)
    : undefined, 
  respuesta_texto: data.respuesta_texto ?? undefined,
});


  const guardada = await this.respuestaRepo.save(respuesta);

  return {
    ...guardada,
    respuesta: respuestaBase
      ? {
          id_respuesta: respuestaBase.id_respuesta,
          texto: respuestaBase.texto,
          peso: respuestaBase.peso,
        }
      : null,
  };
}

  async obtenerSiguientePreguntaAdaptativa(id_evaluacion: string) {
    const siguiente = await this.decisionTree.obtenerSiguientePregunta(id_evaluacion);

    if (!siguiente)
      return { siguiente: null, mensaje: 'Evaluación completada' };

    return siguiente;
  }

async calcularResultado(id_evaluacion: string) {
  const evaluacion = await this.evaluacionRepo
    .createQueryBuilder('evaluacion')
    .leftJoinAndSelect('evaluacion.estudiante', 'estudiante')
    .leftJoinAndSelect('evaluacion.matriz', 'matriz')
    .leftJoinAndSelect('evaluacion.respuestas', 'respuestaEst')
    .leftJoinAndSelect('respuestaEst.respuesta', 'respuestaBase')
    .leftJoinAndSelect('respuestaEst.pregunta', 'pregunta')
    .leftJoinAndSelect('pregunta.categoria', 'categoria')
    .where('evaluacion.id_evaluacion = :id', { id: id_evaluacion })
    .getOne();

  if (!evaluacion) throw new NotFoundException('Evaluación no encontrada');
  if (!evaluacion.estudiante) throw new NotFoundException('Estudiante asociado no encontrado en la evaluación'); // Validación extra
 //PLN
  let puntajePln = 0;

  const respuestaAbierta = (evaluacion.respuestas || []).find(
    (r) => r.respuesta_texto != null && r.respuesta_texto.trim() !== '',
  );

  if (respuestaAbierta) {
    console.log('Detectada respuesta abierta, llamando a PLN...');
    const resultadoPln = await this.plnService.analizarSentimiento(
      respuestaAbierta.respuesta_texto!,
    );

    if (resultadoPln) {
      
      const confianza = resultadoPln.score;
      
      if (resultadoPln.label === '1 star' && confianza > 0.6) {
        puntajePln = 10;
      } else if (resultadoPln.label === '2 stars' && confianza > 0.6) {
        puntajePln = 7; 
      } else if (resultadoPln.label === '3 stars' && confianza > 0.5) {
        puntajePln = 3; 
      }
      console.log(`Puntaje PLN calculado: ${puntajePln}`);
    }
  }
 

  //  puntaje de preguntas cerradas
  const puntajeCerrado = (evaluacion.respuestas || []).reduce((sum, r) => {
    const peso = parseFloat(String(r.respuesta?.peso ?? 0));
    return sum + (isNaN(peso) ? 0 : peso);
  }, 0);

  
  const puntajeFinal = puntajeCerrado + puntajePln;

  console.log(`Puntaje Cerrado: ${puntajeCerrado}, Puntaje PLN: ${puntajePln}, Puntaje Final: ${puntajeFinal}`);

  // 5. Evaluar umbrales 
  const config = evaluacion.matriz?.configuracion;
  if (!config || !config.umbrales)
    throw new NotFoundException('La matriz no tiene definidos los umbrales.');

  const { bajo, medio, alto } = config.umbrales;
  let nivel = 'bajo';
  
  if (puntajeFinal >= alto.min) nivel = 'alto';
  else if (puntajeFinal >= medio.min) nivel = 'medio';

  
  evaluacion.puntaje_total = puntajeFinal;
  evaluacion.puntaje_pln = puntajePln; 
  evaluacion.nivel_riesgo = nivel;
  const savedEvaluation = await this.evaluacionRepo.save(evaluacion);
  // Crear alerta 
    if (nivel === 'medio' || nivel === 'alto') {
      try {
        await this.alertasService.createAlert(savedEvaluation);
      } catch (error) {
        console.error(`🚨 Error al intentar crear alerta para evaluación ${id_evaluacion}:`, error);
      }
    }

  // recomendación 
  const recomendacion = await this.recomendacionRepo.findOne({
    where: {
      matriz: { id_matriz: evaluacion.matriz.id_matriz },
      nivel_riesgo: nivel,
    },
  });

  // factores detectados 
  const factoresDetectados: { categoria: string; peso_total: number }[] = [];
  if (nivel !== 'bajo') {
    const sumaPorCategoria: Record<string, number> = {};
    for (const r of evaluacion.respuestas) {
      if (r.respuesta?.peso) { 
        const categoria = r.pregunta?.categoria?.nombre ?? 'Sin categoría';
        const peso = Number(r.respuesta.peso) || 0;
        sumaPorCategoria[categoria] =
          (sumaPorCategoria[categoria] || 0) + peso;
      }
    }
    

    const factoresOrdenados = Object.entries(sumaPorCategoria)
      .map(([categoria, peso_total]) => ({ categoria, peso_total }))
      .sort((a, b) => b.peso_total - a.peso_total);

    for (const f of factoresOrdenados) {
      await this.factorRepo.save(
        this.factorRepo.create({
          evaluacion: { id_evaluacion: savedEvaluation.id_evaluacion } as any,
          descripcion: f.categoria,
          peso_asignado: f.peso_total,
        }),
      );
    }
    factoresDetectados.push(...factoresOrdenados);
  }

  // resultado
  return {
    id_evaluacion: savedEvaluation.id_evaluacion,
      total: savedEvaluation.puntaje_total,
      puntaje_pln: savedEvaluation.puntaje_pln,
      nivel: savedEvaluation.nivel_riesgo,
    recomendacion: recomendacion
      ? {
          categoria: recomendacion.categoria,
          mensaje: recomendacion.mensaje,
        }
      : {
          categoria: 'Sin recomendación',
          mensaje: 'No se encontró una recomendación para este nivel.',
        },
    factores_detectados: factoresDetectados,
  };
}

  async obtenerEvaluacionesPorEstudiante(id_estudiante: string) {
    return this.evaluacionRepo.find({
      where: { estudiante: { id_estudiante } },
      relations: ['matriz', 'respuestas', 'respuestas.respuesta'],
      order: { fecha: 'DESC' },
    });
  }

  async obtenerDetalle(id_evaluacion: string) {
    return this.evaluacionRepo.findOne({
      where: { id_evaluacion },
      relations: [
        'respuestas',
        'respuestas.respuesta',
        'respuestas.pregunta',
        'respuestas.pregunta.categoria',
        'matriz',
        'estudiante',
      ],
    });
  }
}
