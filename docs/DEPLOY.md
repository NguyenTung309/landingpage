# Hướng dẫn Deploy lên Vercel

## Yêu cầu

- Node.js ≥ 18
- Tài khoản [Vercel](https://vercel.com) miễn phí
- Database PostgreSQL (xem phần bên dưới)

---

## Bước 1 — Chuẩn bị database

### Cách A: Vercel Postgres (đơn giản nhất)

1. Trong Dashboard Vercel → tab **Storage** → **Create Database** → chọn **Postgres**.
2. Copy connection string dạng `postgresql://...` — Vercel tự inject biến `POSTGRES_PRISMA_URL`.
3. Qua tab **Query** hoặc kết nối trực tiếp, chạy nội dung file `database/schema.sql`.

### Cách B: Neon (miễn phí, recommended cho prod)

1. Đăng ký [Neon](https://neon.tech) → tạo project → copy connection string.
2. Paste vào ô **Connection string** rồi chạy `database/schema.sql` qua Query Editor.

### Cách C: Supabase

1. Tạo project trên [Supabase](https://supabase.com) → tab **SQL Editor** → chạy `database/schema.sql`.
2. Copy connection string từ **Settings → Database → Connection string → URI**.

> **Lưu ý:** Dù dùng cách nào, hãy chạy `database/schema.sql` để tạo bảng và seed data.

---

## Bước 2 — Deploy

```bash
# Clone / copy project vào thư mục làm việc
cd landingpage

# Cài dependencies
npm install

# Generate Prisma client
npx prisma generate

# (Tuỳ chọn) Test local
cp .env.example .env
# Chỉnh DATABASE_URL trong .env trỏ đúng database
npm run dev

# Deploy lên Vercel
npx vercel --prod
```

### Cấu hình Vercel

1. Trong Dashboard → chọn project → tab **Settings → Environment Variables**.
2. Thêm biến: `DATABASE_URL` = connection string PostgreSQL (đã có ở Bước 1).
3. Lưu → redeploy.

---

## Bước 3 — Verify

- Truy cập URL của Vercel, kiểm tra landing page load đúng.
- Đăng ký thử với SĐT bất kỳ → kiểm tra bản ghi trong database.
- Đăng ký trùng SĐT → xác nhận lỗi 409.
- Zalo QR hiển thị đúng link từ bản ghi `zalo_groups` đang active.

---

## Khắc phục sự cố

| Vấn đề | Cách xử lý |
|---|---|
| `prisma generate` lỗi | Đảm bảo `NODE_ENV !== "test"` và Node ≥ 18 |
| Trang trắng / 500 | Kiểm tra `DATABASE_URL` đã đúng trong Vercel env vars chưa |
| Zalo QR hiển thị null | Chèn ít nhất một bản ghi active vào `zalo_groups` (kiểm tra `valid_from` ≤ `NOW()` ≤ `valid_to`) |
| `next build` lỗi TypeScript | Chạy `npx prisma generate` trước khi build |
