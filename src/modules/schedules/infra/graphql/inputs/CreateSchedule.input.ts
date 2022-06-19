import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateScheduleInput {
  @Field()
  appointment_id: string;

  @Field()
  class_id: string;

  @Field()
  student_id: string;
}

export { CreateScheduleInput };
