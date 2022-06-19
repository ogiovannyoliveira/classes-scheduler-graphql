import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { AppointmentsRepository } from '~modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { ClassesRepository } from '~modules/classes/infra/typeorm/repositories/ClassesRepository';

import { SchedulesResolver } from './infra/graphql/resolvers/Schedules.resolver';
import { Schedule } from './infra/typeorm/entities/Schedule';
import { SchedulesRepository } from './infra/typeorm/repositories/SchedulesRepository';
import { CreateScheduleUseCase } from './useCases/createSchedule/CreateSchedule.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Appointment, Class])],
  providers: [
    SchedulesResolver,
    CreateScheduleUseCase,
    {
      provide: 'SchedulesRepository',
      inject: [SchedulesRepository],
      useClass: SchedulesRepository,
    },
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
export class SchedulesModule {}
