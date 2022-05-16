import { Inject, Injectable } from '@nestjs/common';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';

import { CreateClassType } from './CreateClass.types';

@Injectable()
class CreateClassUseCase {
  constructor(
    @Inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute({
    teacher_id,
    minimum_level_id,
    title,
    link,
  }: CreateClassType): Promise<Class> {
    const classy = this.classesRepository.create({
      teacher_id,
      minimum_level_id,
      title,
      link,
    });

    return classy;
  }
}

export { CreateClassUseCase };
