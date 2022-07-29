import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { JwtPayloadJSON } from '~shared/modules/auth/strategies/Jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return req;
  }

  handleRequest(err: Error, user: JwtPayloadJSON, info: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Authentication error');
    }

    return user;
  }
}
