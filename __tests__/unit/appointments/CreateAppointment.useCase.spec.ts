import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { AppointmentsRepositoryInMemory } from '~modules/appointments/repositories/in-memory/AppointmentsRepositoryInMemory';
import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';
import { ClassesRepositoryInMemory } from '~modules/classes/repositories/in-memory/ClassesRepositoryInMemory';

import { DayjsFake } from '~providers/DateManipulationProvider/fakes/DayjsFake';
import { IDateManipulation } from '~providers/DateManipulationProvider/interfaces/IDateManipulation';

describe('Create Appointment Use Case', () => {
  let dayjsFaker: IDateManipulation;
  let appointmentsRepositoryInMemory: AppointmentsRepositoryInMemory;
  let classesRepositoryInMemory: ClassesRepositoryInMemory;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    dayjsFaker = new DayjsFake();
    appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();
    classesRepositoryInMemory = new ClassesRepositoryInMemory();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      dayjsFaker,
      appointmentsRepositoryInMemory,
      classesRepositoryInMemory,
    );
  });

  it('should be able to create a new appointment', async () => {
    const validClassId = classesRepositoryInMemory.validId;
    const validTeacherId = uuid();
    const now = new Date();

    const sut = await createAppointmentUseCase.execute({
      class_id: validClassId,
      responsible_id: validTeacherId,
      starts_at: now,
      finishes_at: new Date(now.setHours(now.getHours() + 1)),
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });

  it('should not be able to create a new appointment if starting date is after ending date', async () => {
    const validClassId = classesRepositoryInMemory.validId;
    const validResponsibleId = uuid();
    const now = new Date();
    const startingDate = new Date(now.setHours(2));
    const endingDate = new Date(now.setHours(1));

    const sut = createAppointmentUseCase.execute({
      class_id: validClassId,
      responsible_id: validResponsibleId,
      starts_at: startingDate,
      finishes_at: endingDate,
    });

    await expect(sut).rejects.toEqual(
      new UnprocessableEntityException(
        'An appointment cannot start after its finish.',
      ),
    );
  });

  it('should not be able to create a new appointment if an invalid class is provided', async () => {
    const now = new Date();
    const invalidClassId = uuid();
    const validResponsibleId = uuid();

    const sut = createAppointmentUseCase.execute({
      class_id: invalidClassId,
      responsible_id: validResponsibleId,
      starts_at: now,
      finishes_at: new Date(now.setHours(now.getHours() + 1)),
    });

    await expect(sut).rejects.toEqual(
      new BadRequestException('A valid class must be provided.'),
    );
  });

  it('should not be able to create a new appointment if there is another at the same time', async () => {
    const now = new Date();
    const validClassId = classesRepositoryInMemory.validId;
    const validResponsibleId = uuid();

    await appointmentsRepositoryInMemory.create({
      class_id: validClassId,
      responsible_id: validResponsibleId,
      starts_at: now,
      finishes_at: new Date(now.setHours(now.getHours() + 1)),
    });

    const sut = createAppointmentUseCase.execute({
      class_id: validClassId,
      responsible_id: validResponsibleId,
      starts_at: now,
      finishes_at: new Date(now.setHours(now.getHours() + 1)),
    });

    await expect(sut).rejects.toEqual(
      new BadRequestException(
        'An appointment already scheduled at this time to this class and teacher.',
      ),
    );
  });
});
