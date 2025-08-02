import { Injectable } from '@nestjs/common';
import { GenerateImageDto } from './dto/generate-image.dto';

@Injectable()
export class ImageGenerationService {
  async generateImage(generateImageDto: GenerateImageDto) {
    const { prompt, width = 1024, height = 1024 } = generateImageDto;

    // 임시로 더미 데이터 반환 (나중에 실제 AI 서비스로 교체)
    return {
      imageUrl: `https://picsum.photos/${width}/${height}?random=${Date.now()}`,
      prompt,
      width,
      height,
      generatedAt: new Date().toISOString(),
    };
  }
}
