import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { AppointmentExistsByClassAndIntervalDTO } from '../dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentDTO } from '../dtos/CreateAppointment.dto';
import { Appointment } from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  existsByClassAndInterval(
    params: AppointmentExistsByClassAndIntervalDTO,
  ): Promise<boolean>;
  findByTeacherIdAndDate(
    teacher_id: string,
    date: string,
    pagination: PaginationOutput,
  ): Promise<{ data: Appointment[]; total: number }>;
  findByTeacherIdAndPeriod(
    teacher_id: string,
    initial_date: string,
    final_date: string,
  ): Promise<Appointment[]>;
}

export { IAppointmentsRepository };
