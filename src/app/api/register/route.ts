import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { registrationSchema } from "@/lib/validators"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const { limited } = rateLimit(ip)
    if (limited) {
      return NextResponse.json(
        { success: false, error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parsed = registrationSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || "Dữ liệu không hợp lệ"
      return NextResponse.json({ success: false, error: message }, { status: 400 })
    }

    const { fullName, phoneNumber, email } = parsed.data

    const existing = await prisma.registration.findUnique({
      where: { phoneNumber },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Số điện thoại này đã được đăng ký" },
        { status: 409 }
      )
    }

    await prisma.registration.create({
      data: {
        fullName,
        phoneNumber,
        email: email || null,
      },
    })

    const activeGroup = await prisma.zaloGroup.findFirst({
      where: {
        isActive: true,
        validFrom: { lte: new Date() },
        validTo: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    })

    if (activeGroup) {
      return NextResponse.json({
        success: true,
        zaloLink: activeGroup.groupLink,
        zaloGroupName: activeGroup.groupName,
      })
    }

    return NextResponse.json({ success: true, zaloLink: null })
  } catch (error: unknown) {
    console.error("Register API error:", error)
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống. Vui lòng thử lại." },
      { status: 500 }
    )
  }
}
