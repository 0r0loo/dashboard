import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

export type AccountType = 'oauth' | 'credentials';

@Entity('accounts')
@Index(['provider', 'providerAccountId'], { unique: true })
export class Account extends BaseEntity {
  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  type: AccountType; // 'oauth', 'credentials'

  @Column()
  provider: string; // 'google', 'github', 'credentials' 등

  @Column()
  providerAccountId: string; // 소셜: 플랫폼 ID, 로컬: email

  @Column({ type: 'text', nullable: true })
  refresh_token?: string; // OAuth refresh token

  @Column({ type: 'text', nullable: true })
  access_token?: string; // OAuth access token

  @Column({ nullable: true })
  expires_at?: number; // Token 만료 시간 (Unix timestamp)

  @Column({ nullable: true })
  token_type?: string; // 'Bearer' 등

  @Column({ nullable: true })
  scope?: string; // OAuth scope

  @Column({ type: 'text', nullable: true })
  id_token?: string; // OpenID Connect ID token

  @Column({ nullable: true })
  session_state?: string; // OAuth session state

  // 로컬 인증 전용
  @Column({ nullable: true })
  password?: string; // credentials 타입일 때만 사용 (해시된 비밀번호)
}
