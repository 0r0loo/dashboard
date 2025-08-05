import 'reflect-metadata';

// Jest 글로벌 설정
jest.setTimeout(30000); // 30초 타임아웃

// 테스트 환경 변수 설정
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRES_IN = '15m';

// Console 로그 비활성화 (필요시 주석 해제)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// bcrypt mock (성능 향상을 위해)
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  compare: jest.fn().mockImplementation((plaintext, hash) => {
    return Promise.resolve(
      plaintext === 'password123' || hash === '$2b$10$hashedpassword',
    );
  }),
}));

// 각 테스트 후 모든 mock 정리
afterEach(() => {
  jest.clearAllMocks();
});
