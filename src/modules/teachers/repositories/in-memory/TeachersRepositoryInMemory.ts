import { v4 as uuid } from 'uuid';

import { CreateTeacherDTO } from '~modules/teachers/dtos/CreateTeacher.dto';
import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';

import { ITeachersRepository } from '../ITeachersRepository';

class TeachersRepositoryInMemory implements ITeachersRepository {
  get validId(): string {
    return '642d4839-546b-4eac-a0f6-67001161bc86';
  }

  private teachers: Teacher[] = [
    {
      id: this.validId,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '*********',
      created_at: new Date(),
      updated_at: null,
    },
  ];

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
