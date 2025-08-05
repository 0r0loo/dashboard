import { Entity, Column, OneToMany } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  name?: string; // 사용자 이름 (NextAuth 호환)

  @Column({ unique: true, nullable: true })
  email?: string; // 이메일 (통합 식별자)

  @Column({ nullable: true })
  image?: string; // 프로필 이미지 (NextAuth 호환)

  @Column({ default: false })
  emailVerified: boolean; // 이메일 인증 여부

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
