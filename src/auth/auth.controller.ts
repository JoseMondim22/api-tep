// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Patch,
  Get,
  Param,
  UseGuards, // Make sure UseGuards is imported
  HttpStatus,
  HttpCode // Import HttpCode and HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FeatureFlagService } from 'feature-flag-service-tep';
import { UpdateEnvironmentDto } from './update-environment.dto';
import { FeatureFlagGuard } from '../feature-flags/feature-flag.guard';
import { CheckFeatureFlag } from '../feature-flags/feature-flag.decorator';
import { JwtAuthGuard } from './jwt-auth.guard'; // Re-import JwtAuthGuard

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private featureFlagService: FeatureFlagService,
  ) {}

  // The login remains public.
  @Post('login')
  @HttpCode(HttpStatus.OK) // Explicitly set status code for success
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // More specific message
    }
    return this.authService.login(user);
  }

  // --- Endpoint 1: Bulk Update Feature Flags ---
  // Protected by JWT authentication AND a feature flag
  @UseGuards(JwtAuthGuard, FeatureFlagGuard) // Apply JwtAuthGuard first
  @CheckFeatureFlag('upFlags') // This flag name should correspond to your config
  @Patch('flags/update')
  @HttpCode(HttpStatus.OK)
  async updateFeatureFlag(@Body() newConfig: any) {
    const currentConfig = this.featureFlagService.getAllFeatureFlags();
    const updatedConfig = { ...currentConfig, ...newConfig };
    this.featureFlagService.updateConfig(updatedConfig);
    return this.featureFlagService.getAllFeatureFlags();
  }

  // --- Endpoint to Update a Specific Feature Flag ---
  // Protected by JWT authentication AND a feature flag
  @UseGuards(JwtAuthGuard, FeatureFlagGuard) // Apply JwtAuthGuard first
  @CheckFeatureFlag('upFlags') // Likely the same flag as bulk update, or a more specific one like 'upSpecificFlag'
  @Patch('flags/:flagName') // Corrected route: use /:flagName for URL parameters
  @HttpCode(HttpStatus.OK)
  async updateSpecificFeatureFlag(
    @Param('flagName') flagName: string,
    @Body() updatedFlagConfig: any, // Using 'any' as per your request (no DTO)
  ) {
    this.featureFlagService.updateFeatureFlag(flagName, updatedFlagConfig);
    return this.featureFlagService.getFlagDetails(flagName);
  }

  // --- Endpoint 2: Change the Execution Environment ---
  // Protected by JWT authentication AND a feature flag
  @UseGuards(JwtAuthGuard, FeatureFlagGuard) // Apply JwtAuthGuard first
  @CheckFeatureFlag('environment') // Renamed for clarity, or use 'adminAccess' etc.
  @Patch('environment')
  @HttpCode(HttpStatus.OK)
  async setExecutionEnvironment(@Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    const newEnv = updateEnvironmentDto.environment;
    this.featureFlagService.setEnvironment(newEnv);
    return { message: `Environment successfully changed to ${newEnv}` };
  }

  // --- Endpoint to Get All Feature Flags ---
  // Protected by JWT authentication AND a feature flag
  @UseGuards(JwtAuthGuard, FeatureFlagGuard) // Apply JwtAuthGuard first
  @CheckFeatureFlag('upFlags') // Consider a more descriptive flag name here
  @Get('flags') // More RESTful endpoint name (plural, no trailing s)
  @HttpCode(HttpStatus.OK)
  async getAllFeatureFlags() { // Renamed method for consistency
    const flags = this.featureFlagService.getAllFeatureFlags();
    return { flags };
  }
}