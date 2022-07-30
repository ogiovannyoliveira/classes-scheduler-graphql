import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { join } from 'path';
import type { RedisClientOptions } from 'redis';

import { AuthModule } from '~shared/modules/auth/Auth.module';

import { AppointmentsModule } from '~modules/appointments/Appointments.module';
import { ClassesModule } from '~modules/classes/Classes.module';
import { createClassesLoader } from '~modules/classes/infra/graphql/dataloaders/Classes.loader';
import { FindClassesByIdsUseCase } from '~modules/classes/useCases/findClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';
import { LevelsModule } from '~modules/levels/Levels.module';
import { SchedulesModule } from '~modules/schedules/Schedules.module';
import { StudentsModule } from '~modules/students/Students.module';
import { createTeachersLoader } from '~modules/teachers/infra/graphql/dataloaders/Teachers.dataloader';
import { TeachersModule } from '~modules/teachers/Teachers.module';
import { FindTeachersByIdsUseCase } from '~modules/teachers/useCases/findTeachersByIds/FindTeachersByIds.useCase';

import databaseConfig from './shared/infra/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        url: `redis://${config.get('RDS_HOST')}:${config.get('RDS_PORT')}`,
        // password: config.get('RDS_PASS'),
        ttl: config.get('RDS_TTL'),
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ClassesModule, TeachersModule],
      inject: [FindClassesByIdsUseCase, FindTeachersByIdsUseCase],
      useFactory: (
        classesLoader: FindClassesByIdsUseCase,
        teachersLoader: FindTeachersByIdsUseCase,
      ) => ({
        playground: process.env.SHOW_PLAYGROUND === 'true',
        autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
        installSubscriptionHandlers: true,
        subscriptions: {
          'subscriptions-transport-ws': true,
        },
        context: (): any => ({
          RandomValue: Math.random(),
          ClassesLoader: createClassesLoader(classesLoader),
          TeachersLoader: createTeachersLoader(teachersLoader),
        }),
      }),
    }),
    // auth modules
    AuthModule,
    // domain modules
    TeachersModule,
    StudentsModule,
    ClassesModule,
    LevelsModule,
    AppointmentsModule,
    SchedulesModule,
  ],
})
export class AppModule {}
