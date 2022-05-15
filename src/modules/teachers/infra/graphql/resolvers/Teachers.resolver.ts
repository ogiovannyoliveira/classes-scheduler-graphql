import { Resolver, Query } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { Teacher } from '../../typeorm/entities/Teacher';

@Resolver()
class TeachersResolver {  
  @Query(() => [Teacher])
  teachers(): Teacher[] {
    return [
      {
        id: uuid(),
        name: 'Teacher Name',
        email: 'teacher@organization.com',
        password: 'kadj30i-0sca9-q3=',
        created_at: new Date(),
        updated_at: null,
      }
    ];
  }
}

export { TeachersResolver }