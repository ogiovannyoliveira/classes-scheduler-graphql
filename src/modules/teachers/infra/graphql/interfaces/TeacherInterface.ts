import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractTeacher } from '../../abstracts/Teacher';

@ObjectType()
class TeacherInterface implements AbstractTeacher {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  password: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}

export { TeacherInterface };
