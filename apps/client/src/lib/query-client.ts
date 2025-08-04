import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분 캐시, 프로덕션에서는 더 길게 설정 가능
      staleTime: 5 * 60 * 1000,
      // 가비지 컬렉션 시간 (10분)
      gcTime: 10 * 60 * 1000,
      // 네트워크 연결 시 자동 재시도
      refetchOnWindowFocus: true,
      // 재연결 시 자동 재시도
      refetchOnReconnect: true,
      // 컴포넌트 마운트 시 재시도 비활성화 (staleTime으로 제어)
      refetchOnMount: false,
      // 실패 시 재시도 횟수
      retry: (failureCount, error: any) => {
        // 4xx 에러는 재시도하지 않음
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // 5xx 에러나 네트워크 에러는 최대 3번 재시도
        return failureCount < 3;
      },
      // 재시도 지연 시간 (지수 백오프)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // 뮤테이션 실패 시 재시도 안함 (명시적으로 처리)
      retry: false,
    },
  },
});

// 개발 환경에서만 DevTools 사전 로드 (번들 크기 최적화)
if (import.meta.env.DEV) {
  // DevTools를 동적으로 로드하여 프로덕션 번들에서 제외
  import('@tanstack/react-query-devtools').catch((error) => {
    console.warn('React Query DevTools를 로드할 수 없습니다:', error);
  });
}