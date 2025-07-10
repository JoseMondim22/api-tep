// src/feature-flags/feature-flag.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureFlagService } from 'feature-flag-service-tep';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private featureFlagService: FeatureFlagService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const flagName = this.reflector.get<string>('feature_flag', context.getHandler());
    if (!flagName) {
      return true; // Si no se especifica una flag, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtenemos el usuario del token JWT

    // Para este caso, asumimos que el `username` del token es el ID que usa la flag.
    // Si tuvieras roles, podrías usar user.roles o similar.
    const userId = user ? user.username : undefined;

    return this.featureFlagService.isFeatureEnabled(flagName, userId);
  }
}