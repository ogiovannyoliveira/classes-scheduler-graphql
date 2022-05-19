import { CreateAppointmentUseCase } from '~modules/appointments/useCases/createAppointment/CreateAppointment.useCase';

describe('Create Appointment Use Case', () => {
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    createAppointmentUseCase = new CreateAppointmentUseCase();
  });

  it('should be able to create a new appointment', async () => {
    const returning = await createAppointmentUseCase.execute();

    expect(returning).toBe(true);
  });
});
