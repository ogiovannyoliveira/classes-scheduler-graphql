import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { AuthPermissions } from '~shared/modules/auth/infra/abstracts/Auth';

export const ROLES_KEY = 'roles';
export type Role = AuthPermissions;

export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
