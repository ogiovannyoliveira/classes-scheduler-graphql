import { Level } from '../infra/typeorm/entities/Level';

interface ILevelsRepository {
  findById(id: string): Promise<Level>;
  existsById(id: string): Promise<boolean>;
  findLowest(): Promise<Level>;
}

export { ILevelsRepository };
