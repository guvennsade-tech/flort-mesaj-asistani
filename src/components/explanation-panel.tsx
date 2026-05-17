interface ExplanationPanelProps {
  toneLabel?: string;
  stageLabel?: string;
  goalLabel?: string;
  goalDescription?: string;
}

export function ExplanationPanel({
  toneLabel,
  stageLabel,
  goalLabel,
  goalDescription,
}: ExplanationPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Açıklama paneli
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-950">
            Bu öneri neden verildi?
          </h3>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-800">Mesaj analizi</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Mesajın ana niyeti korunur; gereksiz baskı, belirsizlik ve fazla
            uzunluk azaltılır.
          </p>
        </div>
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm font-bold text-violet-900">Öneri mantığı</p>
          <p className="mt-2 text-sm leading-6 text-violet-700">
            {toneLabel} tonuyla {stageLabel} aşamasına uygun daha doğal bir akış
            hedeflendi.
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-bold text-emerald-900">Risk seviyesi</p>
          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Düşük risk. Mesaj saygılı, kısa ve cevap vermeyi kolaylaştıracak
            şekilde tutuldu.
          </p>
        </div>
        <div className="rounded-2xl bg-pink-50 p-4">
          <p className="text-sm font-bold text-pink-900">Hedef etki</p>
          <p className="mt-2 text-sm leading-6 text-pink-700">
            {goalLabel}: {goalDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
