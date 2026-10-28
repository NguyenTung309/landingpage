export default function Hero() {
  return (
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              🚀 Khóa học mới 2024
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Tạo Video Bằng AI
            <br />
            <span className="gradient-text">Chỉ Trong 15 Phút</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Từ ý tưởng → kịch bản → video hoàn chỉnh. Không cần kinh nghiệm 
            quay phim hay dựng phim. AI sẽ làm tất cả cho bạn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="#register" className="glow-button animate-pulse-glow px-8 py-4 text-lg text-white w-full sm:w-auto text-center">
              Đăng Ký Miễn Phí →
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Miễn phí 100% — Không thẻ tín dụng</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">500+</span>
              <span>Học viên</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">4.9</span>
              <span>⭐ Đánh giá</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">15 phút</span>
              <span>/ video</span>
            </div>
          </div>
        </div>
      </section>
  )
}
