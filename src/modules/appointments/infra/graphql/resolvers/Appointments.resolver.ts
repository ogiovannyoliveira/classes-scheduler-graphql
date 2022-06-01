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
import { v4 as uuid } from 'uuid';

import {
  PaginationInput,
  PaginationOutput,
} from '~shared//http/pipes/PaginationInput';
import { ValidatorAmericanDateFormatParamPipe } from '~shared/http/pipes/ValidatorAmericanDateFormatParam.pipe';

import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';
import { FindAppointmentsByTeacherIdAndPeriodUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherAndPeriod/FindAppointmentsByTeacherAndPeriod.useCase';
import { FindAppointmentsByTeacherIdAndDateUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherIdAndDate/FindAppointmentsByTeacherIdAndDate.useCase';
import { ClassInterface } from '~modules/classes/infra/graphql/interfaces/ClassInterface';
import { Class } from '~modules/classes/infra/typeorm/entities/Class';
import { FindClassesByIdsUseCase } from '~modules/classes/useCases/FindClassesByIdsUseCase/FindClassesByIdsUseCase.useCase';
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
    private findClasses: FindClassesByIdsUseCase,
  ) {}

  @Mutation(() => AppointmentInterface)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
  ): Promise<AppointmentInterface> {
    const appointment = await this.createAppointmentUseCase.execute(input);

    return appointment;
  }

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
    // METHOD 1
    const classes = await classesLoader.load(appointment.class_id);

    return classes;

    // METHOD 2
    // const classes = await this.findClasses.execute([appointment.class_id]);

    // return classes[0];

    // METHOD 3
    // return {
    //   id: uuid(),
    //   minimum_level_id: uuid(),
    //   teacher_id: uuid(),
    //   title: '',
    //   description: '',
    //   link: '',
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // };
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
