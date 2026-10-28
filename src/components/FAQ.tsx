"use client"

import { useState } from "react"

const faqItems = [
  {
    q: "Tôi cần kinh nghiệm gì để tham gia?",
    a: "Không cần bất kỳ kinh nghiệm nào. Khóa học hướng dẫn từng bước từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.",
  },
  {
    q: "Khóa học có miễn phí không?",
    a: "Đúng vậy — khóa học hoàn toàn miễn phí. Bạn chỉ cần đăng ký thông tin để tham gia nhóm Zalo hỗ trợ.",
  },
  {
    q: "Tôi cần những công cụ gì?",
    a: "Bạn chỉ cần một chiếc máy tính hoặc điện thoại có kết nối internet. Các công cụ AI sẽ được giới thiệu trong khóa học.",
  },
  {
    q: "Video tạo ra có chuyên nghiệp không?",
    a: "Hoàn toàn có thể tạo video đạt chuẩn chuyên nghiệp. Nhiều học viên đã sử dụng cho kênh YouTube, TikTok và marketing doanh nghiệp.",
  },
  {
    q: "Thời gian học là bao lâu?",
    a: "Nội dung cốt lõi chỉ mất khoảng 15 phút. Sau đó bạn có thể thực hành và tạo video thực tế ngay.",
  },
  {
    q: "Tôi có thể đăng ký nhiều lần không?",
    a: "Mỗi số điện thoại chỉ được đăng ký một lần để tránh trùng lặp. Nếu cần hỗ trợ, hãy liên hệ qua nhóm Zalo.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <section id="faq" className="py-20">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Câu Hỏi <span className="gradient-text">Thường Gặp</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Những thắc mắc phổ biến về khóa học
          </p>
        </div>

        <div className="space-y-3" role="list">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="card overflow-hidden" role="listitem">
                <h3 role="heading" aria-level={3}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-sm md:text-base font-medium text-white transition-colors hover:text-primary"
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                  className="px-6 overflow-hidden"
                  style={{ maxHeight: isOpen ? "200px" : "0px", transition: "max-height 0.25s ease" }}
                >
                  <p className="pb-5 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}