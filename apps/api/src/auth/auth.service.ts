import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 로컬 인증 (credentials)
  async validateUser(email: string, password: string): Promise<User | null> {
    return this.usersService.validatePassword(email, password);
  }

  // JWT 토큰 생성
  login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
      },
    };
  }

  // 회원가입 (credentials)
  async register(email: string, password: string, name: string) {
    const user = await this.usersService.createLocalAccount(
      email,
      password,
      name,
    );

    return this.login(user);
  }

  // 소셜 로그인
  async socialLogin(
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
  ) {
    const user = await this.usersService.createOrLinkSocialAccount(
      provider,
      providerAccountId,
      email,
      name,
      image,
      tokens,
    );

    return this.login(user);
  }

  // JWT 페이로드 검증
  async validateJwtPayload(payload: any): Promise<User | null> {
    return this.usersService.findById(payload.sub);
  }

  // 계정 연동
  async linkAccount(
    userId: string,
    provider: string,
    providerAccountId: string,
    tokens?: {
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
      token_type?: string;
      scope?: string;
      id_token?: string;
    },
  ) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    return this.usersService.createOrLinkSocialAccount(
      provider,
      providerAccountId,
      user.email!,
      user.name,
      user.image,
      tokens,
    );
  }
}
