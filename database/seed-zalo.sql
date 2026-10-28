-- Seed: Zalo group — chèn sau khi đã chạy database/schema.sql
-- Link: https://zalo.me/g/c7rgykyyplog3nfc7u8t

INSERT INTO zalo_groups (group_name, group_link, is_active, valid_from, valid_to)
VALUES (
  'ducai — Tạo Video Bằng AI',
  'https://zalo.me/g/c7rgykyyplog3nfc7u8t',
  TRUE,
  NOW(),
  NOW() + INTERVAL '365 days'
);