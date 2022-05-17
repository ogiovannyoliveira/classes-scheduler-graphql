import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractLevel } from '../../abstracts/Level';

@ObjectType()
class LevelInterface implements AbstractLevel {
  @Field()
  id: string;

  @Field()
  ordering: number;

  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}

export { LevelInterface };
