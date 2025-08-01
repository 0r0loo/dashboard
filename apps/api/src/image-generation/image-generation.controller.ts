import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { GenerateImageDto } from './dto/generate-image.dto';
import { type ApiResponse, type GeneratedImage } from '@repo/types';

@Controller('image-generation')
export class ImageGenerationController {
  constructor(
    private readonly imageGenerationService: ImageGenerationService,
  ) {}

  @Post('generate')
  async generateImage(
    @Body() generateImageDto: GenerateImageDto,
  ): Promise<ApiResponse<GeneratedImage>> {
    try {
      const result =
        await this.imageGenerationService.generateImage(generateImageDto);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to generate image',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
