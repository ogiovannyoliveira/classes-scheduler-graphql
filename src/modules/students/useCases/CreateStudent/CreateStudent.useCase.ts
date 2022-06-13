import { Student } from '~modules/students/infra/typeorm/entities/Student';
import { IStudentRepository } from '~modules/students/repositories/IStudentRepository';

import { CreateStudentType } from './CreateStudent.types';

class CreateStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(data: CreateStudentType): Promise<Student> {
    const student = this.studentRepository.create(data);

    return student;
  }
}

export { CreateStudentUseCase };
