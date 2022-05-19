import { Module } from '@nestjs/common';

import { AppointmentsResolver } from './infra/graphql/resolvers/Appointments.resolver';

@Module({
  providers: [AppointmentsResolver],
})
export class AppointmentsModule {}
