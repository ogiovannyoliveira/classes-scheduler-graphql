import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { AppointmentExistsByClassAndIntervalDTO } from '../dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentInput } from '../infra/graphql/inputs/CreateAppointment.input';
import { Appointment } from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: CreateAppointmentInput): Promise<Appointment>;
  existsByClassAndInterval(
    params: AppointmentExistsByClassAndIntervalDTO,
  ): Promise<boolean>;
  findByTeacherIdAndDate(
    teacher_id: string,
    date: string,
    pagination: PaginationOutput,
  ): Promise<{ data: Appointment[]; total: number }>;
}

export { IAppointmentsRepository };
