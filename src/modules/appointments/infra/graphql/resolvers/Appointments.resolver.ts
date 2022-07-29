import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { ValidatorPaginationParamsPipe } from 'src/shared/http/pipes/ValidatorPaginationParams.pipe';

import {
  PaginationInput,
  PaginationOutput,
} from '~shared//http/pipes/PaginationInput';
import { Roles } from '~shared/decorators/Roles.decorator';
import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';
import { RolesGuard } from '~shared/guards/Roles.guard';
import { ValidatorAmericanDateFormatParamPipe } from '~shared/http/pipes/ValidatorAmericanDateFormatParam.pipe';
import { AuthPermissions } from '~shared/modules/auth/infra/abstracts/Auth';

import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';
import { FindAppointmentsByTeacherIdAndPeriodUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherAndPeriod/FindAppointmentsByTeacherAndPeriod.useCase';
import { FindAppointmentsByTeacherIdAndDateUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherIdAndDate/FindAppointmentsByTeacherIdAndDate.useCase';
import { ClassInterface } from '~modules/classes/infra/graphql/interfaces/ClassInterface';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { TeacherInterface } from '~modules/teachers/infra/graphql/interfaces/TeacherInterface';

import { CreateAppointmentInput } from '../inputs/CreateAppointment.input';
import { AppointmentAndTotalInterface } from '../interfaces/AppointmentAndTotalInterface';
import { AppointmentInterface } from '../interfaces/AppointmentInterface';

@Resolver(() => AppointmentInterface)
class AppointmentsResolver {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private findAppointmentsByTeacherIdAndDateUseCase: FindAppointmentsByTeacherIdAndDateUseCase,
    private findAppointmentsByTeacherIdAndPeriodUseCase: FindAppointmentsByTeacherIdAndPeriodUseCase,
  ) {}

  @Roles(AuthPermissions.ADMIN, AuthPermissions.TEACHER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => AppointmentInterface)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
  ): Promise<AppointmentInterface> {
    const appointment = await this.createAppointmentUseCase.execute(input);

    return appointment;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AppointmentAndTotalInterface)
  async getAppointmentsByTeacherIdAndDate(
    @Args('teacher_id') teacher_id: string,
    @Args(
      { name: 'date', description: 'format YYYY-MM-DD' },
      ValidatorAmericanDateFormatParamPipe,
    )
    date: string,
    @Args(
      { name: 'pagination', nullable: true, type: () => PaginationInput },
      ValidatorPaginationParamsPipe,
    )
    paginate: PaginationOutput,
  ): Promise<AppointmentAndTotalInterface> {
    const appointments =
      await this.findAppointmentsByTeacherIdAndDateUseCase.execute(
        teacher_id,
        date,
        paginate,
      );

    return appointments;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AppointmentInterface])
  async getAppointmentsByTeacherIdAndPeriod(
    @Args('teacher_id') teacher_id: string,
    @Args(
      { name: 'initial_date', description: 'format YYYY-MM-DD' },
      ValidatorAmericanDateFormatParamPipe,
    )
    initial_date: string,
    @Args(
      { name: 'final_date', description: 'format YYYY-MM-DD' },
      ValidatorAmericanDateFormatParamPipe,
    )
    final_date: string,
  ): Promise<AppointmentInterface[]> {
    const appointments =
      await this.findAppointmentsByTeacherIdAndPeriodUseCase.execute(
        teacher_id,
        initial_date,
        final_date,
      );

    return appointments;
  }

  @ResolveField('class', () => ClassInterface)
  async class(
    @Parent() appointment: AppointmentInterface,
    @Context('ClassesLoader') classesLoader: DataLoader<string, Class>,
  ): Promise<Class> {
    const classes = await classesLoader.load(appointment.class_id);

    return classes;
  }

  @ResolveField('responsible', () => TeacherInterface)
  async responsible(
    @Parent() appointment: AppointmentInterface,
    @Context('TeachersLoader')
    teachersLoader: DataLoader<string, TeacherInterface>,
  ): Promise<TeacherInterface> {
    const teachers = await teachersLoader.load(appointment.responsible_id);

    return teachers;
  }
}

export { AppointmentsResolver };
