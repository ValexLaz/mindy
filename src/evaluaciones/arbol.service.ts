import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Pregunta } from 'src/preguntas/pregunta.entity';
import { CategoriaPreguntas } from 'src/preguntas/categoria-preguntas.entity';
import { Evaluacion } from 'src/evaluaciones/evaluacion.entity';
import { RespuestaEstudiante } from 'src/respuesta-estudiante/respuesta-estudiante.entity';
import { Matriz } from 'src/matrices/matriz.entity';

@Injectable()
export class DecisionTreeService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    @InjectRepository(CategoriaPreguntas)
    private readonly categoriaRepo: Repository<CategoriaPreguntas>,

    @InjectRepository(Matriz)
    private readonly matrizRepo: Repository<Matriz>,

    @InjectRepository(RespuestaEstudiante)
    private readonly respuestaRepo: Repository<RespuestaEstudiante>,

    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,
  ) {}

  async obtenerSiguientePregunta(id_evaluacion: string) {
    console.log('\n🧩 --- INICIO DECISIÓN ---');
    console.log(`🎯 Evaluación ID: ${id_evaluacion}`);

    const evaluacion = await this.evaluacionRepo.findOne({
      where: { id_evaluacion },
      relations: [
        'matriz',
        'respuestas',
        'respuestas.respuesta',
        'respuestas.pregunta',
        'respuestas.pregunta.categoria',
        'respuestas.pregunta.respuestas',
      ],
    });

    if (!evaluacion)
      throw new NotFoundException('Evaluación no encontrada');

    console.log(`📋 Respuestas registradas: ${evaluacion.respuestas?.length ?? 0}`);

    if (!evaluacion.respuestas || evaluacion.respuestas.length === 0) {
      const categorias = await this.categoriaRepo.find({ order: { nombre: 'ASC' } });
      const [primeraCategoria] = categorias;
      if (!primeraCategoria)
        throw new NotFoundException('No hay categorías registradas');

      const [primeraPregunta] = await this.preguntaRepo.find({
        where: { categoria: { id_categoria: primeraCategoria.id_categoria } , is_open_ended: false,},
        relations: ['respuestas', 'categoria'],
        order: { texto: 'ASC' },
        take: 1,
      });

      if (!primeraPregunta)
        throw new NotFoundException('No hay preguntas en la primera categoría');

      console.log(`🪄 Primera categoría: ${primeraCategoria.nombre}`);
      console.log(`❓ Primera pregunta: ${primeraPregunta.texto}`);
      console.log('🧩 --- FIN DECISIÓN (inicio) ---\n');
      return this._mapPregunta(primeraPregunta);
    }

    const acumulado: Record<string, number> = {};
    const respuestasPorCat: Record<string, number> = {};
    const categoriasBloqueadas = new Set<string>();

    for (const r of evaluacion.respuestas) {
      // preguntas cerradas 
      if (r.pregunta?.is_open_ended === false) { 
        const categoria = r.pregunta?.categoria?.id_categoria;
        const peso = Number(r.respuesta?.peso) || 0;
        acumulado[categoria] = (acumulado[categoria] || 0) + peso;
        respuestasPorCat[categoria] = (respuestasPorCat[categoria] || 0) + 1;

      if (peso === 0) categoriasBloqueadas.add(categoria);
      }
    }

    console.log('📈 Pesos acumulados:');
    Object.entries(acumulado).forEach(([cat, peso]) =>
      console.log(`   - ${cat}: ${peso}`)
    );
    console.log(`🚫 Categorías bloqueadas: ${Array.from(categoriasBloqueadas).length}`);
    const ultimaRespuestaCerrada = evaluacion.respuestas
      .filter(r => r.pregunta?.is_open_ended === false)
      .at(-1);

    if (!ultimaRespuestaCerrada) {
      return this._finalizarOVerAbierta([]); 
    }

    //categorias
    const categoriaActual = ultimaRespuestaCerrada?.pregunta?.categoria;
    if (!categoriaActual)
      throw new NotFoundException('No se encontró la categoría de la última respuesta cerrada');

    console.log(`🧠 Categoría actual: ${categoriaActual.nombre}`);

    const categorias = await this.categoriaRepo.find({ order: { nombre: 'ASC' } });
    const preguntasRespondidas = evaluacion.respuestas.map(r => r.pregunta.id_pregunta);

    const categoriasDisponibles: CategoriaPreguntas[] = [];
    for (const cat of categorias) {
      if (categoriasBloqueadas.has(cat.id_categoria)) continue; 
      const pendientes = await this.preguntaRepo.count({
        where: {
          categoria: { id_categoria: cat.id_categoria },
          id_pregunta: Not(In(preguntasRespondidas)),
          is_open_ended: false,
        },
      });
      if (pendientes > 0) categoriasDisponibles.push(cat);
    }

    if (categoriasDisponibles.length === 0) {
      console.log('🏁 Todas las categorías cerradas completadas o bloqueadas');
      return this._finalizarOVerAbierta(preguntasRespondidas);
    } 

    console.log(`📚 Categorías pendientes: ${categoriasDisponibles.length}`);
    categoriasDisponibles.forEach(c => console.log(`   - ${c.nombre}`));

    //decision en base a respuesta
    const pesos = ultimaRespuestaCerrada.pregunta.respuestas.map(r => Number(r.peso));
    const pesoSeleccionado = Number(ultimaRespuestaCerrada.respuesta?.peso) || 0;
    const pesoMax = Math.max(...pesos);
    const pesoMin = Math.min(...pesos);
    const segundoMin = Math.min(...pesos.filter(p => p > pesoMin));
    const segundoMax = Math.max(...pesos.filter(p => p < pesoMax));

    console.log(` Peso seleccionado: ${pesoSeleccionado}`);
    console.log(` Max: ${pesoMax} |  2do Max: ${segundoMax} |  Min: ${pesoMin} | 🪫 2do Min: ${segundoMin}`);

    
    let siguienteCategoriaId = categoriaActual.id_categoria;

    if (pesoSeleccionado === 0 || pesoSeleccionado <= segundoMin) {
      
      const currentIndex = categoriasDisponibles.findIndex(c => c.id_categoria === categoriaActual.id_categoria);
      const siguiente = categoriasDisponibles[(currentIndex + 1) % categoriasDisponibles.length];
      siguienteCategoriaId = siguiente.id_categoria;
      console.log(`Respuesta baja (${pesoSeleccionado}) → cambio a ${siguiente.nombre}`);
    } 
    else if (pesoSeleccionado >= pesoMax || pesoSeleccionado >= segundoMax) {
      
      console.log(`Mantiene categoría (${categoriaActual.nombre}) por respuesta alta (${pesoSeleccionado})`);
    } 
    else {
      
      const siguiente = categoriasDisponibles.find(c => c.id_categoria !== categoriaActual.id_categoria);
      if (siguiente) {
        siguienteCategoriaId = siguiente.id_categoria;
        console.log(` Cambio moderado a ${siguiente.nombre}`);
      }
    }

    const MAX_PREGUNTAS_POR_CATEGORIA = 2;
if ((respuestasPorCat[categoriaActual.id_categoria] || 0) >= MAX_PREGUNTAS_POR_CATEGORIA) {
  categoriasDisponibles.splice(
    categoriasDisponibles.findIndex(c => c.id_categoria === categoriaActual.id_categoria),
    1
  );

  const siguiente = categoriasDisponibles[0];
  if (siguiente) {
    siguienteCategoriaId = siguiente.id_categoria;
    console.log(` Límite de ${MAX_PREGUNTAS_POR_CATEGORIA} → cambio a ${siguiente.nombre}`);
  } else {
    console.log(' No hay más categorías disponibles — evaluación completada.');
    return this._finalizarOVerAbierta(preguntasRespondidas);
  }
}


    const siguientePregunta = await this.preguntaRepo.findOne({
      where: {
        categoria: { id_categoria: siguienteCategoriaId },
        id_pregunta: Not(In(preguntasRespondidas)),
        is_open_ended: false,
      },
      relations: ['respuestas', 'categoria'],
      order: { texto: 'ASC' },
    });

    if (!siguientePregunta) {
      console.log(' No hay más preguntas — evaluación completada.');
      return this._finalizarOVerAbierta(preguntasRespondidas);
    }

    console.log(` Siguiente pregunta: ${siguientePregunta.texto}`);
    console.log(` Categoría: ${siguientePregunta.categoria?.nombre}`);
    console.log(' --- FIN DECISIÓN ---\n');

    return this._mapPregunta(siguientePregunta);
  }
  private async _finalizarOVerAbierta(preguntasRespondidas: string[]) {
    console.log('Buscando pregunta abierta para finalizar...'); 
    const preguntaAbierta = await this.preguntaRepo.findOne({
    where: { is_open_ended: true },
    relations: ['respuestas', 'categoria'], 
  });

  if (!preguntaAbierta) {
    console.warn(' No se encontró ninguna pregunta abierta en la BD. Evaluación completada.');
    return { fin: true, mensaje: 'Evaluación completada' };
    }

  const yaRespondida = preguntasRespondidas.includes(preguntaAbierta.id_pregunta);

  if (yaRespondida) {
    console.log('🏁 Pregunta abierta ya respondida. Evaluación completada.');
    return { fin: true, mensaje: 'Evaluación completada' };
    } else {
    console.log('🏁 Sirviendo pregunta abierta...');

    return this._mapPregunta(preguntaAbierta);
   }
}
  private _mapPregunta(p: Pregunta) {
    return {
      id_pregunta: p.id_pregunta,
      texto: p.texto,
      categoria: p.categoria?.nombre ?? 'Sin categoría',
      is_open_ended: p.is_open_ended ?? false,
      respuestas: p.respuestas?.map((r) => ({
        id_respuesta: r.id_respuesta,
        texto: r.texto,
        peso: r.peso,
      })) ?? [],
    };
  }
}
