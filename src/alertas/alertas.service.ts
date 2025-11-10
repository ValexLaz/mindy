import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Alerta, AlertStatus } from './alerta.entity';
import { Evaluacion } from '../evaluaciones/evaluacion.entity'; // Asegúrate que la ruta sea correcta


@Injectable()
export class AlertasService {
  constructor(
    @InjectRepository(Alerta)
    private readonly alertaRepo: Repository<Alerta>,
  ) {}

  /**
   * Crea una nueva alerta si la evaluación tiene riesgo medio o alto.
   * Este método es llamado por EvaluacionesService.
   * @param evaluacion - La entidad Evaluacion completa (con estudiante cargado).
   * @returns La alerta creada o null si no se creó.
   */
  async createAlert(evaluacion: Evaluacion): Promise<Alerta | null> {
    if (evaluacion.nivel_riesgo !== 'medio' && evaluacion.nivel_riesgo !== 'alto') {
      console.log(`[AlertasService] Nivel de riesgo '${evaluacion.nivel_riesgo}' no requiere alerta para evaluación ${evaluacion.id_evaluacion}.`);
      return null; 
    }

    if (!evaluacion.estudiante || !evaluacion.estudiante.id_estudiante) {
      console.error(`[AlertasService] Error: No se encontró id_estudiante en la evaluación ${evaluacion.id_evaluacion} al intentar crear alerta.`);
      return null; 
    }

    try {
      console.log(`[AlertasService] Creando alerta para evaluación ${evaluacion.id_evaluacion} (Riesgo: ${evaluacion.nivel_riesgo})...`);
      const nuevaAlerta = this.alertaRepo.create({
        evaluacion: { id_evaluacion: evaluacion.id_evaluacion } as any, 
        id_estudiante: evaluacion.estudiante.id_estudiante, 
        nivel_riesgo: evaluacion.nivel_riesgo, 
        estado: AlertStatus.NUEVA, 
        
      });
      const savedAlert = await this.alertaRepo.save(nuevaAlerta);
      console.log(`✅ [AlertasService] Alerta creada con ID: ${savedAlert.id_alerta}`);
      return savedAlert;
    } catch (error) {
      console.error(`❌ [AlertasService] Error al guardar la alerta para evaluación ${evaluacion.id_evaluacion}:`, error);
      return null;
    }
  }

  /**
   * Busca las alertas recientes (nuevas o vistas) para mostrar en el dashboard.
   * Carga las relaciones necesarias para mostrar información relevante.
   * @returns Un array de objetos formateados para el dashboard.
   */
  async findRecentAlertsForDashboard() {
    console.log('[AlertasService] Buscando alertas recientes para dashboard...');
    const alertas = await this.alertaRepo.find({
      where: {
         estado: In([AlertStatus.NUEVA, AlertStatus.VISTA]),
      },
      order: { fecha: 'DESC' }, 
      take: 20, 
      relations: [ 
        'evaluacion',             
        'evaluacion.estudiante',  
        'evaluacion.factores',    
      ],
    });
    console.log(`[AlertasService] Encontradas ${alertas.length} alertas.`);

    if (alertas.length === 0) {
       return []; 
    }

    return alertas.map(alerta => {
      const evaluacion = alerta.evaluacion;
      const estudiante = evaluacion?.estudiante;
      const factores = evaluacion?.factores;

      console.log(`[AlertasService] Mapeando alerta ${alerta.id_alerta} para evaluación ${evaluacion?.id_evaluacion}`);

      return {
        id_alerta: alerta.id_alerta,
        fecha: alerta.fecha,
        estado: alerta.estado,
        nivel_riesgo: alerta.nivel_riesgo,
        evaluacion: evaluacion ? {
           id_evaluacion: evaluacion.id_evaluacion,
           puntaje_total: evaluacion.puntaje_total,
        } : null, 
        estudiante: estudiante ? {
           pseudonimo: estudiante.pseudonimo ?? `Est-${alerta.id_estudiante.substring(0,4)}`, 
           carrera: estudiante.carrera,
           semestre: estudiante.semestre,
        } : null,
        factores_principales: factores
          ?.filter(f => f.peso_asignado != null) 
          .sort((a, b) => (Number(b.peso_asignado) || 0) - (Number(a.peso_asignado) || 0)) 
          .slice(0, 2) 
          .map(f => ({ descripcion: f.descripcion, peso: f.peso_asignado })) 
          ?? [], 
      };
    });
  }

  /**
   * Actualiza el estado de una alerta específica.
   * @param id_alerta - El ID de la alerta a actualizar.
   * @param newStatus - El nuevo estado (debe ser uno de AlertStatus).
   * @returns Un mensaje de confirmación o lanza NotFoundException.
   */
  async updateStatus(id_alerta: string, newStatus: AlertStatus | string) {
     console.log(`[AlertasService] Actualizando estado de alerta ${id_alerta} a ${newStatus}`);
     const result = await this.alertaRepo.update(id_alerta, { estado: newStatus as string });

     if (result.affected === 0) {
       console.warn(`[AlertasService] No se encontró alerta con ID ${id_alerta} para actualizar.`);
       throw new NotFoundException(`Alerta con ID ${id_alerta} no encontrada`);
     }

     console.log(`[AlertasService] Alerta ${id_alerta} actualizada exitosamente.`);
     return { message: `Alerta ${id_alerta} actualizada a ${newStatus}`};
  }

  
}