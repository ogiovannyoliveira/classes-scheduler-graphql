import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

import { JwtAuthGuard } from '~shared/guards/JwtAuth.guard';
import { LoginUseCase } from '~shared/modules/auth/useCases/loginUseCase/Login.useCase';

import { AuthPermissions, AuthProviders } from '../../abstracts/Auth';
import { LoginInput } from '../inputs/Login.input';
import { AuthInterface } from '../interfaces/AuthInterface';
import { CredentialInterface } from '../interfaces/CredentialInterface';

@Resolver()
class AuthResolver {
  constructor(private loginUseCase: LoginUseCase) {}

  @Mutation(() => CredentialInterface)
  async loginStudent(
    @Args('input') input: LoginInput,
  ): Promise<CredentialInterface> {
    const loggedIn = await this.loginUseCase.execute(
      AuthPermissions.STUDENT,
      input,
    );

    return loggedIn;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CredentialInterface)
  async loginTeacher(
    @Args('input') input: LoginInput,
  ): Promise<CredentialInterface> {
    return {
      user: {
        id: randomUUID(),
        permission: AuthPermissions.TEACHER,
        provider: AuthProviders.LOCAL,
        social_id: null,
      },
      access_token: 'some-token',
      expires_at: new Date(),
    };
  }

  @Mutation(() => CredentialInterface)
  async loginAdmin(
    @Args('input') input: LoginInput,
  ): Promise<CredentialInterface> {
    return {
      user: {
        id: randomUUID(),
        permission: AuthPermissions.ADMIN,
        provider: AuthProviders.LOCAL,
        social_id: null,
      },
      access_token: 'some-token',
      expires_at: new Date(),
    };
  }
}

export { AuthResolver };
