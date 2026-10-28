import { z } from 'zod'

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự')
    .trim(),
  phoneNumber: z
    .string()
    .regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)')
    .trim(),
  email: z
    .string()
    .email('Email không hợp lệ')
    .max(255, 'Email không được quá 255 ký tự')
    .optional()
    .or(z.literal('')),
})

export type RegistrationInput = z.infer<typeof registrationSchema>
