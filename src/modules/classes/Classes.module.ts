import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Level } from '~modules/levels/infra/typeorm/entities/Level';
import { LevelsRepositories } from '~modules/levels/infra/typeorm/repositories/LevelsRepositories';

import { ClassesResolver } from './infra/graphql/resolvers/Classes.resolver';
import { Class } from './infra/typeorm/entities/Class';
import { ClassesRepository } from './infra/typeorm/repositories/ClassesRepository';
import { CreateClassUseCase } from './useCases/createClass/CreateClass.useCase';
import { FindClassesByIdsUseCase } from './useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Level])],
  providers: [
    ClassesResolver,
    CreateClassUseCase,
    FindClassesByIdsUseCase,
    {
      provide: 'ClassesRepository',
      inject: [ClassesRepository],
      useClass: ClassesRepository,
    },
    {
      provide: 'LevelsRepository',
      inject: [LevelsRepositories],
      useClass: LevelsRepositories,
    },
  ],
  exports: [
    FindClassesByIdsUseCase,
    {
      provide: 'ClassesRepository',
      inject: [ClassesRepository],
      useClass: ClassesRepository,
    },
  ],
})
export class ClassesModule {}
