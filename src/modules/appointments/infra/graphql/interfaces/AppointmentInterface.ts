import { Field, ObjectType } from '@nestjs/graphql';

import { ClassInterface } from '~modules/classes/infra/graphql/interfaces/ClassInterface';
import { TeacherInterface } from '~modules/teachers/infra/graphql/interfaces/TeacherInterface';

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

  @Field(() => ClassInterface)
  class?: ClassInterface;

  // make dataloader and parent function
  @Field(() => TeacherInterface)
  responsible?: TeacherInterface;
}

export { AppointmentInterface };
