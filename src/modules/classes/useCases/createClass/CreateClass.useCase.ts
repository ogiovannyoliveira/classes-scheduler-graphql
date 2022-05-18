import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';
import { ILevelsRepository } from '~modules/levels/repositories/ILevelsRepository';

import { CreateClassType } from './CreateClass.types';

@Injectable()
class CreateClassUseCase {
  constructor(
    @Inject('ClassesRepository')
    private classesRepository: IClassesRepository,
    @Inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  async execute({
    teacher_id,
    minimum_level_id,
    title,
    link,
  }: CreateClassType): Promise<Class> {
    const levelExists = await this.levelsRepository.findById(minimum_level_id);

    if (!levelExists) {
      throw new NotFoundException('Level was not found.');
    }

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
