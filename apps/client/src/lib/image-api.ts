import { api } from './api';
import type {
  GenerateImageRequest,
  GeneratedImage,
  ApiResponse,
} from '../types/api';

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
