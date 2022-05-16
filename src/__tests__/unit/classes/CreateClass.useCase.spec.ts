import { ClassesRepositoryInMemory } from '../../../modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { CreateClassUseCase } from '../../../modules/classes/useCases/createClass/CreateClass.useCase';

describe('Create Class Use Case', () => {
  let classesRepositoryInMemory: ClassesRepositoryInMemory;
  let sut: CreateClassUseCase;

  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    sut = new CreateClassUseCase();
  });

  it('should be able to create a new class passing correct params', async () => {
    const retuning = await sut.execute();

    expect(retuning).toBe(true);
  });
});
