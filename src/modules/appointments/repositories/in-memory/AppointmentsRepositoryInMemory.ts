import { IAppointmentsRepository } from '../IAppointmentsRepository';

class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
  create(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export { AppointmentsRepositoryInMemory };
