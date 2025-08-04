import axios, { type AxiosResponse } from 'axios';

// 환경별 API URL 설정
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return import.meta.env.DEV ? 'http://localhost:3000' : '/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// Request interceptor - 인증 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기 (필요시)
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 개발 환경에서만 로깅
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - 표준화된 에러 처리
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    
    // 에러 로깅
    console.error('❌ API Error:', {
      status,
      url,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    });

    // 공통 에러 처리
    switch (status) {
      case 401:
        // 인증 토큰 만료 처리
        localStorage.removeItem('auth_token');
        // 로그인 페이지로 리디렉션 (필요시)
        // window.location.href = '/login';
        break;
      case 403:
        console.warn('🚫 권한이 없습니다.');
        break;
      case 404:
        console.warn('🔍 요청한 리소스를 찾을 수 없습니다.');
        break;
      case 500:
        console.error('🔥 서버 내부 오류가 발생했습니다.');
        break;
      default:
        if (status >= 500) {
          console.error('🔥 서버 오류가 발생했습니다.');
        }
    }

    return Promise.reject(error);
  }
);

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

// API 에러 타입 정의
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}