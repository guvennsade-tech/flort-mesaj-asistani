import { FeedbackRequest } from "@/lib/types";

const feedbackLog: FeedbackRequest[] = [];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function saveFeedback(feedback: FeedbackRequest): Promise<{
  source: "supabase" | "memory";
}> {
  if (supabaseUrl && supabaseServiceKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/feedback`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          deger: feedback.deger,
          ton: feedback.ton,
          asama: feedback.asama,
          hedef: feedback.hedef,
        }),
        cache: "no-store",
      });

      if (response.ok) {
        return { source: "supabase" };
      }

      console.error("Supabase feedback kaydı başarısız:", response.status);
    } catch (error) {
      console.error("Supabase feedback hatası, memory fallback kullanılacak:", error);
    }
  }

  feedbackLog.push(feedback);

  if (feedbackLog.length > 500) {
    feedbackLog.splice(0, feedbackLog.length - 500);
  }

  return { source: "memory" };
}
