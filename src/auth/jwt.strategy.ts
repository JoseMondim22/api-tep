import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TU_CLAVE_SECRETA', // ¡IMPORTANTE! Debe ser la misma clave secreta que usaste en auth.module.ts
    });
  }

  async validate(payload: any) {
    // Esta función se ejecuta si el token es válido.
    // Lo que retornes aquí se adjuntará al objeto `request.user`.
    return { userId: payload.sub, username: payload.username };
  }
}