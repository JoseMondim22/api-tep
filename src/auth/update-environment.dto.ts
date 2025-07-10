// src/auth/update-environment.dto.ts
import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateEnvironmentDto {
  @IsNotEmpty()
  @IsIn(['dev', 'test', 'prod'])
  environment: 'dev' | 'test' | 'prod';
}