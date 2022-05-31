import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { Class } from '../infra/typeorm/entities/Class';

interface IClassesRepository {
  create(data: CreateClassDTO): Promise<Class>;
  existsById(id: string): Promise<boolean>;
  findByIds(ids: string[]): Promise<Class[]>;
}

export { IClassesRepository };
