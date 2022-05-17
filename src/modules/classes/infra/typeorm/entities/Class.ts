import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { AbstractClass } from '../../abstracts/Class';

@Entity({ name: 'classes' })
class Class implements AbstractClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  minimum_level_id: string;

  @Column()
  teacher_id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}

export { Class };
