import { ILevelsRepository } from '~modules/levels/repositories/ILevelsRepository';
import { LevelsRepositoryInMemory } from '~modules/levels/repositories/in-memory/LevelsRepositoryInMemory';
import { FindLevelByIdUseCase } from '~modules/levels/useCases/findLevelById/FindLevelById.useCase';

describe('Find Level By Id Use Case', () => {
  let levelsRepositoryInMemory: ILevelsRepository;
  let findLevelByIdUseCase: FindLevelByIdUseCase;

  beforeEach(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    findLevelByIdUseCase = new FindLevelByIdUseCase();
  });

  it('should be able to find a level by id', async () => {
    const sut = await findLevelByIdUseCase.execute();

    expect(sut).toEqual(true);
  });
});
