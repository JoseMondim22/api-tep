import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FeatureFlagsModule } from '../feature-flags/feature-flag.module'; // <--- IMPORT THIS MODULE

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'TU_CLAVE_SECRETA', // REMINDER: Use an environment variable for this in production!
      signOptions: { expiresIn: '60m' },
    }),
    FeatureFlagsModule, // <--- Add FeatureFlagsModule here
  ],
  providers: [
    AuthService,
    // FeatureFlagService is now provided by FeatureFlagsModule, so remove it from here:
    // FeatureFlagService, // REMOVE THIS LINE
    JwtStrategy
  ],
  controllers: [AuthController],
  // If AuthService needs to be used by other modules, export it here:
  exports: [AuthService, JwtModule, JwtStrategy] // Export JwtModule and JwtStrategy if they are used elsewhere directly
})
export class AuthModule {}