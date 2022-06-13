import { CreateStudentDTO } from '~modules/students/dtos/CreateStudent.dto';
import { Student } from '~modules/students/infra/typeorm/entities/Student';

import { IStudentRepository } from '../IStudentRepository';

class StudentsRepositoryInMemory implements IStudentRepository {
  private students: Student[] = [];

  async create(data: CreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, {
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
