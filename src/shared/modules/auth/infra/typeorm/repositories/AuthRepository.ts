import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuthDTO } from '~shared/modules/auth/dtos/CreateAuth.dto';
import { IAuthRepository } from '~shared/modules/auth/repositories/IAuthRepository';

import { Authentication, AuthProviders } from '../entities/Auth';

class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(Authentication)
    private repository: Repository<Authentication>,
  ) {}

  create({
    user_id,
    provider,
    permission,
    social_id,
  }: CreateAuthDTO): Promise<Authentication> {
    const auth = this.repository.create({
      user_id,
      provider,
      permission,
      social_id,
    });

    const createdAuth = this.repository.save(auth);

    return createdAuth;
  }

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

  findByUserIdAndProvider(
    id: string,
    provider: AuthProviders,
  ): Promise<Authentication> {
    return this.repository.findOne({
      where: { id, provider },
    });
  }
}

export { AuthRepository };
