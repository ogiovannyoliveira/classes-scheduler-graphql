import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Roles } from '~shared/decorators/Roles.decorator';
import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';
import { RolesGuard } from '~shared/guards/Roles.guard';
import { AuthPermissions } from '~shared/modules/auth/infra/abstracts/Auth';

import { CreateScheduleUseCase } from '~modules/schedules/useCases/createSchedule/CreateSchedule.useCase';

import { CreateScheduleInput } from '../inputs/CreateSchedule.input';
import { ScheduleInterface } from '../interfaces/ScheduleInterface';

@Resolver()
class SchedulesResolver {
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}

  @Roles(AuthPermissions.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ScheduleInterface)
  async createSchedule(
    @Args('input') input: CreateScheduleInput,
  ): Promise<ScheduleInterface> {
    const schedule = await this.createScheduleUseCase.execute(input);

    return schedule;
  }
}

export { SchedulesResolver };
