// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, Patch } from '@nestjs/common'; // Ya no se necesita UseGuards aquí
import { AuthService } from './auth.service';
import { FeatureFlagService } from 'feature-flag-service-tep';
// Ya no se necesita JwtAuthGuard aquí si no se usa en ninguna otra ruta de este controlador
import { UpdateEnvironmentDto } from './update-environment.dto'; // Asegúrate de que este DTO esté definido correctamente

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private featureFlagService: FeatureFlagService,
  ) {}

  // El login sigue siendo público, como debe ser.
  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  // --- Endpoint 1: Cambiar las Feature Flags (Ahora Público) ---
  // Se eliminó @UseGuards(JwtAuthGuard) de aquí
   @Patch('flags/update')
  async updateFeatureFlag(@Body() newConfig: any) {
    // Calling FeatureFlagService.getAllFeatureFlags
    const currentConfig = this.featureFlagService.getAllFeatureFlags();    
    const updatedConfig = { ...currentConfig, ...newConfig };
    this.featureFlagService.updateConfig(updatedConfig);
    // Calling FeatureFlagService.getAllFeatureFlags to return the new state
    return this.featureFlagService.getAllFeatureFlags();
  }

  // --- Endpoint 2: Cambiar el Entorno de Ejecución (Ahora Público) ---
  // Se eliminó @UseGuards(JwtAuthGuard) de aquí
  @Patch('environment')
  async setExecutionEnvironment(@Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    const newEnv = updateEnvironmentDto.environment;
    this.featureFlagService.setEnvironment(newEnv);
    return { message: `Environment successfully changed to ${newEnv}` };
  }
}