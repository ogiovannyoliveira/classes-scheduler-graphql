import { Field, ObjectType } from '@nestjs/graphql';

import { AppointmentInterface } from '~modules/appointments/infra/graphql/interfaces/AppointmentInterface';
import { ClassInterface } from '~modules/classes/infra/graphql/interfaces/ClassInterface';
import { StudentInterface } from '~modules/students/infra/graphql/interfaces/StudentInterface';

import { AbstractSchedule } from '../../abstracts/Schedule';

@ObjectType()
class ScheduleInterface implements AbstractSchedule {
  @Field()
  id: string;

  @Field()
  class_id: string;

  @Field()
  appointment_id: string;

  @Field()
  student_id: string;

  @Field({ nullable: true })
  attended?: boolean;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  /** related columns */
  @Field(() => ClassInterface)
  class?: ClassInterface;

  @Field(() => AppointmentInterface)
  appointment?: AppointmentInterface;

  @Field(() => StudentInterface)
  student?: StudentInterface;
}

export { ScheduleInterface };
