import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

import { AppointmentInterface } from '../interfaces/AppointmentInterface';

@Resolver()
class AppointmentsResolver {
  @Mutation(() => [AppointmentInterface])
  appointments(): AppointmentInterface[] {
    return [
      {
        id: uuid(),
        class_id: uuid(),
        starts_at: new Date(),
        finishes_at: new Date(),
        created_at: new Date(),
        updated_at: null,
      },
    ];
  }
}

export { AppointmentsResolver };
