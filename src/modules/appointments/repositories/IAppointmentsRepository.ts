import { CreateAppointmentInput } from '../infra/graphql/inputs/CreateAppointment.input';
import { Appointment } from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: CreateAppointmentInput): Promise<Appointment>;
}

export { IAppointmentsRepository };
