import { AuthPermissions, AuthProviders } from '../infra/abstracts/Auth';

type CreateAuthDTO = {
  user_id: string;
  social_id?: string;
  provider: AuthProviders;
  permission: AuthPermissions;
};

export { CreateAuthDTO };
