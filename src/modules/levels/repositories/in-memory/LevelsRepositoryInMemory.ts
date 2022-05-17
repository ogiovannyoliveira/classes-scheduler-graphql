import { ILevelsRepository } from '../ILevelsRepository';

class LevelsRepositoryInMemory implements ILevelsRepository {
  async findById(): Promise<boolean> {
    return true;
  }
}

export { LevelsRepositoryInMemory };
