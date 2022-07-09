// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from '@nestjs/graphql';

import { AuthPermissions, AuthProviders } from '../../abstracts/Auth';

@ObjectType()
class User {
  @Field()
  id: number;

  @Field({ nullable: true })
  social_id?: string;

  @Field()
  provider: AuthProviders;

  @Field()
  permission: AuthPermissions;
}

@ObjectType()
class CredentialInterface {
  @Field()
  user: User;

  @Field()
  access_token: string;

  @Field()
  expires_at: Date;
}

export { CredentialInterface };
