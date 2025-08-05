import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  Type,
  DynamicModule,
  ForwardReference,
  Provider,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Account } from '../users/entities/account.entity';
import { GeneratedImage } from '../image-generation/entities/generated-image.entity';
import { testConfiguration } from '../config/test.configuration';
import { validate } from '../config/env.validation';

/**
 * 테스트용 TypeORM 모듈 설정
 */
export const getTestTypeOrmModule = () =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Account, GeneratedImage],
    synchronize: true, // 테스트에서는 자동 동기화 사용
    logging: false, // 테스트 로그 비활성화
    dropSchema: true, // 각 테스트마다 스키마 리셋
  });

/**
 * 테스트용 Config 모듈 설정
 */
export const getTestConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    load: [testConfiguration],
    validate,
  });

/**
 * 테스트용 JWT 모듈 설정
 */
export const getTestJwtModule = () =>
  JwtModule.register({
    secret: 'test-jwt-secret-key-for-testing-only',
    signOptions: { expiresIn: '15m' },
  });

/**
 * 테스트용 Passport 모듈 설정
 */
export const getTestPassportModule = () => PassportModule;

/**
 * 테스트 모듈 빌더 헬퍼
 */
export class TestModuleBuilder {
  private imports: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  > = [];
  private providers: Provider[] = [];
  private controllers: Type<any>[] = [];

  withTypeOrm() {
    this.imports.push(getTestTypeOrmModule());
    return this;
  }

  withConfig() {
    this.imports.push(getTestConfigModule());
    return this;
  }

  withJwt() {
    this.imports.push(getTestJwtModule());
    return this;
  }

  withPassport() {
    this.imports.push(getTestPassportModule());
    return this;
  }

  withProviders(providers: Provider[]) {
    this.providers.push(...providers);
    return this;
  }

  withControllers(controllers: Type<any>[]) {
    this.controllers.push(...controllers);
    return this;
  }

  withImports(
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >,
  ) {
    this.imports.push(...imports);
    return this;
  }

  async compile(): Promise<TestingModule> {
    const moduleBuilder = Test.createTestingModule({
      imports: this.imports,
      providers: this.providers,
      controllers: this.controllers,
    });

    return await moduleBuilder.compile();
  }

  getModuleBuilder() {
    return Test.createTestingModule({
      imports: this.imports,
      providers: this.providers,
      controllers: this.controllers,
    });
  }
}

/**
 * Mock 사용자 데이터 팩토리
 */
export const createMockUser = (overrides: Partial<User> = {}): User => {
  const user = new User();
  user.id = overrides.id || '123e4567-e89b-12d3-a456-426614174000';
  user.name = overrides.name || 'Test User';
  user.email = overrides.email || 'test@example.com';
  user.image = overrides.image || undefined;
  user.emailVerified = overrides.emailVerified ?? false;
  user.createdAt = overrides.createdAt || new Date();
  user.updatedAt = overrides.updatedAt || new Date();
  user.accounts = overrides.accounts || [];
  return user;
};

/**
 * Mock 계정 데이터 팩토리
 */
export const createMockAccount = (
  overrides: Partial<Account> = {},
): Account => {
  const account = new Account();
  account.id = overrides.id || '123e4567-e89b-12d3-a456-426614174001';
  account.type = overrides.type || 'credentials';
  account.provider = overrides.provider || 'local';
  account.providerAccountId = overrides.providerAccountId || 'test@example.com';
  account.password = overrides.password || '$2b$10$hashedpassword';
  account.userId = overrides.userId || '123e4567-e89b-12d3-a456-426614174000';
  account.createdAt = overrides.createdAt || new Date();
  account.updatedAt = overrides.updatedAt || new Date();
  return account;
};
