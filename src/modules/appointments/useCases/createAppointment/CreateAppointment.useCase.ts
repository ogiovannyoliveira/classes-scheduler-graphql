import { Inject, Injectable } from '@nestjs/common';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

import { CreateAppointmentType } from './CreateAppointment.types';

@Injectable()
class CreateAppointmentUseCase {
  constructor(
    @Inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    class_id,
    starts_at,
    finishes_at,
  }: CreateAppointmentType): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.create({
      class_id,
      starts_at,
      finishes_at,
    });

    console.log({ second: appointment });

    return appointment;
  }
}

export { CreateAppointmentUseCase };
