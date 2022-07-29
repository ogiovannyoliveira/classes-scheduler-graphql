import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Roles } from '~shared/decorators/Roles.decorator';
import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';
import { RolesGuard } from '~shared/guards/Roles.guard';
import { AuthPermissions } from '~shared/modules/auth/infra/abstracts/Auth';

import { CreateStudentUseCase } from '~modules/students/useCases/CreateStudent/CreateStudent.useCase';

import { CreateStudentInput } from '../inputs/CreateStudent.input';
import { StudentInterface } from '../interfaces/StudentInterface';

@Resolver()
class StudentsResolver {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  @Roles(AuthPermissions.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => StudentInterface)
  async createStudent(
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentInterface> {
    const student = await this.createStudentUseCase.execute(input);

    return student;
  }
}

export { StudentsResolver };
