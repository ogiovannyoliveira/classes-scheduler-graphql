import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StudentAbstract } from '../../abstracts/Student';

class Student implements StudentAbstract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  level_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export { Student };
