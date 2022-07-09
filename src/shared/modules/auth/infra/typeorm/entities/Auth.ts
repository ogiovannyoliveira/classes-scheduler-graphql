import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  AbstractAuth,
  AuthProviders,
  AuthPermissions,
} from '../../abstracts/Auth';

@Entity({ schema: 'auth', name: 'auth' })
class Authentication implements AbstractAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ nullable: true })
  social_id?: string;

  @Column({ enum: AuthProviders })
  provider: AuthProviders;

  @Column({ enum: AuthPermissions })
  permission: AuthPermissions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export { Authentication, AuthProviders, AuthPermissions };
