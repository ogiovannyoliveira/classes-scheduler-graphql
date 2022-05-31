import { CreateTeacherDTO } from '../dtos/CreateTeacher.dto';
import { Teacher } from '../infra/typeorm/entities/Teacher';

interface ITeachersRepository {
  create(data: CreateTeacherDTO): Promise<Teacher>;
  findByIds(ids: string[]): Promise<Teacher[]>;
}

export { ITeachersRepository };
