import { NextRequest, NextResponse } from "next/server";
import {
  asamalar,
  FeedbackRequest,
  hedefler,
  tonlar,
} from "@/lib/types";
import { saveFeedback } from "@/lib/feedback-store";

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { deger, ton, asama, hedef } = body;

    const gecerliDeger = deger === "iyi" || deger === "kotu";
    const gecerliTon = tonlar.some((t) => t.id === ton);
    const gecerliAsama = asamalar.some((a) => a.id === asama);
    const gecerliHedef = hedefler.some((h) => h.id === hedef);

    if (!gecerliDeger || !gecerliTon || !gecerliAsama || !gecerliHedef) {
      return NextResponse.json(
        { hata: "Geçersiz geri bildirim." },
        { status: 400 }
      );
    }

    const saved = await saveFeedback({ deger, ton, asama, hedef });

    console.info("Anonim geri bildirim alındı:", {
      deger,
      ton,
      asama,
      hedef,
      kaynak: saved.source,
    });

    return NextResponse.json({ tamam: true });
  } catch (error) {
    console.error("Geri bildirim hatası:", error);
    return NextResponse.json(
      { hata: "Geri bildirim kaydedilemedi." },
      { status: 500 }
    );
  }
}
