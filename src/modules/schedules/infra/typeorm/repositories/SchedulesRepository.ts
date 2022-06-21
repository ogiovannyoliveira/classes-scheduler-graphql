import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateScheduleDTO } from '~modules/schedules/dtos/CreateSchedule.dto';
import { ISchedulesRepository } from '~modules/schedules/repositories/ISchedulesRepository';

import { Schedule } from '../entities/Schedule';

class SchedulesRepository implements ISchedulesRepository {
  constructor(
    @InjectRepository(Schedule)
    private repository: Repository<Schedule>,
  ) {}

  create({
    appointment_id,
    class_id,
    student_id,
  }: CreateScheduleDTO): Promise<Schedule> {
    const scheduleToCreate = this.repository.create({
      appointment_id,
      class_id,
      student_id,
    });

    const schedule = this.repository.save(scheduleToCreate);

    return schedule;
  }

  findTotalSchedulesAtTheSamePeriodByStudentId(
    student_id: string,
    starts_at: Date,
    finishes_at: Date,
  ): Promise<number> {
    const schedulesTotal = this.repository
      .createQueryBuilder('schedule')
      .leftJoin(
        'appointments',
        'appointment',
        'schedule.appointment_id = appointment.id',
      )
      .where('schedule.student_id = :student_id', {
        student_id,
      })
      .andWhere('appointment.starts_at = :starts_at', {
        starts_at,
      })
      .andWhere('appointment.finishes_at = :finishes_at', {
        finishes_at,
      })
      .getCount();

    return schedulesTotal;
  }
}

export { SchedulesRepository };
