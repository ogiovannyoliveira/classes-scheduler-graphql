import { Resolver, Query } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { LevelInterface } from '../interfaces/LevelInterface';

@Resolver()
class LevelsResolver {
  @Query(() => [LevelInterface])
  levels(): LevelInterface[] {
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
