import { useState, useEffect, useCallback } from "react";
import { MesajOnerisi } from "@/lib/types";

export function useFavoriler(toastGoster: (mesaj: string, tip: "basari" | "hata" | "bilgi") => void) {
  const [favoriler, setFavoriler] = useState<MesajOnerisi[]>([]);

  /* İlk yükleme */
  useEffect(() => {
    try {
      const kayitli = window.localStorage.getItem("fm_favoriler");
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item: unknown) =>
              typeof item === "object" &&
              item !== null &&
              typeof (item as MesajOnerisi).mesaj === "string" &&
              typeof (item as MesajOnerisi).aciklama === "string"
          ) as MesajOnerisi[];
          setFavoriler(valid);
        }
      }
    } catch {
      window.localStorage.removeItem("fm_favoriler");
    }
  }, []);

  /* Debounced persist */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => {
      window.localStorage.setItem("fm_favoriler", JSON.stringify(favoriler));
    }, 300);
    return () => clearTimeout(id);
  }, [favoriler]);

  const favoriDegistir = useCallback(
    (mesaj: string, aciklama: string) => {
      const favoriMi = favoriler.some((f) => f.mesaj === mesaj);
      if (favoriMi) {
        setFavoriler((mevcut) => mevcut.filter((f) => f.mesaj !== mesaj));
        toastGoster("Favorilerden kaldırıldı", "bilgi");
      } else {
        setFavoriler((mevcut) => [...mevcut, { mesaj, aciklama }]);
        toastGoster("Favorilere eklendi", "basari");
      }
    },
    [favoriler, toastGoster]
  );

  return { favoriler, favoriDegistir };
}
