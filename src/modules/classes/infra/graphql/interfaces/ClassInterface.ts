import { Field, ObjectType } from '@nestjs/graphql';

import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';

import { AbstractClass } from '../../abstracts/Class';

@ObjectType()
class ClassInterface implements AbstractClass {
  @Field()
  id: string;

  @Field()
  minimum_level_id: string;

  @Field()
  teacher_id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  link: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  /** related columns */
  @Field(() => Teacher)
  teacher?: Teacher;
}

export { ClassInterface };
