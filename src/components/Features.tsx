export default function Features() {
  return (
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại Sao Chọn <span className="gradient-text">ducai?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Công cụ AI hàng đầu giúp bạn tạo nội dung video chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Thông Minh</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sử dụng công nghệ AI tiên tiến nhất để tạo video chất lượng cao. 
                Tự động sinh kịch bản, giọng nói, hình ảnh và nhạc nền phù hợp.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Xây Dựng Thương Hiệu</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tạo nội dung video nhất quán với thương hiệu của bạn. 
                Tùy chỉnh logo, màu sắc, font chữ và phong cách riêng.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Nhanh Chóng</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tiết kiệm hàng giờ so với quy trình truyền thống. 
                Từ ý tưởng đến video hoàn chỉnh chỉ trong 15 phút.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tiết Kiệm Chi Phí</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Không cần thuê quay phim, editor hay studio. 
                Giảm 90% chi phí sản xuất video so với phương pháp truyền thống.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
