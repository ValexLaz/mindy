import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from 'src/evaluaciones/evaluacion.entity';
import { FactorDetectado } from 'src/evaluaciones/factor-detectado.entity';
import { FiltroReporteDto } from './dto/filtro-reporte.dto';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,
    @InjectRepository(FactorDetectado)
    private readonly factorRepo: Repository<FactorDetectado>,
  ) {}

  async obtenerOpcionesFiltros() {
  const carreras = await this.evaluacionRepo
    .createQueryBuilder('e')
    .innerJoin('e.estudiante', 'est')
    .select('DISTINCT est.carrera', 'carrera')
    .orderBy('est.carrera', 'ASC')
    .getRawMany();

  const semestres = await this.evaluacionRepo
    .createQueryBuilder('e')
    .innerJoin('e.estudiante', 'est')
    .select('DISTINCT est.semestre', 'semestre')
    .orderBy('est.semestre', 'ASC')
    .getRawMany();

  return {
    carreras: carreras.map(c => c.carrera),
    semestres: semestres.map(s => s.semestre),
  };
}

  async obtenerResumenGeneral(filtro: FiltroReporteDto) {
    const query = this.evaluacionRepo
      .createQueryBuilder('e')
      .innerJoin('e.estudiante', 'est') // Usa alias corto y único
      .select('e.nivel_riesgo', 'nivel')
      .addSelect('COUNT(e.id_evaluacion)', 'cantidad')
      .groupBy('e.nivel_riesgo');

    // 🔸 Filtro por carrera
    if (filtro.carrera) {
      query.andWhere('est.carrera ILIKE :carrera', { carrera: `%${filtro.carrera}%` });
    }

    // 🔸 Filtro por semestre
    if (filtro.semestre) {
      query.andWhere('CAST(est.semestre AS TEXT) ILIKE :semestre', {
        semestre: `%${filtro.semestre}%`,
      });
    }

    // 🔸 Filtro por rango de fechas
    if (filtro.fechaInicio && filtro.fechaFin) {
      query.andWhere('e.fecha BETWEEN :inicio AND :fin', {
        inicio: filtro.fechaInicio,
        fin: filtro.fechaFin,
      });
    }

    return query.getRawMany();
  }

  /**
   * 🔹 Devuelve los factores detectados más frecuentes (Top 10),
   * con filtros opcionales por carrera, semestre y rango de fechas.
   */
  async factoresFrecuentes(filtro?: FiltroReporteDto) {
    const query = this.factorRepo
      .createQueryBuilder('f')
      .innerJoin('f.evaluacion', 'e')
      .innerJoin('e.estudiante', 'est')
      .select('f.descripcion', 'factor')
      .addSelect('COUNT(f.id_factor)', 'frecuencia')
      .groupBy('f.descripcion')
      .orderBy('frecuencia', 'DESC')
      .limit(10);

    // 🔸 Filtro por carrera
    if (filtro?.carrera) {
      query.andWhere('est.carrera ILIKE :carrera', { carrera: `%${filtro.carrera}%` });
    }

    // 🔸 Filtro por semestre
    if (filtro?.semestre) {
      query.andWhere('CAST(est.semestre AS TEXT) ILIKE :semestre', {
        semestre: `%${filtro.semestre}%`,
      });
    }

    // 🔸 Filtro por fechas
    if (filtro?.fechaInicio && filtro?.fechaFin) {
      query.andWhere('e.fecha BETWEEN :inicio AND :fin', {
        inicio: filtro.fechaInicio,
        fin: filtro.fechaFin,
      });
    }

    return query.getRawMany();
  }

  /**
   * 🔹 Calcula la evolución del riesgo (promedio mensual de puntaje total),
   * con filtros opcionales por carrera, semestre y fechas.
   */
  async evolucionRiesgo(filtro?: FiltroReporteDto) {
    const query = this.evaluacionRepo
      .createQueryBuilder('e')
      .innerJoin('e.estudiante', 'est')
      .select("TO_CHAR(DATE_TRUNC('month', e.fecha), 'YYYY-MM')", 'mes')
      .addSelect('AVG(e.puntaje_total)', 'promedio')
      .groupBy('mes')
      .orderBy('mes', 'ASC');

    // 🔸 Filtro por carrera
    if (filtro?.carrera) {
      query.andWhere('est.carrera ILIKE :carrera', { carrera: `%${filtro.carrera}%` });
    }

    // 🔸 Filtro por semestre
    if (filtro?.semestre) {
      query.andWhere('CAST(est.semestre AS TEXT) ILIKE :semestre', {
        semestre: `%${filtro.semestre}%`,
      });
    }

    // 🔸 Filtro por fechas
    if (filtro?.fechaInicio && filtro?.fechaFin) {
      query.andWhere('e.fecha BETWEEN :inicio AND :fin', {
        inicio: filtro.fechaInicio,
        fin: filtro.fechaFin,
      });
    }

    return query.getRawMany();
  }
}
