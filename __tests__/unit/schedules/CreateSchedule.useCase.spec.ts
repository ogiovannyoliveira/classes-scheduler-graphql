import { v4 as uuid } from 'uuid';

import { AppointmentsRepositoryInMemory } from '~modules/appointments/repositories/in-memory/AppointmentsRepositoryInMemory';
import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';
import { SchedulesRepositoryInMemory } from '~modules/schedules/repositories/in-memory/SchedulesRepositoryInMemory';
import { CreateScheduleUseCase } from '~modules/schedules/useCases/createSchedule/CreateSchedule.useCase';

describe('Create Schedule Use Case', () => {
  let schedulesRepository: SchedulesRepositoryInMemory;
  let appointmentsRepository: AppointmentsRepositoryInMemory;
  let classesRepository: ClassesRepositoryInMemory;
  let createScheduleUseCase: CreateScheduleUseCase;

  beforeEach(() => {
    schedulesRepository = new SchedulesRepositoryInMemory();
    appointmentsRepository = new AppointmentsRepositoryInMemory();
    classesRepository = new ClassesRepositoryInMemory();
    createScheduleUseCase = new CreateScheduleUseCase(
      schedulesRepository,
      appointmentsRepository,
      classesRepository,
    );
  });

  it('should be able to create a new schedule', async () => {
    const validAppointmentId = appointmentsRepository.validId;
    const validClassId = classesRepository.validId;

    const sut = await createScheduleUseCase.execute({
      appointment_id: validAppointmentId,
      class_id: validClassId,
      student_id: uuid(),
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });

  it('should not be able to create a new schedule passing an invalid appointment_id or class_id', async () => {
    const invalidAppointmentId = uuid();
    const validClassId = classesRepository.validId;

    const sut = createScheduleUseCase.execute({
      appointment_id: invalidAppointmentId,
      class_id: validClassId,
      student_id: uuid(),
    });

    expect(sut).rejects.toThrowError('Invalid appointment or class id');
  });
});
