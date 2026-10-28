import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ducai - Khóa Học Tạo Video Bằng AI Chỉ Trong 15 Phút',
  description:
    'Học cách tạo video chuyên nghiệp bằng AI chỉ trong 15 phút. Từ ý tưởng đến kịch bản đến video hoàn chỉnh — không cần kinh nghiệm quay phim hay dựng phim.',
  keywords: [
    'tạo video bằng AI',
    'khóa học AI',
    'video AI',
    'ducai',
    'làm video nhanh',
    'AI video maker',
  ],
  openGraph: {
    title: 'ducai - Tạo Video Bằng AI Chỉ Trong 15 Phút',
    description:
      'Khóa học giúp bạn tạo video chuyên nghiệp bằng AI trong 15 phút. Đăng ký ngay!',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
