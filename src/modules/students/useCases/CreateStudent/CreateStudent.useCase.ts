import { Inject, NotFoundException } from '@nestjs/common';
import { genSalt, genSaltSync, hashSync } from 'bcryptjs';

import { ILevelsRepository } from '~modules/levels/repositories/ILevelsRepository';
import { Student } from '~modules/students/infra/typeorm/entities/Student';
import { IStudentsRepository } from '~modules/students/repositories/IStudentsRepository';

import { CreateStudentType } from './CreateStudent.types';

class CreateStudentUseCase {
  constructor(
    @Inject('StudentsRepository')
    private readonly studentsRepository: IStudentsRepository,
    @Inject('LevelsRepository')
    private readonly levelsRepository: ILevelsRepository,
  ) {}

  async execute(data: CreateStudentType): Promise<Student> {
    let checkable = true;
    let { level_id } = data;

    if (!level_id) {
      const lowestLevel = await this.levelsRepository.findLowest();

      level_id = lowestLevel.id;
      checkable = false;
    }

    if (checkable) {
      const levelExists = await this.levelsRepository.existsById(level_id);

      if (!levelExists) {
        throw new NotFoundException('Level was not found.');
      }
    }

    const SALT = genSaltSync();
    const encryptedPassword = hashSync(data.password, SALT);

    const student = await this.studentsRepository.create({
      ...data,
      level_id,
      password: encryptedPassword,
    });

    return student;
  }
}

export { CreateStudentUseCase };
