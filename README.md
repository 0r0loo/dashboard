# AI 이미지 생성 서비스

사용자가 텍스트 프롬프트를 입력하면 AI가 이미지를 생성하여 반환하는 웹 애플리케이션입니다.

## 주요 기능

- 🎨 **텍스트 → 이미지**: 자연어 프롬프트로 고품질 이미지 생성
- 🚀 **실시간 생성**: 빠른 AI 이미지 생성 및 응답
- 💡 **직관적 UI**: 토스 디자인 시스템 모티브의 깔끔한 인터페이스
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 프로젝트 구조

```
dashboard/
├── apps/
│   ├── client/          # React + Vite 프론트엔드 (포트 5173)
│   └── api/             # NestJS 백엔드 API (포트 3000)
├── packages/
│   ├── types/           # 공유 TypeScript 타입 정의
│   └── tailwind-config/ # Tailwind CSS v4 설정
└── turbo.json          # Turborepo 설정
```

### 애플리케이션

- **`apps/client`**: React + Vite + Tailwind CSS 기반 프론트엔드
  - 프롬프트 입력 UI
  - 생성된 이미지 표시
  - TanStack Query v5로 상태 관리
  
- **`apps/api`**: NestJS 기반 백엔드 API 서버
  - 이미지 생성 API 엔드포인트
  - 프롬프트 처리 및 AI 연동

### 공유 패키지

- **`@repo/types`**: API 인터페이스 및 공통 타입 정의
- **`@repo/tailwind-config`**: Tailwind CSS v4 설정 및 토스 디자인 시스템

## 기술 스택

- **Frontend**: React, Vite, Tailwind CSS v4, TypeScript
- **Backend**: NestJS, TypeScript
- **HTTP 클라이언트**: Axios
- **상태 관리**: TanStack Query v5
- **빌드 시스템**: Turborepo
- **패키지 매니저**: Yarn Berry (v4.9.2)

## 개발 환경 설정

### 필수 요구사항

- Node.js >= 22
- Yarn Berry v4.9.2

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 시작 (클라이언트: 5173, API: 3000)
yarn dev

# 모든 앱 빌드
yarn build
```

### 개발 명령어

```bash
# 개발 서버 시작
yarn dev

# 빌드
yarn build

# 린팅
yarn lint

# 타입 체크
yarn check-types

# 코드 포맷팅
yarn format
```

## 디자인 시스템

- **색상**: 토스 블루 (#3182F6, #4196FD), 화이트 배경
- **타이포그래피**: 큰 텍스트, 넉넉한 간격
- **컴포넌트**: 라운드 버튼, 카드 기반 UI
- **스타일**: 토스 디자인 시스템 모티브

## TypeScript 규칙

- **인라인 타입 import**: `import { type TypeName }` 방식 사용
- **공유 타입**: `@repo/types` 패키지에서 API 타입 import
- **타입 안전성**: 모든 컴포넌트와 API에서 엄격한 타입 체크

```typescript
// 올바른 타입 import 방식
import { type GeneratedImage, type ApiResponse } from '@repo/types'
```

## API 연동

- **HTTP 클라이언트**: Axios 기반
- **상태 관리**: TanStack Query v5
- **환경 변수**: Vite의 `import.meta.env` 사용 (VITE_ 접두사)
- **타입 안전성**: TypeScript로 API 인터페이스 정의

## 배포

애플리케이션은 다음과 같이 독립적으로 배포할 수 있습니다:

- **클라이언트**: Vercel, Netlify 등 정적 호스팅
- **API**: Docker, Railway, Heroku 등 Node.js 지원 플랫폼

## 기여하기

1. 코드 스타일 가이드를 준수해주세요
2. 타입 체크와 린팅을 통과하는지 확인해주세요
3. 커밋 전에 `yarn check-types && yarn lint`를 실행해주세요
