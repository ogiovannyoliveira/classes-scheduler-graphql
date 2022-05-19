import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { CreateClassUseCase } from '~modules/classes/useCases/createClass/CreateClass.useCase';
import { LevelsRepositoryInMemory } from '~modules/levels/repositories/in-memory/LevelsRepositoryInMemory';

describe('Create Class Use Case', () => {
  let classesRepositoryInMemory: ClassesRepositoryInMemory;
  let levelsRepositoryInMemory: LevelsRepositoryInMemory;
  let createClassUseCase: CreateClassUseCase;

  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    levelsRepositoryInMemory = new LevelsRepositoryInMemory();
    createClassUseCase = new CreateClassUseCase(
      classesRepositoryInMemory,
      levelsRepositoryInMemory,
    );
  });

  it('should be able to create a new class passing correct params', async () => {
    const { validId } = levelsRepositoryInMemory;

    const sut = await createClassUseCase.execute({
      teacher_id: uuid(),
      minimum_level_id: validId,
      title: 'Some Random Title',
      description: 'Some Random Description',
      link: 'http://localhost/link',
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });

  it('should not be able to create a class passing a wrong level_id', async () => {
    const sut = createClassUseCase.execute({
      teacher_id: uuid(),
      minimum_level_id: uuid(),
      title: 'Some Random Title',
      description: 'Some Random Description',
      link: 'http://localhost/link',
    });

    await expect(sut).rejects.toEqual(
      new NotFoundException('Level was not found.'),
    );
  });
});
