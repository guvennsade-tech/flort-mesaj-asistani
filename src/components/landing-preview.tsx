import { asamalar, tonlar } from "@/lib/types";

export function LandingPreview() {
  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
        <div className="min-h-20 text-[15px] leading-7 text-slate-400">
          Karşı tarafın mesajını ve kendi cevaplarını sırayla ekle...
        </div>
        <div className="text-right text-xs font-medium text-slate-400">
          Sohbet geçmişi
        </div>
      </div>

      <div id="tonlar">
        <p className="mb-2 text-sm font-bold text-white">Tonunu Seç</p>
        <div className="flex flex-wrap gap-2">
          {tonlar.map((item, index) => (
            <span
              key={item.id}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                index === 1
                  ? "border-pink-400 bg-pink-500 text-white shadow-lg shadow-pink-500/25"
                  : "border-white/15 bg-white/10 text-slate-200"
              }`}
            >
              <span className="mr-2">{item.emoji}</span>
              {item.etiket}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-white">İlişki Aşaması</p>
        <div className="flex flex-wrap gap-2">
          {asamalar.map((item) => (
            <span
              key={item.id}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                item.id === "yazisiyoruz"
                  ? "border-violet-400 bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                  : "border-white/15 bg-white/10 text-slate-200"
              }`}
            >
              {item.etiket}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
