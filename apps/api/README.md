# AI 이미지 생성 API 서버

NestJS 기반의 AI 이미지 생성 API 서버입니다.

## 🚀 기술 스택

- **Framework**: NestJS 11
- **Database**: PostgreSQL 16 (Docker)
- **ORM**: TypeORM
- **Language**: TypeScript

## 📁 프로젝트 구조

```
apps/api/
├── docker/                # Docker 관련 파일
│   ├── docker-compose.yml # PostgreSQL Docker 설정
│   └── init-db/          # DB 초기화 스크립트
│       └── 01-init.sql
├── database/             # TypeORM DB 파일들
│   ├── migrations/       # 마이그레이션 파일
│   └── seeds/           # 시드 데이터
├── src/                 # 소스 코드
│   ├── image-generation/ # 이미지 생성 모듈
│   └── ...
├── ormconfig.ts         # TypeORM CLI 설정
├── .env                 # 환경 변수
└── package.json
```

## 🐳 PostgreSQL 설정

### 데이터베이스 정보
- **Host**: localhost
- **Port**: 54322
- **Database**: dashboard
- **Username**: admin
- **Password**: admin

### Docker 명령어

```bash
# PostgreSQL 시작
yarn db:up

# PostgreSQL 중지
yarn db:down

# 로그 확인
yarn db:logs

# DB 초기화 (모든 데이터 삭제)
yarn db:reset
```

## 🔄 TypeORM 마이그레이션

### 마이그레이션 명령어

```bash
# 마이그레이션 생성 (Entity 변경사항 자동 감지)
yarn migration:generate CreateGeneratedImages

# 빈 마이그레이션 파일 생성
yarn migration:create AddNewField

# 마이그레이션 실행
yarn migration:run

# 마이그레이션 롤백
yarn migration:revert
```

### 개발 워크플로

1. Entity 수정
2. `yarn migration:generate [MigrationName]`으로 마이그레이션 생성
3. `yarn migration:run`으로 마이그레이션 실행
4. 프로덕션에서는 `synchronize: false` 사용

## 🛠️ 개발 환경 설정

### 1. 환경 변수 설정

```bash
cp .env.example .env
```

### 2. PostgreSQL 시작

```bash
yarn db:up
```

### 3. 의존성 설치 및 개발 서버 실행

```bash
# 루트에서 전체 프로젝트 실행
cd ../../
yarn dev

# 또는 API만 실행
yarn start:dev
```

## 🧪 테스트

```bash
# 단위 테스트
yarn test

# E2E 테스트
yarn test:e2e

# 테스트 커버리지
yarn test:cov
```

## 📋 사용 가능한 스크립트

### 개발 관련
- `yarn start:dev` - 개발 서버 실행 (watch mode)
- `yarn start:debug` - 디버그 모드로 실행
- `yarn build` - 프로덕션 빌드

### 데이터베이스 관련
- `yarn db:up` - PostgreSQL 시작
- `yarn db:down` - PostgreSQL 중지
- `yarn db:logs` - PostgreSQL 로그 확인
- `yarn db:reset` - 데이터베이스 초기화

### 마이그레이션 관련
- `yarn migration:generate [name]` - 마이그레이션 생성
- `yarn migration:create [name]` - 빈 마이그레이션 생성
- `yarn migration:run` - 마이그레이션 실행
- `yarn migration:revert` - 마이그레이션 롤백

### 코드 품질
- `yarn lint` - ESLint 실행
- `yarn format` - Prettier 포맷팅

## 🌐 API 엔드포인트

### 이미지 생성
- `POST /image-generation/generate` - AI 이미지 생성

### 헬스체크
- `GET /` - 서버 상태 확인

## 🔧 환경 변수

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=54322
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=dashboard

# API Server
PORT=3000
```

## 📚 추가 정보

- [NestJS 문서](https://docs.nestjs.com)
- [TypeORM 문서](https://typeorm.io)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)