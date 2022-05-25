import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';

import { CreateAppointmentInput } from '../inputs/CreateAppointment.input';
import { AppointmentInterface } from '../interfaces/AppointmentInterface';

@Resolver()
class AppointmentsResolver {
  constructor(private createAppointmentUseCase: CreateAppointmentUseCase) {}

  @Mutation(() => AppointmentInterface)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
  ): Promise<AppointmentInterface> {
    const appointment = await this.createAppointmentUseCase.execute(input);

    console.log({ appointment });

    return appointment;
  }
}

export { AppointmentsResolver };
