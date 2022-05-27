import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PaginationOutput } from '~shared/http/pipes/PaginationInput';

import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

import { FindAppointmentsByTeacherIdAndDateOutput } from './FindAppointmentsByTeacherIdAndDate.types';

@Injectable()
class FindAppointmentsByTeacherIdAndDateUseCase {
  constructor(
    @Inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute(
    teacher_id: string,
    date: string,
    pagination: PaginationOutput,
  ): Promise<FindAppointmentsByTeacherIdAndDateOutput> {
    const appointments =
      await this.appointmentsRepository.findByTeacherIdAndDate(
        teacher_id,
        date,
        pagination,
      );

    return appointments;
  }
}

export { FindAppointmentsByTeacherIdAndDateUseCase };
