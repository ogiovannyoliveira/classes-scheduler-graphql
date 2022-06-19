import { v4 as uuid } from 'uuid';

import { LevelsRepositoryInMemory } from '~modules/levels/repositories/in-memory/LevelsRepositoryInMemory';
import { StudentsRepositoryInMemory } from '~modules/students/repositories/in-memory/StudentsRepositoryInMemory';
import { CreateStudentUseCase } from '~modules/students/useCases/CreateStudent/CreateStudent.useCase';

describe('Create Student Use Case', () => {
  let studentsRepository: StudentsRepositoryInMemory;
  let levelsRepository: LevelsRepositoryInMemory;
  let createStudentUseCase: CreateStudentUseCase;

  beforeEach(() => {
    studentsRepository = new StudentsRepositoryInMemory();
    levelsRepository = new LevelsRepositoryInMemory();
    createStudentUseCase = new CreateStudentUseCase(
      studentsRepository,
      levelsRepository,
    );
  });

  it('should be able to create a new student', async () => {
    const validLevelId = levelsRepository.validId;

    const sut = await createStudentUseCase.execute({
      level_id: validLevelId,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+5511999999999',
      password: '**********',
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });

  it('should be able to create a new student not passing a level_id', async () => {
    const sut = await createStudentUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+5511999999999',
      password: '**********',
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });

  it('should not be able to create a new student passing an invalid level_id', async () => {
    const invalidLevelId = uuid();

    const sut = createStudentUseCase.execute({
      level_id: invalidLevelId,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+5511999999999',
      password: '**********',
    });

    expect(sut).rejects.toThrowError('Level was not found.');
  });
});
