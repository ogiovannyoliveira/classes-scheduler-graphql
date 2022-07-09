import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAuthRepository } from '~shared/modules/auth/repositories/IAuthRepository';

import { Authentication, AuthProviders } from '../entities/Auth';

class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(Authentication)
    private repository: Repository<Authentication>,
  ) {}

  async existsBySocialIdAndProvider(
    social_id: string,
    provider: AuthProviders,
  ): Promise<boolean> {
    const [{ exists }] = await this.repository.query(
      `SELECT EXISTS(
        SELECT 1 FROM auth.auth auth 
        WHERE auth.social_id = $1 AND auth.provider = $1
      )`,
      [social_id, provider],
    );

    return exists;
  }

  async findByUserIdAndProvider(
    id: string,
    provider: AuthProviders,
  ): Promise<Authentication> {
    return this.repository.findOne({
      where: { id, provider },
    });
  }
}

export { AuthRepository };
