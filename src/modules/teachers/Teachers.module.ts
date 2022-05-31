import { Module } from '@nestjs/common';

import { TeachersResolver } from './infra/graphql/resolvers/Teachers.resolver';
import { TeachersRepository } from './infra/typeorm/repositories/TeachersRepository';
import { FindTeachersByIdsUseCase } from './useCases/findTeachersByIds/FindTeachersByIds.useCase';

@Module({
  providers: [
    TeachersResolver,
    FindTeachersByIdsUseCase,
    {
      provide: 'TeachersRepository',
      inject: [TeachersRepository],
      useClass: TeachersRepository,
    },
  ],
  exports: [
    FindTeachersByIdsUseCase,
    {
      provide: 'TeachersRepository',
      inject: [TeachersRepository],
      useClass: TeachersRepository,
    },
  ],
})
export class TeachersModule {}
