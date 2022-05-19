import { IAppointmentsRepository } from '~modules/appointments/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  create(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export { AppointmentsRepository };
