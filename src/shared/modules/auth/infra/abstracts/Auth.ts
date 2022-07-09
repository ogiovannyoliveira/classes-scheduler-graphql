enum AuthProviders {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  LOCAL = 'LOCAL',
}

enum AuthPermissions {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

abstract class AbstractAuth {
  id: string;
  user_id: string;
  social_id?: string;
  provider: AuthProviders;
  permission: AuthPermissions;
  created_at: Date;
  updated_at?: Date;
}

export { AbstractAuth, AuthProviders, AuthPermissions };
