import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Entity({ name: 'teachers' })
class Teacher {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;
  
  @Field()
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Field()
  @CreateDateColumn()
  created_at: Date;
  
  @Field()
  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}

export { Teacher };
