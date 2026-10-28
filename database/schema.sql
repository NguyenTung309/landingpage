-- Landing Page Database Schema (PostgreSQL)

CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE zalo_groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(200) NOT NULL,
    group_link VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMPTZ NULL,
    valid_to TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
('redirect_url', 'https://zalo.me/g/YOUR_GROUP_ID'),
('redirect_delay_seconds', '2'),
('course_name', 'ducai - Khóa học tạo video bằng AI');

CREATE INDEX idx_registrations_phone ON registrations(phone_number);
CREATE INDEX idx_zalo_groups_active ON zalo_groups(is_active, valid_from, valid_to);
