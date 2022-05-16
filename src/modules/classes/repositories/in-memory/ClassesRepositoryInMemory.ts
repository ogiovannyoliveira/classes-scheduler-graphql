import { v4 as uuid } from 'uuid';

import { CreateClassInput } from '~modules/classes/infra/graphql/inputs/CreateClass.input';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';

import { IClassesRepository } from '../IClassesRepository';

class ClassesRepositoryInMemory implements IClassesRepository {
  private classes: Class[] = [];

  async create({
    teacher_id,
    minimum_level_id,
    title,
    link,
  }: CreateClassInput): Promise<Class> {
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
}

export { ClassesRepositoryInMemory };
