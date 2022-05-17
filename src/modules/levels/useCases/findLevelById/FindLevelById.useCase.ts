import { Inject, Injectable } from '@nestjs/common';

import { LevelInterface } from '~modules/levels/infra/graphql/interfaces/LevelInterface';
import { ILevelsRepository } from '~modules/levels/repositories/ILevelsRepository';

@Injectable()
class FindLevelByIdUseCase {
  constructor(
    @Inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  async execute(id: string): Promise<LevelInterface> {
    const level = await this.levelsRepository.findById(id);

    return level;
  }
}

export { FindLevelByIdUseCase };
