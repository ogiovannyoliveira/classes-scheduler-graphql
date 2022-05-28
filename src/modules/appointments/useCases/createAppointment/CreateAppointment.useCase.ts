import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';
import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';

import { IDateManipulation } from '~providers/DateManipulationProvider/interfaces/IDateManipulation';

import { CreateAppointmentType } from './CreateAppointment.types';

@Injectable()
class CreateAppointmentUseCase {
  constructor(
    @Inject('DayjsProvider')
    private dayjsProvider: IDateManipulation,
    @Inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @Inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute({
    class_id,
    responsible_id,
    starts_at,
    finishes_at,
  }: CreateAppointmentType): Promise<Appointment> {
    const startingDateIsAfterEnding = this.dayjsProvider.isAfter(
      starts_at,
      finishes_at,
    );

    if (startingDateIsAfterEnding) {
      throw new UnprocessableEntityException(
        'An appointment cannot start after its finish.',
      );
    }

    const classExists = await this.classesRepository.existsById(class_id);

    if (!classExists) {
      throw new BadRequestException('A valid class must be provided.');
    }

    const appointmentExists =
      await this.appointmentsRepository.existsByClassAndInterval({
        class_id,
        responsible_id,
        starts_at,
        finishes_at,
      });

    if (appointmentExists) {
      throw new BadRequestException(
        'An appointment already scheduled at this time to this class and teacher.',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      class_id,
      responsible_id,
      starts_at,
      finishes_at,
    });

    return appointment;
  }
}

export { CreateAppointmentUseCase };
