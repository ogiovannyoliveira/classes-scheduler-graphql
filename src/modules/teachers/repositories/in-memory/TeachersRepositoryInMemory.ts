import { v4 as uuid } from 'uuid';

import { CreateTeacherDTO } from '~modules/teachers/dtos/CreateTeacher.dto';
import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';

import { ITeachersRepository } from '../ITeachersRepository';

class TeachersRepositoryInMemory implements ITeachersRepository {
  private teachers: Teacher[] = [];

  async create({ name, email, password }: CreateTeacherDTO): Promise<Teacher> {
    const teacher = new Teacher();

    Object.assign(teacher, {
      id: uuid(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: null,
    });

    this.teachers.push(teacher);

    return teacher;
  }

  async findByIds(ids: string[]): Promise<Teacher[]> {
    const teachers = this.teachers.filter((teacher) =>
      ids.includes(teacher.id),
    );

    return teachers;
  }
}

export { TeachersRepositoryInMemory };
