import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGenerationController } from './image-generation.controller';
import { ImageGenerationService } from './image-generation.service';
import { GeneratedImage } from './entities/generated-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneratedImage])],
  controllers: [ImageGenerationController],
  providers: [ImageGenerationService],
})
export class ImageGenerationModule {}
