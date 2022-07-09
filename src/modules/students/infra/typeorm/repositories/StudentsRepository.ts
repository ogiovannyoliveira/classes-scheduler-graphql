import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStudentDTO } from '~modules/students/dtos/CreateStudent.dto';
import { IStudentsRepository } from '~modules/students/repositories/IStudentsRepository';

import { Student } from '../entities/Student';

class StudentsRepository implements IStudentsRepository {
  constructor(
    @InjectRepository(Student)
    private repository: Repository<Student>,
  ) {}

  async create({
    name,
    email,
    phone,
    password,
    level_id,
  }: CreateStudentDTO): Promise<Student> {
    const student = this.repository.create({
      name,
      email,
      phone,
      password,
      level_id,
    });

    const createdStudent = this.repository.save(student);

    return createdStudent;
  }

  async findByEmail(email: string): Promise<Student> {
    const student = this.repository.findOne({
      where: { email },
    });

    return student;
  }
}

export { StudentsRepository };
