import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateAppointmentInput {
  @Field()
  class_id: string;

  @Field()
  responsible_id: string;

  @Field()
  starts_at: Date;

  @Field()
  finishes_at: Date;
}

export { CreateAppointmentInput };
