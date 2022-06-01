import { v4 as uuid } from 'uuid';

import { Appointment } from '~modules/appointments/infra/typeorm/entities/Appointment';
import { AppointmentsRepositoryInMemory } from '~modules/appointments/repositories/in-memory/AppointmentsRepositoryInMemory';
import { FindAppointmentsByTeacherIdAndPeriodUseCase } from '~modules/appointments/useCases/findAppointmentsByTeacherAndPeriod/FindAppointmentsByTeacherAndPeriod.useCase';

describe('Find Appointments By Teacher Id And Period Use Case', () => {
  let appointmentsRepositoryInMemory: AppointmentsRepositoryInMemory;
  let findAppointmentsByTeacherIdAndPeriodUseCase: FindAppointmentsByTeacherIdAndPeriodUseCase;

  beforeEach(() => {
    appointmentsRepositoryInMemory = new AppointmentsRepositoryInMemory();
    findAppointmentsByTeacherIdAndPeriodUseCase =
      new FindAppointmentsByTeacherIdAndPeriodUseCase(
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

  it('should be able to filter appointments passing an initial and final dates', async () => {
    const validTeacherId = uuid();
    const now = new Date();
    const APPOINTMENTS_QUANTITY = 5;
    const A_DAY = 1000 * 60 * 60 * 24;
    const NOW_PLUS_FOUR_DAYS = new Date(now.getTime() + A_DAY * 4);

    await Promise.all(
      [...Array(APPOINTMENTS_QUANTITY)].map(async (_, index) =>
        appointmentFactory({
          responsible_id: validTeacherId,
          starts_at: new Date(now.getTime() + A_DAY * index),
        }),
      ),
    );

    const sut = await findAppointmentsByTeacherIdAndPeriodUseCase.execute(
      validTeacherId,
      now.toDateString(),
      NOW_PLUS_FOUR_DAYS.toDateString(),
    );

    expect(sut).toHaveLength(4);
  });
});
