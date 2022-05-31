import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';
import { TeachersRepositoryInMemory } from '~modules/teachers/repositories/in-memory/TeachersRepositoryInMemory';
import { FindTeachersByIdsUseCase } from '~modules/teachers/useCases/findTeachersByIds/FindTeachersByIds.useCase';

describe('Find Teachers By Ids Use Case', () => {
  let teachersRepositoryInMemory: TeachersRepositoryInMemory;
  let findTeachersByIdsUseCase: FindTeachersByIdsUseCase;

  async function teachersFactory({
    name = 'Some name',
    email = 'someemail@any.com',
    password = '123456',
  }): Promise<Teacher> {
    return teachersRepositoryInMemory.create({
      name,
      email,
      password,
    });
  }

  beforeEach(() => {
    teachersRepositoryInMemory = new TeachersRepositoryInMemory();
    findTeachersByIdsUseCase = new FindTeachersByIdsUseCase(
      teachersRepositoryInMemory,
    );
  });

  it('should be able to list all teachers passing valid ids', async () => {
    const validIds = ['', '', ''];

    const teachers = await Promise.all(
      validIds.map(async () => teachersFactory({})),
    );

    validIds.forEach((_, index) => {
      validIds[index] = teachers[index].id;
    });

    const sut = await findTeachersByIdsUseCase.execute(validIds);

    expect(sut.length).toBe(validIds.length);
  });
});
