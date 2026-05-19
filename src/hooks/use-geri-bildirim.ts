import { useState, useCallback } from "react";
import { Ton, IliskiAsamasi, Hedef } from "@/lib/types";

export function useGeriBildirim(
  setHata: (hata: { mesaj: string; tip: "baglanti" | "sunucu" | "input" | "genel" | "rateLimit"; retryAfter?: number } | null) => void
) {
  const [feedback, setFeedback] = useState<"iyi" | "kotu" | null>(null);

  const geriBildirimGonder = useCallback(
    async (deger: "iyi" | "kotu", ton: Ton, asama: IliskiAsamasi, hedef: Hedef) => {
      try {
        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deger, ton, asama, hedef }),
        });
        if (!res.ok) throw new Error();
        setFeedback(deger);
      } catch {
        setHata({
          mesaj: "Geri bildirimin kaydedilemedi, ama merak etme, önemli değil.",
          tip: "baglanti",
        });
      }
    },
    [setHata]
  );

  const resetFeedback = useCallback(() => setFeedback(null), []);

  return { feedback, geriBildirimGonder, resetFeedback };
}
