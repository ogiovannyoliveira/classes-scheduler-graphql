import { LevelsRepositoryInMemory } from '~modules/levels/repositories/in-memory/LevelsRepositoryInMemory';
import { FindLevelByIdUseCase } from '~modules/levels/useCases/findLevelById/FindLevelById.useCase';

describe('Find Level By Id Use Case', () => {
  let levelsRepositoryInMemory: LevelsRepositoryInMemory;
  let findLevelByIdUseCase: FindLevelByIdUseCase;

  beforeEach(() => {
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    findLevelByIdUseCase = new FindLevelByIdUseCase(levelsRepositoryInMemory);
  });

  it('should be able to find a level by id', async () => {
    const { validId } = levelsRepositoryInMemory;

    const sut = await findLevelByIdUseCase.execute(validId);

    expect(sut).toBeInstanceOf(Object);
  });
});
