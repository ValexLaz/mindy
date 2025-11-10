import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { EvaluacionesModule } from './evaluaciones/evaluaciones.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { MatricesModule } from './matrices/matrices.module';
import { RecomendacionesModule } from './recomendaciones/recomendaciones.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { RespuestaEstudianteModule } from './respuesta-estudiante/respuesta-estudiante.module';
import { AlertasModule } from './alertas/alertas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, 
        logging: true,
      }),
    }),
    RolesModule,
    UsuariosModule,
    AuthModule,
    EvaluacionesModule,
    PreguntasModule,
    MatricesModule,
    RecomendacionesModule,
    RespuestasModule,
    RespuestaEstudianteModule,
    AlertasModule,
  ],
})
export class AppModule {}
