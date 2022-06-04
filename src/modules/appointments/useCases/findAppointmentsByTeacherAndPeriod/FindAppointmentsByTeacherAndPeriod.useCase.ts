import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

import { IDateManipulation } from '~providers/DateManipulationProvider/interfaces/IDateManipulation';

@Injectable()
class FindAppointmentsByTeacherIdAndPeriodUseCase {
  constructor(
    @Inject('DayjsProvider')
    private dayjsProvider: IDateManipulation,
    @Inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute(
    teacher_id: string,
    initial_date: string,
    final_date: string,
  ): Promise<Appointment[]> {
    const MAXIMUM_DAYS = 30;
    const diffInDays = this.dayjsProvider.diffInDays(
      new Date(final_date),
      new Date(initial_date),
    );

    if (diffInDays > MAXIMUM_DAYS) {
      throw new BadRequestException(
        'The date range cannot be greater than 30 days.',
      );
    }

    const appointments =
      await this.appointmentsRepository.findByTeacherIdAndPeriod(
        teacher_id,
        initial_date,
        final_date,
      );

    return appointments;
  }
}

export { FindAppointmentsByTeacherIdAndPeriodUseCase };
