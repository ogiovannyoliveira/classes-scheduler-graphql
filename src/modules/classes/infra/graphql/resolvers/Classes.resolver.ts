import { Resolver, Query } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { Class } from '../../typeorm/entities/Class';

@Resolver()
class ClassesResolver {  
  @Query(() => [Class])
  classes(): Class[] {
    return [
      {
        id: uuid(),
        teacher_id: uuid(),
        minimum_level_id: uuid(),
        title: 'Random title',
        link: 'http://localhost',
        teacher: {
          id: uuid(),
          name: 'Teacher Name',
          email: 'teacher@organization.com',
          password: 'kadj30i-0sca9-q3=',
          created_at: new Date(),
          updated_at: null,
        },
        created_at: new Date(),
        updated_at: null,
      }
    ];
  }
}

export { ClassesResolver }