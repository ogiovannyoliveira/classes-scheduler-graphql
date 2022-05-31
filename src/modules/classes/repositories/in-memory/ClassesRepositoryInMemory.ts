import { v4 as uuid } from 'uuid';

import { CreateClassDTO } from '~modules/classes/dtos/CreateClass.dto';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { LevelsRepositoryInMemory } from '~modules/levels/repositories/in-memory/LevelsRepositoryInMemory';

import { IClassesRepository } from '../IClassesRepository';

class ClassesRepositoryInMemory implements IClassesRepository {
  get validId(): string {
    return '642d4839-546b-4eac-a0f6-67001161bc86';
  }

  get validLevelId(): string {
    const level: LevelsRepositoryInMemory = new LevelsRepositoryInMemory();

    return level.validId;
  }

  private classes: Class[] = [
    {
      id: this.validId,
      title: 'Some random title',
      description: 'Some random description',
      link: 'http://localhost',
      minimum_level_id: this.validLevelId,
      teacher_id: uuid(),
      created_at: new Date(),
      updated_at: null,
    },
  ];

  async create({
    teacher_id,
    minimum_level_id,
    title,
    link,
  }: CreateClassDTO): Promise<Class> {
    const classy = new Class();

    Object.assign(classy, {
      id: uuid(),
      teacher_id,
      minimum_level_id,
      title,
      link,
      created_at: new Date(),
      updated_at: null,
    });

    this.classes.push(classy);

    return classy;
  }

  async existsById(id: string): Promise<boolean> {
    const classExists = this.classes.some((classy) => classy.id === id);

    return classExists;
  }

  async findByIds(ids: string[]): Promise<Class[]> {
    const classes = this.classes.filter((classy) => ids.includes(classy.id));

    return classes;
  }
}

export { ClassesRepositoryInMemory };
