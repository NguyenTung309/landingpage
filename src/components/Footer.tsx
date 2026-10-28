export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="section-container text-center">
        <div className="text-xl font-bold mb-4">
          <span className="gradient-text">duc</span>
          <span className="text-white">ai</span>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ducai. Tạo video bằng AI — nhanh, dễ, chuyên nghiệp.
        </p>
      </div>
    </footer>
  )
}