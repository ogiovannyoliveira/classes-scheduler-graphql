import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersResolver } from './infra/graphql/resolvers/Teachers.resolver';
import { Teacher } from './infra/typeorm/entities/Teacher';
import { TeachersRepository } from './infra/typeorm/repositories/TeachersRepository';
import { FindTeachersByIdsUseCase } from './useCases/findTeachersByIds/FindTeachersByIds.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
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
