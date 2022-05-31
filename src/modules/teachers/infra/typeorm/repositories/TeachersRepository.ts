import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateTeacherDTO } from '~modules/teachers/dtos/CreateTeacher.dto';
import { ITeachersRepository } from '~modules/teachers/repositories/ITeachersRepository';

import { Teacher } from '../entities/Teacher';

class TeachersRepository implements ITeachersRepository {
  constructor(
    @InjectRepository(Teacher)
    private repository: Repository<Teacher>,
  ) {}

  async create({ name, email, password }: CreateTeacherDTO): Promise<Teacher> {
    const teacherToCreate = this.repository.create({
      name,
      email,
      password,
    });

    const teacher = this.repository.save(teacherToCreate);

    return teacher;
  }

  async findByIds(ids: string[]): Promise<Teacher[]> {
    const teachers = await this.repository.find({
      where: { id: In(ids) },
    });

    return teachers;
  }
}

export { TeachersRepository };
