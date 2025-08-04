import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  // User 조회
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['accounts'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['accounts'],
    });
  }

  // Account 조회
  async findByAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<User | null> {
    const account = await this.accountRepository.findOne({
      where: { provider, providerAccountId },
      relations: ['user', 'user.accounts'],
    });

    return account?.user || null;
  }

  async findAccountByProvider(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { provider, providerAccountId },
      relations: ['user'],
    });
  }

  // 계정 통합 로직 - 이메일 기반
  async findOrCreateUser(
    email: string,
    name?: string,
    image?: string,
  ): Promise<User> {
    // 기존 사용자 찾기
    let user = await this.findByEmail(email);

    if (!user) {
      // 새 사용자 생성
      user = await this.userRepository.save({
        email,
        name: name || email.split('@')[0], // 이메일에서 이름 추출
        image,
        emailVerified: false,
      });
    }

    return user;
  }

  // 로컬 계정 생성 (이메일 + 비밀번호)
  async createLocalAccount(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    // 이메일 중복 체크
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }

    // credentials 계정 중복 체크
    const existingAccount = await this.findAccountByProvider(
      'credentials',
      email,
    );
    if (existingAccount) {
      throw new ConflictException('이미 사용중인 계정입니다.');
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // User 생성
    const user = await this.userRepository.save({
      email,
      name,
      emailVerified: false,
    });

    // Account 생성 (credentials)
    await this.accountRepository.save({
      user,
      userId: user.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: email,
      password: hashedPassword,
    });

    return user;
  }

  // 소셜 계정 생성 또는 연동
  async createOrLinkSocialAccount(
    provider: string,
    providerAccountId: string,
    email: string,
    name?: string,
    image?: string,
    tokens?: {
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
      token_type?: string;
      scope?: string;
      id_token?: string;
    },
  ): Promise<User> {
    // 이미 존재하는 소셜 계정인지 확인
    const existingAccount = await this.findAccountByProvider(
      provider,
      providerAccountId,
    );
    if (existingAccount) {
      return existingAccount.user;
    }

    // 이메일 기반으로 사용자 찾기 또는 생성
    const user = await this.findOrCreateUser(email, name, image);

    // 소셜 계정 연동
    await this.accountRepository.save({
      user,
      userId: user.id,
      type: 'oauth',
      provider,
      providerAccountId,
      access_token: tokens?.access_token,
      refresh_token: tokens?.refresh_token,
      expires_at: tokens?.expires_at,
      token_type: tokens?.token_type,
      scope: tokens?.scope,
      id_token: tokens?.id_token,
    });

    return user;
  }

  // 비밀번호 검증 (credentials 계정용)
  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const account = await this.accountRepository.findOne({
      where: {
        provider: 'credentials',
        providerAccountId: email,
      },
      relations: ['user'],
    });

    if (!account || !account.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, account.password);
    return isValid ? account.user : null;
  }

  // 사용자 계정 목록 조회
  async getUserAccounts(userId: string): Promise<Account[]> {
    return this.accountRepository.find({
      where: { userId },
      select: ['id', 'type', 'provider', 'createdAt'], // 민감한 정보 제외
    });
  }
}
