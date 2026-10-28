"use client"

import { useState } from "react"

const navLinks = [
  { href: "#process", label: "Quy trình" },
  { href: "#features", label: "Tính năng" },
  { href: "#faq", label: "FAQ" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50">
      <div className="section-container flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold" aria-label="ducai - Trang chủ">
          <span className="gradient-text">duc</span>
          <span className="text-white">ai</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Điều hướng chính">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#register" className="glow-button hidden sm:inline-block px-5 py-2 text-sm text-white">
            Đăng ký ngay
          </a>

          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden glass border-t border-white/5 px-4 py-4 space-y-2"
          aria-label="Menu di động"
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold glow-button text-white mt-2"
          >
            Đăng ký ngay
          </a>
        </nav>
      )}
    </header>
  )
}