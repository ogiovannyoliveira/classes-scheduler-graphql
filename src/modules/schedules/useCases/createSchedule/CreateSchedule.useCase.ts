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
    const [validAppointmentId, validClassId] = await Promise.all([
      this.appointmentsRepository.existsById(appointment_id),
      this.classesRepository.existsById(class_id),
    ]);

    if (!validAppointmentId || !validClassId) {
      throw new BadRequestException('Invalid appointment or class id');
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
