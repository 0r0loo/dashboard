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
yarn migration:generate database/migrations/MigrationName

# 빈 마이그레이션 파일 생성
yarn migration:create database/migrations/MigrationName

# 마이그레이션 실행
yarn migration:run

# 마이그레이션 롤백
yarn migration:revert
```

### 🚀 첫 마이그레이션 실행 가이드

**1단계: PostgreSQL 시작**
```bash
yarn db:up
```

**2단계: Entity 확인**
- `src/image-generation/entities/generated-image.entity.ts` 파일이 존재하는지 확인
- Entity 데코레이터가 올바르게 설정되어 있는지 확인

**3단계: 마이그레이션 생성**
```bash
yarn migration:generate database/migrations/CreateGeneratedImages
```

**4단계: 마이그레이션 실행**
```bash
yarn migration:run
```

**성공 시 출력 예시:**
```
Migration CreateGeneratedImages1754275902475 has been executed successfully.
```

### 📋 일반적인 개발 워크플로

**기존 Entity 수정 시:**
1. Entity 파일 수정 (예: 새 컬럼 추가)
2. `yarn migration:generate database/migrations/AddNewColumn`
3. 생성된 마이그레이션 파일 검토
4. `yarn migration:run`으로 마이그레이션 실행
5. 테스트 진행

**새 Entity 추가 시:**
1. 새 Entity 파일 생성
2. Module에 Entity 추가
3. `yarn migration:generate database/migrations/CreateNewEntity`
4. `yarn migration:run`으로 마이그레이션 실행

**롤백이 필요한 경우:**
```bash
yarn migration:revert  # 마지막 마이그레이션만 롤백
```

### ⚠️ 중요 사항

- **프로덕션**: `synchronize: false` 사용 (이미 설정됨)
- **마이그레이션 파일**: 직접 수정하지 말고 새로운 마이그레이션 생성
- **백업**: 중요한 데이터가 있을 때는 백업 후 마이그레이션 실행
- **팀 작업**: 마이그레이션 파일은 반드시 Git에 커밋

### 🔍 마이그레이션 상태 확인

마이그레이션 실행 시 다음과 같은 정보를 확인할 수 있습니다:
- 실행된 마이그레이션 수
- 새로 실행될 마이그레이션 수
- 실행된 SQL 쿼리
- 성공/실패 상태

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