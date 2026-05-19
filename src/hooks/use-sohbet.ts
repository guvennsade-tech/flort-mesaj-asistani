import { useState, useEffect, useCallback } from "react";
import { SohbetMesaji } from "@/lib/types";

export function useSohbet() {
  const [sohbet, setSohbet] = useState<SohbetMesaji[]>([]);

  /* İlk yükleme */
  useEffect(() => {
    try {
      const kayitli = window.localStorage.getItem("fm_sohbet");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (
          Array.isArray(parsed) &&
          parsed.every(
            (m) =>
              typeof m === "object" &&
              m !== null &&
              (m.gonderen === "sen" || m.gonderen === "o") &&
              typeof m.metin === "string"
          )
        ) {
          setSohbet(parsed);
        }
      }
    } catch {
      window.localStorage.removeItem("fm_sohbet");
    }
  }, []);

  /* Debounced persist */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => {
      window.localStorage.setItem("fm_sohbet", JSON.stringify(sohbet));
    }, 300);
    return () => clearTimeout(id);
  }, [sohbet]);

  const ornekYukle = useCallback(() => {
    setSohbet([{ gonderen: "o", metin: "bugün seni görünce mutlu oldum :)" }]);
  }, []);

  const sohbetTemizle = useCallback(() => {
    setSohbet([]);
  }, []);

  return { sohbet, setSohbet, ornekYukle, sohbetTemizle };
}
