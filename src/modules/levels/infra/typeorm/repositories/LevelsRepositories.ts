import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ILevelsRepository } from '~modules/levels/repositories/ILevelsRepository';

import { Level } from '../entities/Level';

class LevelsRepositories implements ILevelsRepository {
  constructor(
    @InjectRepository(Level)
    private repository: Repository<Level>,
  ) {}

  async findById(id: string): Promise<Level> {
    const level = await this.repository.findOne({ where: { id } });

    return level;
  }
}

export { LevelsRepositories };
