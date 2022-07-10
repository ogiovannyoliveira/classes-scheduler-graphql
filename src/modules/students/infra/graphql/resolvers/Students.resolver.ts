import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateStudentUseCase } from '~modules/students/useCases/CreateStudent/CreateStudent.useCase';

import { CreateStudentInput } from '../inputs/CreateStudent.input';
import { StudentInterface } from '../interfaces/StudentInterface';

@Resolver()
class StudentsResolver {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  @Mutation(() => StudentInterface)
  async createStudent(
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentInterface> {
    const student = await this.createStudentUseCase.execute(input);

    return student;
  }
}

export { StudentsResolver };
