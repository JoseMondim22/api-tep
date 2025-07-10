import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Simulación de validación de usuario
 async validateUser(username: string, pass: string): Promise<any> {
  // 1. Simula una base de datos de usuarios con un array
  const users = [
    { userId: 1, username: 'vip', password: 'password' },
    { userId: 2, username: 'regular', password: 'password123' },
  ];

  // 2. Busca al usuario por su nombre de usuario
  const user = users.find(u => u.username === username);

  // 3. Si el usuario existe y la contraseña es correcta, devuélvelo
  if (user && user.password === pass) {
    const { password, ...result } = user;
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