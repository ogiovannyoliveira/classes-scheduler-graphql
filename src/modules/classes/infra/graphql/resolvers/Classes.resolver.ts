import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Roles } from '~shared/decorators/Roles.decorator';
import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';
import { RolesGuard } from '~shared/guards/Roles.guard';
import { AuthPermissions } from '~shared/modules/auth/infra/abstracts/Auth';

import { CreateClassUseCase } from '~modules/classes/useCases/createClass/CreateClass.useCase';

import { CreateClassInput } from '../inputs/CreateClass.input';
import { ClassInterface } from '../interfaces/ClassInterface';

@Resolver()
class ClassesResolver {
  constructor(private createClassUseCase: CreateClassUseCase) {}

  // @Roles(AuthPermissions.TEACHER)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @Mutation(() => ClassInterface)
  async createClass(
    @Args('input') input: CreateClassInput,
  ): Promise<ClassInterface> {
    const classy = await this.createClassUseCase.execute(input);

    return classy;
  }
}

export { ClassesResolver };
