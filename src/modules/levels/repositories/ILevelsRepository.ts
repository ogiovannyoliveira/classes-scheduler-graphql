import { Level } from '../infra/typeorm/entities/Level';

interface ILevelsRepository {
  findById(id: string): Promise<Level>;
}

export { ILevelsRepository };
