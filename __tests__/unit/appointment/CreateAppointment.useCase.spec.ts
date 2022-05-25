import { v4 as uuid } from 'uuid';

import { AppointmentsRepositoryInMemory } from '~modules/appointments/repositories/in-memory/AppointmentsRepositoryInMemory';
import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';

describe('Create Appointment Use Case', () => {
  let appointmentsRepositoryInMemory: AppointmentsRepositoryInMemory;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentsRepositoryInMemory,
    );
  });

  it('should be able to create a new appointment', async () => {
    const sut = await createAppointmentUseCase.execute({
      class_id: uuid(),
      starts_at: new Date(),
      finishes_at: new Date(),
    });

    expect(sut.id).not.toBeFalsy();
    expect(sut.created_at).not.toBeFalsy();
  });
});
