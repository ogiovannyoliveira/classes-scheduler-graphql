import { StudentsRepositoryInMemory } from '~modules/students/repositories/in-memory/StudentsRepositoryInMemory';
import { CreateStudentUseCase } from '~modules/students/useCases/CreateStudent/CreateStudent.useCase';

describe('Create Student Use Case', () => {
  let studentRepository: StudentsRepositoryInMemory;
  let createStudentUseCase: CreateStudentUseCase;

  beforeEach(() => {
    studentRepository = new StudentsRepositoryInMemory();
    createStudentUseCase = new CreateStudentUseCase(studentRepository);
  });

  it('should be able to create a new student', async () => {
    const sut = await createStudentUseCase.execute({
      level_id: '642d4839-546b-4eac-a0f6-67001161bc86',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+5511999999999',
      password: '**********',
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });
});
