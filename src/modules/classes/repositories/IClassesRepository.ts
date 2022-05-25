import { CreateClassInput } from '../infra/graphql/inputs/CreateClass.input';
import { Class } from '../infra/typeorm/entities/Class';

interface IClassesRepository {
  create(data: CreateClassInput): Promise<Class>;
  existsById(id: string): Promise<boolean>;
}

export { IClassesRepository };
