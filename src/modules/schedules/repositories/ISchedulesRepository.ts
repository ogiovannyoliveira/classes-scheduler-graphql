import { CreateScheduleDTO } from '../dtos/CreateSchedule.dto';
import { Schedule } from '../infra/typeorm/entities/Schedule';

interface ISchedulesRepository {
  create(params: CreateScheduleDTO): Promise<Schedule>;
  findTotalSchedulesAtTheSamePeriodByStudentId(
    student_id: string,
    starts_at: Date,
    finishes_at: Date,
  ): Promise<number>;
}

export { ISchedulesRepository };
