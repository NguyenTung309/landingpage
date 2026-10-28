export default function ProcessSteps() {
  return (
      <section id="process" className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quy Trình <span className="gradient-text">Đơn Giản</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Chỉ 3 bước để tạo video chuyên nghiệp bằng AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-dark">
                1
              </div>
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">Ý Tưởng</h3>
              <p className="text-gray-400 text-sm">
                Nhập chủ đề hoặc ý tưởng video của bạn. AI sẽ gợi ý và phát triển nội dung.
              </p>
            </div>

            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-dark">
                2
              </div>
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Kịch Bản</h3>
              <p className="text-gray-400 text-sm">
                AI tự động tạo kịch bản chi tiết, bao gồm lời thoại, hình ảnh và nhạc nền.
              </p>
            </div>

            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-dark">
                3
              </div>
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-3">Video</h3>
              <p className="text-gray-400 text-sm">
                Nhận video hoàn chỉnh trong vài phút. Chỉnh sửa nếu cần hoặc xuất bản ngay.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
