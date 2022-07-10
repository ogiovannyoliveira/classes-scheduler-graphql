import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

import { StudentAbstract } from '../../abstracts/Student';

@Entity({ name: 'students' })
class Student implements StudentAbstract {
  @PrimaryGeneratedColumn('uuid')
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
