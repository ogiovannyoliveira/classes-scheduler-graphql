import { Inject, Injectable } from '@nestjs/common';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

@Injectable()
class FindAppointmentsByTeacherIdAndPeriodUseCase {
  constructor(
    @Inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute(
    teacher_id: string,
    initial_date: string,
    final_date: string,
  ): Promise<Appointment[]> {
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
