import { v4 as uuid } from 'uuid';

import { CreateStudentDTO } from '~modules/students/dtos/CreateStudent.dto';
import { Student } from '~modules/students/infra/typeorm/entities/Student';

import { IStudentsRepository } from '../IStudentsRepository';

class StudentsRepositoryInMemory implements IStudentsRepository {
  private students: Student[] = [];

  async create(data: CreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, {
      id: uuid(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      level_id: data.level_id,
      created_at: new Date(),
      updated_at: null,
    });

    this.students.push(student);

    return student;
  }
}

export { StudentsRepositoryInMemory };
