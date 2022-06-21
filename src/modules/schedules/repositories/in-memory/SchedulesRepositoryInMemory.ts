import { v4 as uuid } from 'uuid';

import { CreateScheduleDTO } from '~modules/schedules/dtos/CreateSchedule.dto';
import { Schedule } from '~modules/schedules/infra/typeorm/entities/Schedule';

import { ISchedulesRepository } from '../ISchedulesRepository';

class SchedulesRepositoryInMemory implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  async create({
    appointment_id,
    class_id,
    student_id,
  }: CreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();

    Object.assign(schedule, {
      id: uuid(),
      class_id,
      appointment_id,
      student_id,
      attended: null,
      created_at: new Date(),
      updated_at: null,
    });

    this.schedules.push(schedule);

    return schedule;
  }

  async findTotalSchedulesAtTheSamePeriodByStudentId(
    student_id: string,
    starts_at: Date,
    finishes_at: Date,
  ): Promise<number> {
    const schedules = this.schedules.filter(
      (schedule) => schedule.student_id === student_id,
    );

    const totalSchedules = schedules.length;

    return totalSchedules;
  }
}

export { SchedulesRepositoryInMemory };
