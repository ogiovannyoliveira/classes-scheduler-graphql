import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IClassesRepository } from '~modules/classes/repositories/IClassesRepository';

import { CreateClassInput } from '../../graphql/inputs/CreateClass.input';
import { Class } from '../entities/Class';

@Injectable()
class ClassesRepository implements IClassesRepository {
  constructor(
    @InjectRepository(Class)
    private repository: Repository<Class>,
  ) {}

  async create(data: CreateClassInput): Promise<Class> {
    const classy = this.repository.create(data);

    this.repository.save(classy);

    return classy;
  }
}

export { ClassesRepository };
