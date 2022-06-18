import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LevelsRepositories } from '~modules/levels/infra/typeorm/repositories/LevelsRepositories';

import { Student } from './infra/typeorm/entities/Student';
import { StudentsRepository } from './infra/typeorm/repositories/StudentsRepository';
import { CreateStudentUseCase } from './useCases/CreateStudent/CreateStudent.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [
    CreateStudentUseCase,
    {
      provide: 'StudentsRepository',
      inject: [StudentsRepository],
      useClass: StudentsRepository,
    },
    {
      provide: 'LevelsRepository',
      inject: [LevelsRepositories],
      useClass: LevelsRepositories,
    },
  ],
  exports: [],
})
export class StudentsModule {}
