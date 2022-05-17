import { Args, Query, Resolver } from '@nestjs/graphql';

import { FindLevelByIdUseCase } from '~modules/levels/useCases/findLevelById/FindLevelById.useCase';

import { LevelInterface } from '../interfaces/LevelInterface';

@Resolver()
class LevelsResolver {
  constructor(private findLevelByIdUseCase: FindLevelByIdUseCase) {}

  @Query(() => LevelInterface)
  async levelById(@Args('id') id: string): Promise<LevelInterface> {
    const level = await this.findLevelByIdUseCase.execute(id);

    return level;
  }
}

export { LevelsResolver };
