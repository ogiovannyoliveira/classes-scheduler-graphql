import {
  Authentication,
  AuthProviders,
} from '~shared/modules/auth/infra/typeorm/entities/Auth';

import { IAuthRepository } from '../IAuthRepository';

class AuthRepositoryInMemory implements IAuthRepository {
  private authentications: Authentication[] = [];

  async existsBySocialIdAndProvider(
    social_id: string,
    provider: AuthProviders,
  ): Promise<boolean> {
    const exists = this.authentications.some(
      (auth) => auth.social_id === social_id && auth.provider === provider,
    );

    return exists;
  }

  async findByUserIdAndProvider(
    id: string,
    provider: AuthProviders,
  ): Promise<Authentication> {
    const auth = this.authentications.find(
      (auth) => auth.id === id && auth.provider === provider,
    );

    return auth;
  }
}

export { AuthRepositoryInMemory };
