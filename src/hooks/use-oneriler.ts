import { useState, useEffect, useCallback, useRef } from "react";
import { MesajOnerisi, GecmisKaydi, HataState, Ton, IliskiAsamasi, Hedef, SohbetMesaji } from "@/lib/types";

function hataTipiBelirle(status: number): HataState["tip"] {
  if (status === 429) return "rateLimit";
  if (status >= 500) return "sunucu";
  if (status >= 400) return "input";
  return "genel";
}

export function useOneriler(
  toastGoster: (mesaj: string, tip: "basari" | "hata" | "bilgi") => void
) {
  const [oneriler, setOneriler] = useState<MesajOnerisi[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<HataState | null>(null);
  const [kalanSure, setKalanSure] = useState<number>(0);
  const sonuclarRef = useRef<HTMLElement>(null);

  /* Rate limit geri sayımı */
  useEffect(() => {
    if (hata?.tip !== "rateLimit" || !hata.retryAfter) return;
    setKalanSure(hata.retryAfter);
    const interval = setInterval(() => {
      setKalanSure((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setHata(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hata]);

  const oneriAl = useCallback(
    async (
      sohbet: SohbetMesaji[],
      eklemekIstedikleri: string,
      ton: Ton,
      asama: IliskiAsamasi,
      hedef: Hedef
    ) => {
      if (sohbet.length === 0) return;

      setYukleniyor(true);
      setHata(null);

      try {
        const res = await fetch("/api/oneri", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sohbet, eklemekIstedikleri, ton, asama, hedef }),
        });

        const data = await res.json();

        if (!res.ok) {
          const retryAfter = parseInt(res.headers.get("Retry-After") || "", 10);
          const tip = hataTipiBelirle(res.status);
          setHata({
            mesaj: data.hata || "Bir hata oluştu.",
            tip,
            retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
          });
          return;
        }

        setOneriler(data.oneriler);

        /* Mobilde sonuçlara otomatik kaydır */
        if (window.innerWidth < 1024) {
          setTimeout(() => {
            sonuclarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }

        /* Geçmişe kaydet */
        try {
          const yeniKayit: GecmisKaydi = {
            id: Date.now().toString(),
            tarih: new Date().toISOString(),
            sohbet,
            ton,
            asama,
            hedef,
            oneriler: data.oneriler,
          };
          const mevcut = window.localStorage.getItem("fm_gecmis");
          let liste: GecmisKaydi[] = [];
          if (mevcut) {
            const parsed = JSON.parse(mevcut);
            if (Array.isArray(parsed)) {
              liste = parsed.filter((item: unknown) => {
                const g = item as Record<string, unknown>;
                return (
                  typeof g === "object" &&
                  g !== null &&
                  typeof g.id === "string" &&
                  typeof g.tarih === "string" &&
                  typeof g.ton === "string" &&
                  typeof g.asama === "string" &&
                  typeof g.hedef === "string" &&
                  Array.isArray(g.sohbet) &&
                  Array.isArray(g.oneriler) &&
                  g.sohbet.every(
                    (m: unknown) =>
                      typeof m === "object" &&
                      m !== null &&
                      typeof (m as Record<string, unknown>).gonderen === "string" &&
                      typeof (m as Record<string, unknown>).metin === "string"
                  ) &&
                  g.oneriler.every(
                    (o: unknown) =>
                      typeof o === "object" &&
                      o !== null &&
                      typeof (o as Record<string, unknown>).mesaj === "string" &&
                      typeof (o as Record<string, unknown>).aciklama === "string"
                  )
                );
              }) as GecmisKaydi[];
            }
          }
          const yeniListe = [yeniKayit, ...liste].slice(0, 50);
          window.localStorage.setItem("fm_gecmis", JSON.stringify(yeniListe));
        } catch {
          // ignore
        }
      } catch {
        setHata({
          mesaj: "İnternet bağlantın kesik gibi görünüyor. Kontrol edip tekrar dene.",
          tip: "baglanti",
        });
      } finally {
        setYukleniyor(false);
      }
    },
    []
  );

  const hataKapat = useCallback(() => setHata(null), []);

  return {
    oneriler,
    yukleniyor,
    hata,
    kalanSure,
    sonuclarRef,
    oneriAl,
    hataKapat,
    setOneriler,
  };
}
