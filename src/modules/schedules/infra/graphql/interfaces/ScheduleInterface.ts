import { Field, ObjectType } from '@nestjs/graphql';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { Student } from '~modules/students/infra/typeorm/entities/Student';

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

  @Field()
  attended?: boolean;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  /** related columns */
  @Field(() => Class)
  class?: Class;

  @Field(() => Appointment)
  appointment?: Appointment;

  @Field(() => Student)
  student?: Student;
}

export { ScheduleInterface };
