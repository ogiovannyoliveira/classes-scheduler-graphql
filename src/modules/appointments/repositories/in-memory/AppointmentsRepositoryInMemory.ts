import { v4 as uuid } from 'uuid';

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
}

export { AppointmentsRepositoryInMemory };
