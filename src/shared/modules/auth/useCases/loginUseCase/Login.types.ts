import { AuthPermissions, AuthProviders } from '../../infra/abstracts/Auth';

type LoginType = {
  provider: AuthProviders;
  social_id?: string;
  email: string;
  password: string;
};

type CredentialType = {
  user: {
    id: string;
    social_id?: string;
    provider: AuthProviders;
    permission: AuthPermissions;
  };
  access_token: string;
  expires_at: Date;
};

export { LoginType, CredentialType };
