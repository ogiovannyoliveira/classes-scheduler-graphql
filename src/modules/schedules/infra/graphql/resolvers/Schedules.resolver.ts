import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateScheduleUseCase } from '~modules/schedules/useCases/createSchedule/CreateSchedule.useCase';

import { CreateScheduleInput } from '../inputs/CreateSchedule.input';
import { ScheduleInterface } from '../interfaces/ScheduleInterface';

@Resolver()
class SchedulesResolver {
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}

  @Mutation(() => ScheduleInterface)
  async createSchedule(
    @Args('input') input: CreateScheduleInput,
  ): Promise<ScheduleInterface> {
    const schedule = await this.createScheduleUseCase.execute(input);

    return schedule;
  }
}

export { SchedulesResolver };
