// src/feature-flags/feature-flags.module.ts
import { Module } from '@nestjs/common';
import { FeatureFlagService } from 'feature-flag-service-tep';
import { AppFeatureFlags } from '../config/feature-flags.config'; // Importa la configuración de flags

@Module({
  providers: [
    {
      provide: FeatureFlagService,
      useFactory: () => {
        // Determina el entorno actual
        const currentEnv =  'prod' ;
        // Crea y retorna la instancia del servicio
        console.log(`Initializing FeatureFlagService for environment: ${currentEnv}`);
        console.log('Available feature flags:', AppFeatureFlags);
        return new FeatureFlagService(AppFeatureFlags, currentEnv);
      },
    },
  ],
  exports: [FeatureFlagService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class FeatureFlagsModule {}