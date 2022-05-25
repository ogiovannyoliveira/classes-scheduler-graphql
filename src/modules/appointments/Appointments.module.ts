import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { ClassesRepository } from '~modules/classes/infra/typeorm/repositories/ClassesRepository';

import { DateManipulationProviderModule } from '~providers/DateManipulationProvider/DateManipulation.module';

import { AppointmentsResolver } from './infra/graphql/resolvers/Appointments.resolver';
import { Appointment } from './infra/typeorm/entities/Appointment';
import { AppointmentsRepository } from './infra/typeorm/repositories/AppointmentsRepository';
import { CreateAppointmentUseCase } from './useCases/createAppointment/CreateAppointment.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Class]),
    DateManipulationProviderModule,
  ],
  providers: [
    AppointmentsResolver,
    CreateAppointmentUseCase,
    {
      provide: 'AppointmentsRepository',
      inject: [AppointmentsRepository],
      useClass: AppointmentsRepository,
    },
    {
      provide: 'ClassesRepository',
      inject: [ClassesRepository],
      useClass: ClassesRepository,
    },
  ],
})
export class AppointmentsModule {}
