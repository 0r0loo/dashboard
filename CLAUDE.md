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
  - `apps/api/docker/`: Docker 관련 파일 (PostgreSQL)
  - `apps/api/database/`: TypeORM 마이그레이션 및 시드 데이터
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

## 데이터베이스 설정

### PostgreSQL (Docker)
- **포트**: 54322
- **사용자**: admin / admin
- **데이터베이스**: dashboard

### Docker 명령어
```bash
# API 폴더에서 실행
cd apps/api
yarn db:up        # PostgreSQL 시작
yarn db:down      # PostgreSQL 중지
yarn db:logs      # 로그 확인
yarn db:reset     # 데이터베이스 초기화

# 루트에서 실행
yarn api:db:up    # API PostgreSQL 시작
yarn api:db:down  # API PostgreSQL 중지
yarn api:db:logs  # API 로그 확인
yarn api:db:reset # API DB 초기화
```

### TypeORM 마이그레이션
```bash
cd apps/api

# 마이그레이션 생성 (Entity 변경사항 자동 감지)
yarn migration:generate database/migrations/CreateGeneratedImages

# 빈 마이그레이션 파일 생성
yarn migration:create database/migrations/AddNewField

# 마이그레이션 실행
yarn migration:run

# 마이그레이션 롤백
yarn migration:revert
```

### 첫 마이그레이션 실행 과정 (실제 경험)
1. **PostgreSQL 시작**: `yarn api:db:up` (또는 `cd apps/api && yarn db:up`)
2. **Docker 초기 스크립트 제거**: `init-db` 볼륨 마운트 제거하여 TypeORM만 사용
3. **DB 리셋**: `yarn db:reset`으로 깨끗한 상태로 시작
4. **마이그레이션 생성**: `yarn migration:generate database/migrations/CreateGeneratedImages`
   - 성공 시: `Migration /path/to/migration.ts has been generated successfully.`
5. **마이그레이션 실행**: `yarn migration:run`
   - `migrations` 테이블 자동 생성
   - `generated_images` 테이블 생성
   - 성공 시: `Migration CreateGeneratedImages1754275902475 has been executed successfully.`

### 개발 워크플로 (업데이트됨)
1. PostgreSQL 시작: `yarn api:db:up`
2. Entity 수정 (예: `src/image-generation/entities/generated-image.entity.ts`)
3. 마이그레이션 생성: `yarn migration:generate database/migrations/[MigrationName]`
4. 생성된 마이그레이션 파일 검토 (`database/migrations/` 폴더)
5. 마이그레이션 실행: `yarn migration:run`
6. 개발 서버 실행: `yarn dev`

### 마이그레이션 파일 구조
```typescript
// database/migrations/1754275902475-CreateGeneratedImages.ts
export class CreateGeneratedImages1754275902475 implements MigrationInterface {
  name = 'CreateGeneratedImages1754275902475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 테이블 생성 SQL
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 롤백 SQL
  }
}
```

## API 서버 구조

### 폴더 구조
```
apps/api/
├── docker/                # Docker 관련 파일
│   ├── docker-compose.yml # PostgreSQL 설정
│   └── init-db/          # DB 초기화 스크립트
├── database/             # TypeORM DB 파일들
│   ├── migrations/       # 마이그레이션 파일
│   └── seeds/           # 시드 데이터
├── src/                 # 소스 코드
│   ├── image-generation/ # 이미지 생성 모듈
│   └── ...
├── ormconfig.ts         # TypeORM CLI 설정
└── .env                 # 환경 변수 (포트 54322)
```

### Entity 설정
- `GeneratedImage` Entity: 이미지 생성 기록 저장
- TypeORM 데코레이터 활용
- 자동 타임스탬프 (`createdAt`, `updatedAt`)

### 환경 변수
- `DB_HOST`: localhost
- `DB_PORT`: 54322
- `DB_USERNAME`: admin
- `DB_PASSWORD`: admin
- `DB_NAME`: dashboard