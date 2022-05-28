import { v4 as uuid } from 'uuid';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { FindClassesByIdsUseCase } from '~modules/classes/useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';

describe('Find Classes By Ids Use Case', () => {
  let classesRepositoryInMemory: ClassesRepositoryInMemory;
  let findClassesByIdsUseCase: FindClassesByIdsUseCase;

  async function classesFactory({
    teacher_id = uuid(),
    minimum_level_id = uuid(),
    title = 'Some title',
    link = 'http://localhost',
    description = undefined,
  }): Promise<Class> {
    return classesRepositoryInMemory.create({
      teacher_id,
      minimum_level_id,
      title,
      description,
      link,
    });
  }

  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    findClassesByIdsUseCase = new FindClassesByIdsUseCase(
      classesRepositoryInMemory,
    );
  });

  it('should be able to list all classes passing valid ids', async () => {
    const validIds = ['', '', ''];

    const classes = await Promise.all(
      validIds.map(async () => classesFactory({})),
    );

    validIds.forEach((_, index) => {
      validIds[index] = classes[index].id;
    });

    const sut = await findClassesByIdsUseCase.execute(validIds);

    expect(sut.length).toBe(validIds.length);
  });
});
