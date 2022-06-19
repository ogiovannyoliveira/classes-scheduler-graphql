import { Module } from '@nestjs/common';

@Module({
  providers: [
    // {
    //   provide: 'ScheduleRepository',
    //   inject: [SchedulesRepository],
    //   useClass: SchedulesRepository,
    // },
  ],
})
export class ScheduleModule {}
