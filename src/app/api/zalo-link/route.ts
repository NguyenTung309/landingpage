import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const { limited } = rateLimit(ip, 30, 60_000) // generous for read-only
    if (limited) {
      return NextResponse.json(
        { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." },
        { status: 429 },
      )
    }

    const group = await prisma.zaloGroup.findFirst({
      where: {
        isActive: true,
        validFrom: { lte: new Date() },
        validTo: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    })

    if (!group) {
      return NextResponse.json(
        { error: "Không có nhóm Zalo nào đang hoạt động" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      groupLink: group.groupLink,
      groupName: group.groupName,
    })
  } catch (error) {
    console.error("Zalo link API error:", error)
    return NextResponse.json(
      { error: "Lỗi hệ thống. Vui lòng thử lại sau." },
      { status: 500 },
    )
  }
}
