import { Inject, Injectable } from '@nestjs/common';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';

@Injectable()
class FindClassesByIdsUseCase {
  constructor(
    @Inject('ClassesRepository')
    private readonly classesRepository: IClassesRepository,
  ) {}

  async execute(ids: readonly string[]): Promise<Class[]> {
    const classesIds = [...ids];

    const classes = await this.classesRepository.findByIds(classesIds);

    return classes;
  }
}

export { FindClassesByIdsUseCase };
