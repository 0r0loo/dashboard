// =======================
// Image Generation API
// =======================

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

// =======================
// Common API Response
// =======================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

// =======================
// API Status Types
// =======================

export interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
}