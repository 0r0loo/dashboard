export interface GenerateImageRequest {
  prompt: string;
  width?: number;
  height?: number;
}

export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  width: number;
  height: number;
  generatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}