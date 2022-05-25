import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentsResolver } from './infra/graphql/resolvers/Appointments.resolver';
import { Appointment } from './infra/typeorm/entities/Appointment';
import { AppointmentsRepository } from './infra/typeorm/repositories/AppointmentsRepository';
import { CreateAppointmentUseCase } from './useCases/createAppointment/CreateAppointment.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [
    AppointmentsResolver,
    CreateAppointmentUseCase,
    {
      provide: 'AppointmentsRepository',
      inject: [AppointmentsRepository],
      useClass: AppointmentsRepository,
    },
  ],
})
export class AppointmentsModule {}
