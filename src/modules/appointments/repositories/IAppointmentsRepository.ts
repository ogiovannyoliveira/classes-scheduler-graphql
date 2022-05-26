import { AppointmentExistsByClassAndIntervalDTO } from '../dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentInput } from '../infra/graphql/inputs/CreateAppointment.input';
import { Appointment } from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: CreateAppointmentInput): Promise<Appointment>;
  existsByClassAndInterval(
    params: AppointmentExistsByClassAndIntervalDTO,
  ): Promise<boolean>;
}

export { IAppointmentsRepository };
