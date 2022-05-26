import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppointmentExistsByClassAndIntervalDTO } from '~modules/appointments/dtos/AppointmentExistsByClassAndInterval.dto';
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

  async existsByClassAndInterval({
    class_id,
    responsible_id,
    starts_at,
    finishes_at,
  }: AppointmentExistsByClassAndIntervalDTO): Promise<boolean> {
    const [{ exists }] = await this.repository.query(
      `
      SELECT EXISTS (
        SELECT 1
          FROM appointments
          WHERE
            class_id = $1 AND
            class_id = $2 AND
            starts_at >= $3 AND
            finishes_at <= $4
      )
    `,
      [class_id, responsible_id, starts_at, finishes_at],
    );

    return exists;
  }
}

export { AppointmentsRepository };
