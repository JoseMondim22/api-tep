import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Simulación de validación de usuario
  async validateUser(username: string, pass: string): Promise<any> {
    // En un proyecto real, aquí consultarías la base de datos de usuarios.
    if (username === 'testuser' && pass === 'password') {
      // No devuelvas la contraseña en el objeto de resultado
      const { pass, ...result } = { username: 'testuser', pass: 'password', userId: 1 };
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}