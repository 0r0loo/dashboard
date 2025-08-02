// =======================
// @repo/types - Shared Types Package
// =======================

// API Types
export * from './api';

// Common Types  
export * from './common';

// Type Guards
export const isApiError = (response: any): response is import('./api').ApiError => {
  return response && typeof response === 'object' && response.success === false;
};

export const isApiSuccess = <T>(response: any): response is import('./api').ApiResponse<T> => {
  return response && typeof response === 'object' && response.success === true;
};