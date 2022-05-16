import { v4 as uuid } from 'uuid';

import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';
import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { CreateClassUseCase } from '~modules/classes/useCases/createClass/CreateClass.useCase';

describe('Create Class Use Case', () => {
  let classesRepositoryInMemory: IClassesRepository;
  let createClassUseCase: CreateClassUseCase;

  beforeEach(() => {
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    createClassUseCase = new CreateClassUseCase(classesRepositoryInMemory);
  });

  it('should be able to create a new class passing correct params', async () => {
    const sut = await createClassUseCase.execute({
      teacher_id: uuid(),
      minimum_level_id: uuid(),
      title: 'Some Random Title',
      description: 'Some Random Description',
      link: 'http://localhost/link',
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });
});
