# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

AI 이미지 생성 서비스 - 사용자가 프롬프트를 입력하면 AI가 이미지를 생성하여 반환하는 웹 애플리케이션입니다.

### 주요 기능
- 클라이언트: 프롬프트 입력 UI, 생성된 이미지 표시
- API 서버: 프롬프트 수신, AI 이미지 생성, 이미지 응답

### 프로젝트 구조
- Turborepo 모노레포
- `apps/client`: React 기반 프론트엔드
- `apps/api`: NestJS 기반 백엔드 API
- `packages/`: 공유 패키지들

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