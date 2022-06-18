import { Level } from '~modules/levels/infra/typeorm/entities/Level';

import { ILevelsRepository } from '../ILevelsRepository';

class LevelsRepositoryInMemory implements ILevelsRepository {
  get validId(): string {
    return '642d4839-546b-4eac-a0f6-67001161bc86';
  }

  private levels: Level[] = [
    {
      id: this.validId,
      name: 'Random Level Name',
      ordering: 1,
      created_at: new Date(),
      updated_at: null,
    },
  ];

  async findById(id: string): Promise<Level> {
    const level = this.levels.find((level) => level.id === id);

    return level;
  }

  async existsById(id: string): Promise<boolean> {
    const levelExists = this.levels.some((level) => level.id === id);

    return levelExists;
  }

  async findLowest(): Promise<Level> {
    const [lowestLevel] = this.levels.sort((a, b) => a.ordering - b.ordering);

    return lowestLevel;
  }
}

export { LevelsRepositoryInMemory };
