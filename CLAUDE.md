# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

AI 이미지 생성 서비스 - 사용자가 프롬프트를 입력하면 AI가 이미지를 생성하여 반환하는 웹 애플리케이션입니다.

### 주요 기능
- 클라이언트: 프롬프트 입력 UI, 생성된 이미지 표시
- API 서버: 프롬프트 수신, AI 이미지 생성, 이미지 응답

### 프로젝트 구조
- Turborepo 모노레포
- `apps/client`: React + Vite + Tailwind CSS 프론트엔드 (포트 5173)
- `apps/api`: NestJS 기반 백엔드 API (포트 3000)
- `packages/`: 공유 패키지들
  - `packages/tailwind-config`: Tailwind CSS v4 설정
  - `packages/types`: 공유 TypeScript 타입 정의

### 디자인 시스템
- **스타일**: 토스 디자인 시스템 모티브
- **색상**: 토스 블루 (#3182F6, #4196FD), 화이트 배경
- **타이포그래피**: 큰 텍스트, 넉넉한 간격
- **컴포넌트**: 라운드 버튼, 카드 기반 UI

### API 연동
- **HTTP 클라이언트**: Axios
- **상태 관리**: TanStack Query v5
- **환경 변수**: Vite의 `import.meta.env` 사용 (VITE_ 접두사)
- **타입 안전성**: TypeScript로 API 인터페이스 정의

### TypeScript 규칙
- **타입 import**: `import type { TypeName }` 대신 `import { type TypeName }` 방식 사용
- **빌드 호환성**: 클라이언트 빌드 오류 방지를 위해 inline type import 방식 선호
- **공유 타입**: `@repo/types` 패키지에서 API 타입 import
- **예시**: `import { type GeneratedImage, type ApiResponse } from '@repo/types'`

### 파일 관리 규칙
- **`.gitignore`**: 루트에 통합 관리됨 - 개별 앱 폴더에 중복 생성 금지
- **환경 변수**: 루트 `.gitignore`에서 이미 `.env*` 파일들 제외 처리됨
- **공통 설정**: 모노레포 루트에서 중앙 집중식 관리

## 개발 환경

- **패키지 매니저**: Yarn Berry (v4.9.2)
- **빌드 시스템**: Turborepo
- **Node.js**: >= 22

## 개발 명령어

**개발 서버 시작:**
```bash
yarn dev
```

**모든 앱 빌드:**
```bash
yarn build
```

**린팅:**
```bash
yarn lint
```

**타입 체크:**
```bash
yarn check-types
```

**코드 포맷팅:**
```bash
yarn format
```