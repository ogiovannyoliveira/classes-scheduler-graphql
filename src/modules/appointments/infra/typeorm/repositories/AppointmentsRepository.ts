import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

import { CreateAppointmentInput } from '../../graphql/inputs/CreateAppointment.input';
import { Appointment } from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private repository: Repository<Appointment>,
  ) {}

  async create(data: CreateAppointmentInput): Promise<Appointment> {
    const appointmentToCreate = this.repository.create(data);

    const appointment = this.repository.save(appointmentToCreate);

    return appointment;
  }
}

export { AppointmentsRepository };
