import { ISchedulesRepository } from '../ISchedulesRepository';

class SchedulesRepositoryInMemory implements ISchedulesRepository {
  async create(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { SchedulesRepositoryInMemory };
