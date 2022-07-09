import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';

import { AuthPermissions, AuthProviders } from '../../abstracts/Auth';
import { LoginInput } from '../inputs/Login.input';
import { AuthInterface } from '../interfaces/AuthInterface';

@Resolver()
class AuthResolver {
  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthInterface)
  async login(@Args('input') input: LoginInput): Promise<AuthInterface> {
    return {
      id: 'some-uuid',
      user_id: 'some-uuid',
      social_id: 'some-uuid',
      provider: AuthProviders.GOOGLE,
      permission: AuthPermissions.STUDENT,
      created_at: new Date(),
      updated_at: null,
    };
  }
}

export { AuthResolver };
