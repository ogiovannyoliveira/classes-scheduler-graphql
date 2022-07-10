import { v4 as uuid } from 'uuid';

import {
  Authentication,
  AuthProviders,
} from '~shared/modules/auth/infra/typeorm/entities/Auth';

import { CreateAuthDTO } from '../../dtos/CreateAuth.dto';
import { IAuthRepository } from '../IAuthRepository';

class AuthRepositoryInMemory implements IAuthRepository {
  private authentications: Authentication[] = [];

  async create(data: CreateAuthDTO): Promise<Authentication> {
    const auth = new Authentication();

    Object.assign(auth, {
      id: uuid(),
      user_id: data.user_id,
      provider: data.provider,
      permission: data.permission,
      social_id: data?.social_id,
      created_at: new Date(),
      updated_at: null,
    });

    this.authentications.push(auth);

    return auth;
  }

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
