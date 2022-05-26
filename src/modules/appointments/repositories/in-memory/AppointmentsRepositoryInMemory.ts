import { v4 as uuid } from 'uuid';

import { AppointmentExistsByClassAndIntervalDTO } from '~modules/appointments/dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentInput } from '~modules/appointments/infra/graphql/inputs/CreateAppointment.input';
import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';

import { IAppointmentsRepository } from '../IAppointmentsRepository';

class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async create({
    class_id,
    starts_at,
    finishes_at,
  }: CreateAppointmentInput): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      class_id,
      starts_at,
      finishes_at,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.appointments.push(appointment);

    return appointment;
  }

  async existsByClassAndInterval({
    class_id,
    responsible_id,
    starts_at,
    finishes_at,
  }: AppointmentExistsByClassAndIntervalDTO): Promise<boolean> {
    const exists = this.appointments.some(
      (appointment) =>
        appointment.class_id === class_id &&
        appointment.responsible_id === responsible_id &&
        appointment.starts_at >= starts_at &&
        appointment.finishes_at <= finishes_at,
    );

    return exists;
  }
}

export { AppointmentsRepositoryInMemory };
