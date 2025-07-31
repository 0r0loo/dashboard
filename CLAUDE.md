# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

tRPC 기반 풀스택 애플리케이션을 포함하는 Turborepo 모노레포입니다:
- **프론트엔드**: React 19 + Vite + TypeScript 대시보드 (`apps/dashboard/`)
- **백엔드**: Fastify + tRPC 서버 with Zod 검증 (`apps/server/`)
- **패키지 매니저**: Yarn with workspaces
- **빌드 시스템**: 앱 간 빌드 오케스트레이션을 위한 Turborepo

## 개발 명령어

**개발 서버 시작:**
```bash
yarn dev  # 대시보드와 서버를 동시에 시작
```

**모든 앱 빌드:**
```bash
yarn build
```

**린팅:**
```bash
yarn lint  # 모든 앱에서 ESLint 실행
```

**타입 체크:**
```bash
yarn check-types  # TypeScript 컴파일러 체크 실행
```

**코드 포맷팅:**
```bash
yarn format  # Prettier로 코드 포맷팅
```

**특정 앱 작업:**
```bash
# Turbo 필터를 사용하여 특정 앱에 대한 명령어 실행
yarn dev --filter=dashboard    # React 앱만 시작
yarn dev --filter=server      # tRPC 서버만 시작
yarn build --filter=dashboard # React 앱만 빌드
```

## 아키텍처

### tRPC API 구조
- **라우터**: `apps/server/src/router.ts`에서 모든 tRPC 프로시저 정의
- **컨텍스트**: `apps/server/src/context.ts`에서 헤더의 사용자 정보로 요청 컨텍스트 생성
- **서버**: `apps/server/src/server.ts`에서 `/trpc` 접두사로 tRPC 플러그인과 함께 Fastify 구성
- **포트**: 서버는 3000번 포트에서 실행

### 프론트엔드 구조  
- **React 19** with 최신 훅과 TypeScript
- **Vite** 개발 및 빌드용
- **tRPC 클라이언트 없음**: 현재 대시보드는 기본 React 카운터 앱

### 데이터 플로우
- 서버는 인메모리 저장소 사용 (router.ts의 `users` 객체)
- `username` 헤더에서 사용자 컨텍스트 추출
- tRPC 프로시저: `getUserById` (쿼리)와 `createUser` (뮤테이션)

## 개발 참고사항

- 대시보드 앱은 현재 tRPC 서버에 연결되지 않음 - 단순한 Vite React 스타터
- 서버의 package.json에 TypeScript 컴파일 단계가 구성되지 않음
- `packages/` 디렉터리에 공유 패키지가 아직 존재하지 않음
- 루트 레벨에서 타입 체크 명령어가 존재하지만 앱들은 개별 `check-types` 스크립트가 없음