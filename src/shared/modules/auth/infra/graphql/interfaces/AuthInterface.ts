import { Field, ObjectType } from '@nestjs/graphql';

import {
  AbstractAuth,
  AuthProviders,
  AuthPermissions,
} from '../../abstracts/Auth';

@ObjectType()
class AuthInterface implements AbstractAuth {
  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field({ nullable: true })
  social_id?: string;

  @Field()
  provider: AuthProviders;

  @Field()
  permission: AuthPermissions;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}

export { AuthInterface };
