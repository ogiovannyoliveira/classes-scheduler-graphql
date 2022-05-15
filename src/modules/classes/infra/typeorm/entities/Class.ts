import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Field, ObjectType } from '@nestjs/graphql';

import { Teacher } from '~modules/teachers/infra/typeorm/entities/Teacher';

@ObjectType()
@Entity({ name: 'classes' })
class Class {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  minimum_level_id: string;
  
  @Field()
  @Column()
  teacher_id: string;
  
  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  link: string;
  
  @Field()
  @CreateDateColumn()
  created_at: Date;
  
  @Field()
  @UpdateDateColumn()
  updated_at?: Date;

  /** related columns */
  @Field(() => Teacher)
  teacher?: Teacher;

  constructor() {
    this.id ||= uuid();
  }
}

export { Class };
