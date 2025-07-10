// src/config/feature-flags.config.ts
import { FeatureFlagsConfiguration } from 'feature-flag-service-tep';

export const AppFeatureFlags: FeatureFlagsConfiguration = {
  'trending-vip': {    
    environments: ['prod'],
    // Solo para el usuario con el ID 'vip'
    users: ['vip'],
  },
  'genero': {    
    environments: ['prod'],
    // Solo para el usuario con el ID 'vip'
    users: ['regular'],
  },
  'upFlags': {    
    environments: ['test', 'dev'],
    // Solo para el usuario con el ID 'vip'
    users: ['admin'],
  },
   'environment': {    
    environments: ['test', 'dev', 'prod'],
    // Solo para el usuario con el ID 'vip'
    users: ['admin'],
  },
  // ... aquí puedes agregar otras flags en el futuro
};