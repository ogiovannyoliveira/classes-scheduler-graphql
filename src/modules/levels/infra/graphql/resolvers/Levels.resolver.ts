import { Resolver, Query } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { Level } from '../../typeorm/entities/Level';

@Resolver()
class LevelsResolver {
  @Query(() => [Level])
  levels(): Level[] {
    return [
      {
        id: uuid(),
        ordering: 1,
        name: 'Teacher Name',
        created_at: new Date(),
        updated_at: null,
      },
    ];
  }
}

export { LevelsResolver };
