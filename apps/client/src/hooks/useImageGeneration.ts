import { useMutation } from '@tanstack/react-query';
import { imageApi } from '../lib/image-api';
import type { GenerateImageRequest } from '../types/api';

export const useImageGeneration = () => {
  return useMutation({
    mutationFn: (request: GenerateImageRequest) =>
      imageApi.generateImage(request),
    onSuccess: (data) => {
      console.log('Image generated successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to generate image:', error);
    },
  });
};
