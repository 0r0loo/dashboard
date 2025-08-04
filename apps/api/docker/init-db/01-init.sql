-- 기본 스키마 생성
CREATE SCHEMA IF NOT EXISTS public;

-- 타임스탬프 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 이미지 생성 기록 테이블
CREATE TABLE IF NOT EXISTS generated_images (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_generated_images_updated_at BEFORE UPDATE
ON generated_images FOR EACH ROW EXECUTE PROCEDURE 
update_updated_at_column();

-- 인덱스 생성
CREATE INDEX idx_generated_images_created_at ON generated_images(created_at DESC);
CREATE INDEX idx_generated_images_status ON generated_images(status);

-- 초기 권한 설정
GRANT ALL PRIVILEGES ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;