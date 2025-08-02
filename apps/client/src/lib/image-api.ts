import { api } from './api';
import { type GenerateImageRequest, type GeneratedImage, type ApiResponse } from '@repo/types';

export const imageApi = {
  generateImage: async (
    request: GenerateImageRequest
  ): Promise<GeneratedImage> => {
    const response = await api.post<ApiResponse<GeneratedImage>>(
      '/image-generation/generate',
      request
    );
    return response.data.data;
  },
};
