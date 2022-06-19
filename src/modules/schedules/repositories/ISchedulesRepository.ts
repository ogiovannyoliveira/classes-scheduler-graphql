import { CreateScheduleDTO } from '../dtos/CreateSchedule.dto';
import { Schedule } from '../infra/typeorm/entities/Schedule';

interface ISchedulesRepository {
  create(params: CreateScheduleDTO): Promise<Schedule>;
}

export { ISchedulesRepository };
