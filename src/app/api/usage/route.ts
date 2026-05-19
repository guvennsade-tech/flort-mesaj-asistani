import { NextRequest, NextResponse } from "next/server";
import { getUsageStats, getDailyBudget } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  if (!adminSecret) {
    return NextResponse.json(
      { hata: "Kullanım istatistikleri şu an yapılandırılmamış." },
      { status: 503 }
    );
  }

  const stats = await getUsageStats();
  const budget = getDailyBudget();

  return NextResponse.json({
    ...stats,
    budget,
    remainingBudget: Math.max(0, budget - stats.estimatedCost),
    budgetExceeded: stats.estimatedCost >= budget,
  });
}
