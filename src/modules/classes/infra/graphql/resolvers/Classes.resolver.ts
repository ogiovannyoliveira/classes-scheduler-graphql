import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateClassUseCase } from '~modules/classes/useCases/createClass/CreateClass.useCase';

import { CreateClassInput } from '../inputs/CreateClass.input';
import { ClassInterface } from '../interfaces/ClassInterface';

@Resolver()
class ClassesResolver {
  constructor(private createClassUseCase: CreateClassUseCase) {}

  @Mutation(() => ClassInterface)
  async createClass(
    @Args('input') input: CreateClassInput,
  ): Promise<ClassInterface> {
    const classy = await this.createClassUseCase.execute(input);

    return classy;
  }
}

export { ClassesResolver };
