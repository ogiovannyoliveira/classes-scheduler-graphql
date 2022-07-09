import { Authentication, AuthProviders } from '../infra/typeorm/entities/Auth';

interface IAuthRepository {
  existsBySocialIdAndProvider(
    social_id: string,
    provider: AuthProviders,
  ): Promise<boolean>;
  findByUserIdAndProvider(
    id: string,
    provider: AuthProviders,
  ): Promise<Authentication>;
}

export { IAuthRepository };
