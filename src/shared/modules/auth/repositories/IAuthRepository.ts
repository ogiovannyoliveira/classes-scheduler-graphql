import { CreateAuthDTO } from '../dtos/CreateAuth.dto';
import { Authentication, AuthProviders } from '../infra/typeorm/entities/Auth';

interface IAuthRepository {
  create(data: CreateAuthDTO): Promise<Authentication>;
  existsBySocialIdAndProvider(
    social_id: string,
    provider: AuthProviders,
  ): Promise<boolean>;
  findById(id: string): Promise<Authentication>;
  findByUserIdAndProvider(
    id: string,
    provider: AuthProviders,
  ): Promise<Authentication>;
}

export { IAuthRepository };
