import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ValidatorPaginationParamsPipe } from 'src/shared/http/pipes/ValidatorPaginationParams.pipe';
import { v4 as uuid } from 'uuid';

import {
  PaginationInput,
  PaginationOutput,
} from '~shared//http/pipes/PaginationInput';
import { ValidatorAmericanDateFormatParamPipe } from '~shared/http/pipes/ValidatorAmericanDateFormatParam.pipe';

import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';
import { FindAppointmentsByTeacherIdAndDateUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherIdAndDate/FindAppointmentsByTeacherIdAndDate.useCase';

import { CreateAppointmentInput } from '../inputs/CreateAppointment.input';
import { AppointmentAndTotalInterface } from '../interfaces/AppointmentAndTotalInterface';
import { AppointmentInterface } from '../interfaces/AppointmentInterface';

@Resolver()
class AppointmentsResolver {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private findAppointmentsByTeacherIdAndDateUseCase: FindAppointmentsByTeacherIdAndDateUseCase,
  ) {}

  @Mutation(() => AppointmentInterface)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
  ): Promise<AppointmentInterface> {
    const appointment = await this.createAppointmentUseCase.execute(input);

    return appointment;
  }

  @Query(() => AppointmentAndTotalInterface)
  async getAppointmentsByTeacherIdAndDate(
    @Args('teacher_id') teacher_id: string,
    @Args('date', ValidatorAmericanDateFormatParamPipe) date: string,
    @Args(
      {
        name: 'pagination',
        nullable: true,
        type: () => PaginationInput,
      },
      ValidatorPaginationParamsPipe,
    )
    paginate: PaginationOutput,
  ): Promise<AppointmentAndTotalInterface> {
    const appointments =
      await this.findAppointmentsByTeacherIdAndDateUseCase.execute(
        teacher_id,
        date,
        paginate,
      );

    return appointments;
  }
}

export { AppointmentsResolver };
