"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

export function DataDeletion() {
  const [silindi, setSilindi] = useState(false);

  function tumunuSil() {
    if (
      !confirm(
        "Tüm verilerini silmek istediğine emin misin?\n\nBu işlem:\n• Favorilerini\n• Geçmiş kayıtlarını\n• Sohbet mesajlarını\n• Çerez iznini\n\nSilecek ve geri alınamayacak."
      )
    )
      return;

    try {
      window.localStorage.removeItem("fm_favoriler");
      window.localStorage.removeItem("fm_gecmis");
      window.localStorage.removeItem("fm_sohbet");
      window.localStorage.removeItem("fm_cookie_consent");
      document.cookie = "fm_client_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setSilindi(true);
    } catch {
      alert("Veriler silinirken bir hata oluştu. Lütfen tarayıcı ayarlarından manuel olarak temizleyin.");
    }
  }

  if (silindi) {
    return (
      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" strokeWidth={2} />
        <h3 className="mt-3 text-lg font-bold text-emerald-800">
          Tüm verilerin silindi
        </h3>
        <p className="mt-1 text-sm text-emerald-700">
          Favorilerin, geçmişin ve sohbet mesajların tarayıcından kaldırıldı.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
          type="button"
        >
          Sayfayı Yenile
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" strokeWidth={2} />
        <div>
          <h3 className="text-lg font-bold text-red-800">
            Verilerini Sil
          </h3>
          <p className="mt-1 text-sm text-red-700 leading-6">
            Tüm yerel verilerini (favoriler, geçmiş, sohbet mesajları ve çerez tercihleri)
            tarayıcından kalıcı olarak silebilirsin. Bu işlem geri alınamaz.
          </p>
          <button
            onClick={tumunuSil}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
            type="button"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
            Tüm Verilerimi Sil
          </button>
        </div>
      </div>
    </div>
  );
}
