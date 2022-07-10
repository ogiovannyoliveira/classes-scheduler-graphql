import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(
    payload: JwtPayloadJSON,
  ): Promise<Partial<JwtPayloadJSON> & { id: string }> {
    const { user_id, sub: id, provider, social_id } = payload;

    return {
      id,
      user_id,
      provider,
      social_id,
    };
  }
}

export { JwtStrategy, JwtPayloadJSON };
