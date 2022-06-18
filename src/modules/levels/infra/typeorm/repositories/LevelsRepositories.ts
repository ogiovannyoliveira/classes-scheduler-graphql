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

  async existsById(id: string): Promise<boolean> {
    const [{ exists }] = await this.repository.query(
      'SELECT EXISTS(SELECT 1 FROM levels WHERE levels.id = $1)',
      [id],
    );

    return exists;
  }

  async findLowest(): Promise<Level> {
    const level = await this.repository
      .createQueryBuilder('levels')
      .select('levels.*')
      .where('levels.ordering = (SELECT MIN(ordering) FROM levels)')
      .getOne();

    return level;
  }
}

export { LevelsRepositories };
