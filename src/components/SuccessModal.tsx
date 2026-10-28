"use client"

import { useState, useEffect, useCallback } from "react"
import QRCode from "qrcode"

interface SuccessModalProps {
  zaloLink: string | null
  zaloGroupName?: string
  onClose: () => void
}

export default function SuccessModal({ zaloLink, zaloGroupName, onClose }: SuccessModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [seconds, setSeconds] = useState(120)

  useEffect(() => {
    if (!zaloLink) {
      setQrDataUrl("")
      return
    }
    QRCode.toDataURL(zaloLink, {
      width: 200,
      margin: 2,
      color: { dark: "#ffffff", light: "#0D1117" },
    }).then(setQrDataUrl)
  }, [zaloLink])

  const handleRedirect = useCallback(() => {
    if (!zaloLink) return
    window.open(zaloLink, "_blank", "noopener,noreferrer")
  }, [zaloLink])

  useEffect(() => {
    if (!zaloLink) return
    if (seconds <= 0) {
      handleRedirect()
      return
    }
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, handleRedirect, zaloLink])

  const min = Math.floor(seconds / 60)
  const sec = seconds % 60

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="card p-8 md:p-10 max-w-md w-full text-center relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-4xl mb-4" aria-hidden>✅</div>
        <h3 id="success-modal-title" className="text-xl font-bold text-white mb-2">
          Đăng ký thành công!
        </h3>
        {zaloGroupName && (
          <p className="text-gray-400 text-sm mb-6">Nhóm: {zaloGroupName}</p>
        )}

        {zaloLink ? (
          <>
            <div className="bg-white rounded-xl p-4 inline-block mb-6">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt={`QR Code nhóm Zalo ${zaloGroupName ?? ""}`} className="w-[200px] h-[200px]" />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-500" aria-busy="true">
                  Đang tạo QR...
                </div>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Quét mã QR để vào nhóm Zalo hoặc nhấn nút bên dưới
            </p>

            <button
              onClick={handleRedirect}
              className="glow-button px-6 py-3 text-white font-semibold w-full mb-4"
            >
              Vào nhóm Zalo →
            </button>

            <p className="text-xs text-gray-500" aria-live="polite">
              Tự động chuyển hướng sau {min}:{sec.toString().padStart(2, "0")}
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-sm mt-2">
            Hiện chưa có nhóm Zalo khả dụng. Bạn có thể quay lại sau để tham gia.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-white underline transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  )
}
