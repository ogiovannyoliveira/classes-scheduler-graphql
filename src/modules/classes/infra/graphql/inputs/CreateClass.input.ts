import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateClassInput {
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
}

export { CreateClassInput };
