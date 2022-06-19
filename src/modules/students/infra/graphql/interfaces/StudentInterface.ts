import { Field, ObjectType } from '@nestjs/graphql';

import { StudentAbstract } from '../../abstracts/Student';

@ObjectType()
class StudentInterface implements StudentAbstract {
  @Field()
  id: string;

  @Field()
  level_id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  password: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}

export { StudentInterface };
