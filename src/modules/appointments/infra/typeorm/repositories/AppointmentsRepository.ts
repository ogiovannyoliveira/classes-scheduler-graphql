import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { AppointmentExistsByClassAndIntervalDTO } from '~modules/appointments/dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentDTO } from '~modules/appointments/dtos/CreateAppointment.dto';
import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

import { Appointment } from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private repository: Repository<Appointment>,
  ) {}

  async create({
    class_id,
    responsible_id,
    starts_at,
    finishes_at,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentToCreate = this.repository.create({
      class_id,
      responsible_id,
      starts_at,
      finishes_at,
    });

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

  async findByTeacherIdAndDate(
    teacher_id: string,
    date: string,
    pagination: PaginationOutput,
  ): Promise<{ data: Appointment[]; total: number }> {
    const [data, total] = await this.repository
      .createQueryBuilder('appointment')
      .where('appointment.responsible_id = :teacher_id', {
        teacher_id,
      })
      .where('appointment.starts_at::DATE = :date', {
        date,
      })
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();

    return {
      data,
      total,
    };
  }

  async findByTeacherIdAndPeriod(
    teacher_id: string,
    initial_date: string,
    final_date: string,
  ): Promise<Appointment[]> {
    const appointments = await this.repository
      .createQueryBuilder('appointment')
      .where('appointment.responsible_id = :teacher_id', {
        teacher_id,
      })
      .where(
        'appointment.starts_at::DATE BETWEEN :initial_date AND :final_date',
        {
          initial_date,
          final_date,
        },
      )
      .getMany();

    return appointments;
  }
}

export { AppointmentsRepository };
