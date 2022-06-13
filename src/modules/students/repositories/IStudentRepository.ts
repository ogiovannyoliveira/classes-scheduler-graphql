import { CreateStudentDTO } from '../dtos/CreateStudent.dto';
import { Student } from '../infra/typeorm/entities/Student';

interface IStudentRepository {
  create(data: CreateStudentDTO): Promise<Student>;
}

export { IStudentRepository };
