import { Field, ObjectType } from '@nestjs/graphql';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';

import { AbstractAppointment } from '../../abstracts/Appointment';

@ObjectType()
class AppointmentInterface implements AbstractAppointment {
  @Field()
  id: string;

  @Field()
  class_id: string;

  @Field()
  responsible_id: string;

  @Field()
  starts_at: Date;

  @Field()
  finishes_at: Date;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  responsible?: object;

  class?: Class;
}

export { AppointmentInterface };
