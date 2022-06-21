import { v4 as uuid } from 'uuid';

import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { AppointmentExistsByClassAndIntervalDTO } from '~modules/appointments/dtos/AppointmentExistsByClassAndInterval.dto';
import { CreateAppointmentDTO } from '~modules/appointments/dtos/CreateAppointment.dto';
import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { TeachersRepositoryInMemory } from '~modules/teachers/repositories/in-memory/TeachersRepositoryInMemory';

import { IAppointmentsRepository } from '../IAppointmentsRepository';

class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
  get validId(): string {
    return '642d4839-546b-4eac-a0f6-67001161bc86';
  }

  get validClassId(): string {
    const classy = new ClassesRepositoryInMemory();

    return classy.validId;
  }

  get validTeacherId(): string {
    const teacher = new TeachersRepositoryInMemory();

    return teacher.validId;
  }

  private appointments: Appointment[] = [
    {
      id: this.validId,
      class_id: this.validClassId,
      responsible_id: this.validTeacherId,
      starts_at: new Date(),
      finishes_at: new Date(),
      created_at: new Date(),
      updated_at: null,
    },
  ];

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

  async existsById(id: string): Promise<boolean> {
    const exists = this.appointments.some(
      (appointment) => appointment.id === id,
    );

    return exists;
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

  async findById(id: string): Promise<Appointment> {
    const appointment = this.appointments.find(
      (appointment) => appointment.id === id,
    );

    return appointment;
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
