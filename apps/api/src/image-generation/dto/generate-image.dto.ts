import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { type GenerateImageRequest } from '@repo/types';

export class GenerateImageDto implements GenerateImageRequest {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsNumber()
  @Min(256)
  @Max(2048)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(256)
  @Max(2048)
  height?: number;
}
