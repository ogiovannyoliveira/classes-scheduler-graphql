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

  async create({
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
}

export { SchedulesRepository };
