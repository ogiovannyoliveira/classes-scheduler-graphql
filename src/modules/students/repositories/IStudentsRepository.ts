import { CreateStudentDTO } from '../dtos/CreateStudent.dto';
import { Student } from '../infra/typeorm/entities/Student';

interface IStudentsRepository {
  create(data: CreateStudentDTO): Promise<Student>;
  findByEmail(email: string): Promise<Student>;
}

export { IStudentsRepository };
