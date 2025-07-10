// src/config/feature-flags.config.ts
import { FeatureFlagsConfiguration } from 'feature-flag-service-tep';

export const AppFeatureFlags: FeatureFlagsConfiguration = {
  'trending-vip': {
    // Habilitado en todos los entornos
    environments: ['dev', 'test'],
    // Solo para el usuario con el ID 'vip'
    users: ['regular'],
  },
  // ... aquí puedes agregar otras flags en el futuro
};