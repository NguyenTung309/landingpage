"use client"

import { useState, FormEvent } from "react"
import { registrationSchema } from "@/lib/validators"

type FieldErrors = {
  fullName?: string
  phoneNumber?: string
  email?: string
}

interface Props {
  onSuccess: (zaloLink: string | null, zaloGroupName?: string) => void
}

// Field-level Zod helpers so each field can be validated in real time.
function zodFieldError(field: keyof FieldErrors, value: string): string | undefined {
  const pick = registrationSchema.shape[field]
  const res = pick.safeParse(value)
  return res.success ? undefined : res.error.errors[0]?.message
}

export default function RegistrationForm({ onSuccess }: Props) {
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function validateAll(): boolean {
    const res = registrationSchema.safeParse({ fullName, phoneNumber, email })
    if (res.success) {
      setErrors({})
      return true
    }
    const e: FieldErrors = {}
    for (const issue of res.error.errors) {
      const path = issue.path[0] as keyof FieldErrors
      if (!e[path]) e[path] = issue.message
    }
    setErrors(e)
    return false
  }

  function handleBlur(field: keyof FieldErrors) {
    setTouched(t => ({ ...t, [field]: true }))
    const value = field === "fullName" ? fullName : field === "phoneNumber" ? phoneNumber : email
    setErrors(prev => ({ ...prev, [field]: zodFieldError(field, value ?? "") }))
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    setServerError("")
    setTouched({ fullName: true, phoneNumber: true, email: true })
    if (!validateAll()) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim() || undefined,
        }),
      })
      const data: {
        success: boolean
        error?: string
        zaloLink?: string | null
        zaloGroupName?: string
      } = await res.json()
      if (data.success) {
        onSuccess(data.zaloLink ?? null, data.zaloGroupName)
      } else {
        setServerError(data.error || "Có lỗi xảy ra. Vui lòng thử lại.")
      }
    } catch {
      setServerError("Không thể kết nối. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function fieldClass(hasError?: string) {
    const base =
      "w-full px-4 py-3 rounded-xl bg-dark border text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors"
    return hasError
      ? `${base} border-red-500 focus:border-red-500 focus:ring-red-500`
      : `${base} border-white/10 focus:border-primary focus:ring-primary`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      {/* global success live region consumed by SuccessModal via parent state */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="form-status">
        {serverError}
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
          Họ tên <span className="text-red-400" aria-hidden>*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          onBlur={() => handleBlur("fullName")}
          placeholder="Nguyễn Văn A"
          aria-invalid={Boolean(touched.fullName && errors.fullName)}
          aria-describedby={errors.fullName ? "err-fullName" : undefined}
          className={fieldClass(touched.fullName ? errors.fullName : undefined)}
        />
        {(touched.fullName || isSubmitting) && errors.fullName && (
          <p id="err-fullName" role="alert" className="mt-1 text-xs text-red-400">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
          Số điện thoại <span className="text-red-400" aria-hidden>*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          onBlur={() => handleBlur("phoneNumber")}
          placeholder="0912345678"
          aria-invalid={Boolean(touched.phoneNumber && errors.phoneNumber)}
          aria-describedby={errors.phoneNumber ? "err-phoneNumber" : undefined}
          className={fieldClass(touched.phoneNumber ? errors.phoneNumber : undefined)}
        />
        {(touched.phoneNumber || isSubmitting) && errors.phoneNumber && (
          <p id="err-phoneNumber" role="alert" className="mt-1 text-xs text-red-400">
            {errors.phoneNumber}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email <span className="text-xs text-gray-500">(không bắt buộc)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="email@example.com"
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={errors.email ? "err-email" : undefined}
          className={fieldClass(touched.email ? errors.email : undefined)}
        />
        {(touched.email || isSubmitting) && errors.email && (
          <p id="err-email" role="alert" className="mt-1 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-400 text-center">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full glow-button px-6 py-3 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng Ký Miễn Phí"}
      </button>
    </form>
  )
}