import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { AbstractLevel } from '../../abstracts/Level';

@Entity({ name: 'levels' })
class Level implements AbstractLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ordering: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}

export { Level };
