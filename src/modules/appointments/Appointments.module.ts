import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { ClassesRepository } from '~modules/classes/infra/typeorm/repositories/ClassesRepository';
import { FindClassesByIdsUseCase } from '~modules/classes/useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';

import { DateManipulationProviderModule } from '~providers/DateManipulationProvider/DateManipulation.module';

import { AppointmentsResolver } from './infra/graphql/resolvers/Appointments.resolver';
import { Appointment } from './infra/typeorm/entities/Appointment';
import { AppointmentsRepository } from './infra/typeorm/repositories/AppointmentsRepository';
import { CreateAppointmentUseCase } from './useCases/createAppointment/CreateAppointment.useCase';
import { FindAppointmentsByTeacherIdAndPeriodUseCase } from './useCases/findAppointmentsByTeacherAndPeriod/FindAppointmentsByTeacherAndPeriod.useCase';
import { FindAppointmentsByTeacherIdAndDateUseCase } from './useCases/findAppointmentsByTeacherIdAndDate/FindAppointmentsByTeacherIdAndDate.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Class]),
    DateManipulationProviderModule,
  ],
  providers: [
    AppointmentsResolver,
    CreateAppointmentUseCase,
    FindAppointmentsByTeacherIdAndDateUseCase,
    FindAppointmentsByTeacherIdAndPeriodUseCase,
    FindClassesByIdsUseCase,
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
