import { v4 as uuid } from 'uuid';

import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { AppointmentExistsByClassAndIntervalDTO } from '~modules/appointments/dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentDTO } from '~modules/appointments/dtos/CreateAppointment.dto';
import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';

import { IAppointmentsRepository } from '../IAppointmentsRepository';

class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
  appointments: Appointment[] = [];

  async create({
    class_id,
    responsible_id,
    starts_at,
    finishes_at,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      class_id,
      responsible_id,
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

  async findByTeacherIdAndDate(
    teacher_id: string,
    date: string,
    pagination: PaginationOutput,
  ): Promise<{ data: Appointment[]; total: number }> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.responsible_id === teacher_id &&
        appointment.starts_at.toDateString() === date,
    );

    const total = appointments.length;
    const sumToCut = pagination.skip + pagination.take;

    const data = appointments.slice(
      pagination.skip,
      sumToCut > total ? total : sumToCut,
    );

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
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.responsible_id === teacher_id &&
        appointment.starts_at >= new Date(initial_date) &&
        appointment.starts_at <= new Date(final_date),
    );

    return appointments;
  }
}

export { AppointmentsRepositoryInMemory };
