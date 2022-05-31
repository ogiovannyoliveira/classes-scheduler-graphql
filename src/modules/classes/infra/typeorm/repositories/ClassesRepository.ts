import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateClassDTO } from '~modules/classes/dtos/CreateClass.dto';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';

import { Class } from '../entities/Class';

class ClassesRepository implements IClassesRepository {
  constructor(
    @InjectRepository(Class)
    private repository: Repository<Class>,
  ) {}

  async create({
    teacher_id,
    minimum_level_id,
    title,
    link,
  }: CreateClassDTO): Promise<Class> {
    const classyToCreate = this.repository.create({
      teacher_id,
      minimum_level_id,
      title,
      link,
    });

    const classy = this.repository.save(classyToCreate);

    return classy;
  }

  async existsById(id: string): Promise<boolean> {
    const [{ exists }] = await this.repository.query(
      'SELECT EXISTS(SELECT 1 FROM classes WHERE classes.id = $1)',
      [id],
    );

    return exists;
  }

  async findByIds(ids: string[]): Promise<Class[]> {
    const classes = await this.repository.find({
      where: { id: In(ids) },
    });

    return classes;
  }
}

export { ClassesRepository };
