import { useState, useCallback } from "react";

export function useClipboard(
  toastGoster: (mesaj: string, tip: "basari" | "hata" | "bilgi") => void
) {
  const [kopyalandi, setKopyalandi] = useState<number | null>(null);

  const kopyala = useCallback(
    async (metin: string, index: number) => {
      try {
        await navigator.clipboard.writeText(metin);
        setKopyalandi(index);
        toastGoster("Mesaj panoya kopyalandı", "basari");
        setTimeout(() => setKopyalandi(null), 2000);
      } catch {
        toastGoster("Kopyalanamadı. Manuel olarak seçip kopyalayabilirsiniz.", "hata");
      }
    },
    [toastGoster]
  );

  return { kopyalandi, kopyala };
}
