import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { AbstractAppointment } from '../../abstracts/Appointment';

@Entity({ name: 'appointments' })
class Appointment implements AbstractAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @Column()
  responsible_id: string;

  @Column()
  starts_at: Date;

  @Column()
  finishes_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}

export { Appointment };
