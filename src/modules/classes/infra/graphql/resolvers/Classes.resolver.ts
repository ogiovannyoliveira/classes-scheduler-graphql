import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { Class } from '../../typeorm/entities/Class';
import { CreateClassInput } from '../inputs/CreateClass.input';

@Resolver()
class ClassesResolver {
  @Mutation(() => Class)
  async createClass(@Args('input') input: CreateClassInput): Promise<Class> {
    return {
      id: uuid(),
      teacher_id: input.teacher_id,
      minimum_level_id: input.minimum_level_id,
      title: input.title,
      link: input.link,
      teacher: {
        id: input.teacher_id,
        name: 'Teacher Name',
        email: 'teacher@organization.com',
        password: 'kadj30i-0sca9-q3=',
        created_at: new Date(),
        updated_at: null,
      },
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export { ClassesResolver };
