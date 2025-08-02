// =======================
// Common Utility Types
// =======================

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationRequest {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =======================
// Environment Types
// =======================

export interface ClientEnv {
  VITE_API_URL: string;
  VITE_DEV_MODE: string;
}

export interface ServerEnv {
  PORT: string;
  NODE_ENV: 'development' | 'production' | 'test';
  CLIENT_URL: string;
}