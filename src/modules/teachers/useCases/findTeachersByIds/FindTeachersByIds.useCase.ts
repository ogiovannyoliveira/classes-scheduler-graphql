import { Inject } from '@nestjs/common';

import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';
import { ITeachersRepository } from '~modules/teachers/repositories/ITeachersRepository';

class FindTeachersByIdsUseCase {
  constructor(
    @Inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}

  async execute(ids: readonly string[]): Promise<Teacher[]> {
    const teachersIds = [...ids];

    const teachers = await this.teachersRepository.findByIds(teachersIds);

    return teachers;
  }
}

export { FindTeachersByIdsUseCase };
