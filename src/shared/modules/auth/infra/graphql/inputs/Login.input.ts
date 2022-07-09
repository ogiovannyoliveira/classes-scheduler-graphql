import { Field, InputType } from '@nestjs/graphql';

import { AuthProviders } from '../../abstracts/Auth';

@InputType()
class LoginInput {
  @Field({ defaultValue: AuthProviders.LOCAL })
  provider: AuthProviders;

  @Field()
  email: string;

  @Field()
  password: string;
}

export { LoginInput };
