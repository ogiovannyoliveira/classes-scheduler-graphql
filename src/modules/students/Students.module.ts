import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Level } from '~modules/levels/infra/typeorm/entities/Level';
import { LevelsRepository } from '~modules/levels/infra/typeorm/repositories/LevelsRepository';

import { StudentsResolver } from './infra/graphql/resolvers/Students.resolver';
import { Student } from './infra/typeorm/entities/Student';
import { StudentsRepository } from './infra/typeorm/repositories/StudentsRepository';
import { CreateStudentUseCase } from './useCases/CreateStudent/CreateStudent.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Level])],
  providers: [
    StudentsResolver,
    CreateStudentUseCase,
    {
      provide: 'StudentsRepository',
      inject: [StudentsRepository],
      useClass: StudentsRepository,
    },
    {
      provide: 'LevelsRepository',
      inject: [LevelsRepository],
      useClass: LevelsRepository,
    },
  ],
  exports: [],
})
export class StudentsModule {}
