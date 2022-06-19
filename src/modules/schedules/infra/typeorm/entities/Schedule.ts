import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AbstractSchedule } from '../../abstracts/Schedule';

class Schedule implements AbstractSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @Column()
  appointment_id: string;

  @Column()
  student_id: string;

  @Column()
  attended?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export { Schedule };
