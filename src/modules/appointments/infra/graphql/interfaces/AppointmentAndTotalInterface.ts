import { Field, ObjectType } from '@nestjs/graphql';

import { AppointmentInterface } from './AppointmentInterface';

@ObjectType()
class AppointmentAndTotalInterface {
  @Field(() => [AppointmentInterface])
  data: AppointmentInterface[];

  @Field(() => Number)
  total: number;
}

export { AppointmentAndTotalInterface };
