import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';
import { Schedule } from '~modules/schedules/infra/typeorm/entities/Schedule';
import { ISchedulesRepository } from '~modules/schedules/repositories/ISchedulesRepository';

import { CreateScheduleType } from './CreateSchedule.type';

@Injectable()
class CreateScheduleUseCase {
  constructor(
    @Inject('SchedulesRepository')
    private readonly schedulesRepository: ISchedulesRepository,
    @Inject('AppointmentsRepository')
    private readonly appointmentsRepository: IAppointmentsRepository,
    @Inject('ClassesRepository')
    private readonly classesRepository: IClassesRepository,
  ) {}

  async execute({
    appointment_id,
    class_id,
    student_id,
  }: CreateScheduleType): Promise<Schedule> {
    const [validAppointment, isValidClassId] = await Promise.all([
      this.appointmentsRepository.findById(appointment_id),
      this.classesRepository.existsById(class_id),
    ]);

    if (!validAppointment || !isValidClassId) {
      throw new BadRequestException('Invalid appointment or class id');
    }

    // find schedule by student_id and start_at and end_at from appointment
    const hasScheduleAtSamePeriod =
      await this.schedulesRepository.findTotalSchedulesAtTheSamePeriodByStudentId(
        student_id,
        validAppointment.starts_at,
        validAppointment.finishes_at,
      );

    if (hasScheduleAtSamePeriod) {
      throw new BadRequestException(
        'Student already has a schedule at this time',
      );
    }

    const schedule = await this.schedulesRepository.create({
      appointment_id,
      class_id,
      student_id,
    });

    return schedule;
  }
}

export { CreateScheduleUseCase };
