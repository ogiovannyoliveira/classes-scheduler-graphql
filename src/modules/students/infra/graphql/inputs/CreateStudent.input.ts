import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateStudentInput {
  @Field()
  level_id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}

export { CreateStudentInput };
