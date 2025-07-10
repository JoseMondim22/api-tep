// src/feature-flags/feature-flag.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const CheckFeatureFlag = (name: string) => SetMetadata('feature_flag', name);