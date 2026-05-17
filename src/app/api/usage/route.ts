import { NextResponse } from "next/server";
import { getUsageStats, getDailyBudget } from "@/lib/rate-limit";

export async function GET() {
  const stats = getUsageStats();
  const budget = getDailyBudget();

  return NextResponse.json({
    ...stats,
    budget,
    remainingBudget: Math.max(0, budget - stats.estimatedCost),
    budgetExceeded: stats.estimatedCost >= budget,
  });
}
