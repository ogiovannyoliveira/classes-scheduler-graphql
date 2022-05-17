import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateClassUseCase } from '~modules/classes/useCases/createClass/CreateClass.useCase';

import { Class } from '../../typeorm/entities/Class';
import { CreateClassInput } from '../inputs/CreateClass.input';

@Resolver()
class ClassesResolver {
  constructor(private createClassUseCase: CreateClassUseCase) {}

  @Mutation(() => Class)
  async createClass(@Args('input') input: CreateClassInput): Promise<Class> {
    const classy = await this.createClassUseCase.execute(input);

    return classy;
  }
}

export { ClassesResolver };
