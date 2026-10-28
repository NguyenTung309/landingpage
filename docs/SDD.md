# Software Design Document (SDD)
# ducai Landing Page - Khóa học Tạo Video Bằng AI

## 1. Overview
- **Project Name:** ducai Landing Page
- **Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma ORM + PostgreSQL
- **Deployment:** Vercel (Frontend + API Routes) + Vercel Postgres / Supabase / Neon
- **Date:** 2024-09-22

## 2. Goals
- Xây dựng landing page cho khóa học "Tạo Video Bằng AI Chỉ Trong 15 Phút"
- Thu thập thông tin đăng ký (Họ tên, SĐT, Email)
- Tích hợp QR Code động dẫn vào nhóm Zalo theo thời gian
- Chặn đăng ký trùng số điện thoại
- Deploy lên Vercel

## 3. Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge Network              │
├─────────────────────────────────────────────────────┤
│                Next.js 14 (App Router)              │
├─────────────────────────────────────────────────────┤
│  Layouts      │ Server        │ Route Handlers      │
│  Pages (RSC)  │ Components    │ /api/register       │
│  Loading UI   │ Client Comp.  │ /api/zalo-link      │
├─────────────────────────────────────────────────────┤
│              Prisma ORM (PostgreSQL)                │
├─────────────────────────────────────────────────────┤
│              PostgreSQL Database                    │
│         (Vercel Postgres / Supabase / Neon)         │
└─────────────────────────────────────────────────────┘
```

## 4. App Router Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (fonts, metadata, global styles)
│   ├── page.tsx              # Landing page chính (Server Component)
│   ├── loading.tsx           # Loading UI
│   ├── globals.css           # Global styles + Tailwind directives
│   ├── api/
│   │   ├── register/
│   │   │   └── route.ts      # POST - Đăng ký
│   │   └── zalo-link/
│   │       └── route.ts      # GET - Lấy link Zalo group
│   └── favicon.ico
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProcessSteps.tsx
│   ├── Features.tsx
│   ├── RegistrationForm.tsx  # Client Component ("use client")
│   ├── FAQ.tsx               # Client Component ("use client")
│   └── SuccessModal.tsx      # Client Component ("use client")
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── validators.ts         # Zod validation schemas
└── types/
    └── index.ts              # TypeScript interfaces
```

## 5. Database Schema (PostgreSQL)

### Table: registrations
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| full_name | VARCHAR(100) | NOT NULL |
| phone_number | VARCHAR(20) | NOT NULL, UNIQUE |
| email | VARCHAR(255) | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

### Table: zalo_groups
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| group_name | VARCHAR(200) | NOT NULL |
| group_link | VARCHAR(500) | NOT NULL |
| is_active | BOOLEAN | DEFAULT TRUE |
| valid_from | TIMESTAMPTZ | NULL |
| valid_to | TIMESTAMPTZ | NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

### Table: site_settings
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| key | VARCHAR(100) | NOT NULL, UNIQUE |
| value | TEXT | NULL |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

## 6. Components

| # | Component | Type | Mô tả |
|---|-----------|------|--------|
| 1 | Header | Server | Logo, Navigation, CTA button |
| 2 | Hero | Server | Headline, Phone mockup, Trust badges, Price, CTA |
| 3 | ProcessSteps | Server | 3-step workflow (Ý tưởng → Kịch bản → Video) |
| 4 | Features | Server | AI support, Brand building |
| 5 | RegistrationForm | Client | Name, Phone, Email + validation + submit |
| 6 | FAQ | Client | Accordion collapsible |
| 7 | SuccessModal | Client | QR code động, Auto-redirect (2 phút) |

> **Ghi chú:** Với App Router, mặc định là Server Component. Chỉ các component cần interactivity (form, accordion, modal) mới dùng `"use client"`.

## 7. API Endpoints (Route Handlers)

### POST /api/register
- **File:** `src/app/api/register/route.ts`
- **Input:** `{ fullName, phoneNumber, email? }`
- **Logic:**
  1. Validate input bằng Zod
  2. Check trùng `phone_number`
  3. Lưu vào DB
  4. Trả về link Zalo group đang active
- **Response:** `{ success: true, zaloLink: "..." }` hoặc `{ error: "..." }`

### GET /api/zalo-link
- **File:** `src/app/api/zalo-link/route.ts`
- **Logic:** Query `zalo_groups` WHERE `is_active = true` AND `NOW()` BETWEEN `valid_from` AND `valid_to`
- **Response:** `{ groupLink: "...", groupName: "..." }`

## 8. Design Tokens
| Token | Giá trị | Mục đích |
|-------|---------|----------|
| Primary | #00C9A7 | Teal — màu chủ đạo |
| Background | #0D1117 | Dark background |
| Card | #1A1F2C | Card background |
| Text Primary | #FFFFFF | Text chính |
| Text Secondary | #9CA3AF | Text phụ |
| Border Radius (card) | 12px | Bo góc card |
| Border Radius (button) | 24px | Bo góc button (pill) |

## 9. Phased Implementation

### Phase 1: Project Setup
1. Initialize Next.js 14 App Router + TypeScript + Tailwind
2. Setup Prisma với PostgreSQL
3. Tạo database schema + migration
4. Tạo Prisma client singleton (`src/lib/prisma.ts`)
5. Cấu hình Root Layout (`src/app/layout.tsx`)

### Phase 2: Landing Page UI
6. Header component
7. Hero section
8. Process Steps section
9. Features section
10. Registration form (Client Component)

### Phase 3: Backend + Integration
11. Route Handler `/api/register` + Zod validation
12. Route Handler `/api/zalo-link`
13. Dynamic QR code generation (package `qrcode`)
14. Success modal với countdown + auto-redirect

### Phase 4: Polish & Deploy
15. FAQ section (Accordion)
16. Form validation + error handling (client + server)
17. Responsive design (mobile-first)
18. SEO metadata (Next.js Metadata API)
19. Rate limiting cho API
20. Deploy lên Vercel + kết nối PostgreSQL
