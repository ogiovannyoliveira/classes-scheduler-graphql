import { v4 as uuid } from 'uuid';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { AppointmentsRepositoryInMemory } from '~modules/appointments/repositories/in-memory/AppointmentsRepositoryInMemory';
import { FindAppointmentsByTeacherIdAndDateUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherIdAndDate/FindAppointmentsByTeacherIdAndDate.useCase';

describe('Find Appointments By Teacher Id And Date Use Case', () => {
  let appointmentsRepositoryInMemory: AppointmentsRepositoryInMemory;
  let findAppointmentsByTeacherIdAndDateUseCase: FindAppointmentsByTeacherIdAndDateUseCase;

  beforeEach(() => {
    appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();
    findAppointmentsByTeacherIdAndDateUseCase =
      new FindAppointmentsByTeacherIdAndDateUseCase(
        appointmentsRepositoryInMemory,
      );
  });

  async function appointmentFactory({
    responsible_id = uuid(),
    class_id = uuid(),
    starts_at = new Date(),
    finishes_at = new Date(),
  }): Promise<Appointment> {
    return appointmentsRepositoryInMemory.create({
      class_id,
      responsible_id,
      starts_at,
      finishes_at,
    });
  }

  it('should be able to filter appointments passing a teacher and date', async () => {
    const validTeacherId = uuid();
    const now = new Date();
    const APPOINTMENTS_QUANTITY = 5;

    await Promise.all(
      [...Array(APPOINTMENTS_QUANTITY)].map(async () =>
        appointmentFactory({ responsible_id: validTeacherId }),
      ),
    );

    const sut = await findAppointmentsByTeacherIdAndDateUseCase.execute(
      validTeacherId,
      now.toDateString(),
      {
        skip: 0,
        take: 2,
      },
    );

    expect(sut.total).toBe(APPOINTMENTS_QUANTITY);
    expect(sut.data).toHaveLength(2);
    expect(sut.data[0].responsible_id).toBe(validTeacherId);
    expect(sut.data[1].responsible_id).toBe(validTeacherId);
  });
});
