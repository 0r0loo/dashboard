import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class GenerateImageDto {
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