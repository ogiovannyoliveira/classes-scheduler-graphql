import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppointmentsModule } from '~modules/appointments/Appointments.module';
import { ClassesModule } from '~modules/classes/Classes.module';
import { createClassesLoader } from '~modules/classes/infra/graphql/dataloaders/Classes.loader';
import { FindClassesByIdsUseCase } from '~modules/classes/useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';
import { LevelsModule } from '~modules/levels/Levels.module';
import { TeachersModule } from '~modules/teachers/Teachers.module';

import databaseConfig from './shared/infra/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ClassesModule],
      inject: [FindClassesByIdsUseCase],
      useFactory: (classesLoader: FindClassesByIdsUseCase) => ({
        playground: process.env.SHOW_PLAYGROUND === 'true',
        autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
        context: (): any => ({
          RandomValue: Math.random(),
          ClassesLoader: createClassesLoader(classesLoader),
        }),
      }),
    }),
    // domain modules
    TeachersModule,
    ClassesModule,
    LevelsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
