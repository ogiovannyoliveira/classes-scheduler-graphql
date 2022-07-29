import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthPermissions } from '../infra/abstracts/Auth';
import { IAuthRepository } from '../repositories/IAuthRepository';

type JwtPayloadJSON = {
  user_id: string;
  provider: string;
  social_id: string;
  iat: string;
  exp: string;
  sub: string;
};

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('AuthRepository')
    private authRepository: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(
    payload: JwtPayloadJSON,
  ): Promise<
    Partial<JwtPayloadJSON> & { id: string; permission: AuthPermissions }
  > {
    const { user_id, sub: id, provider, social_id } = payload;

    const { permission } = await this.authRepository.findById(id);

    return {
      id,
      user_id,
      provider,
      social_id,
      permission,
    };
  }
}

export { JwtStrategy, JwtPayloadJSON };
