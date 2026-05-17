"use client";

export function SuggestionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-l-4 border-slate-200 bg-white shadow-sm"
        >
          <div className="grid gap-0 md:grid-cols-[1fr_160px]">
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
              <div className="flex gap-2 pl-10">
                <div className="h-6 w-16 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="pl-10 space-y-1">
                <div className="h-3 w-full rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>

            <div className="flex border-t border-slate-100 md:flex-col md:border-l md:border-t-0">
              <div className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-4">
                <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-3 w-12 rounded bg-slate-200 animate-pulse" />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 md:border-l-0 md:border-t">
                <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-3 w-14 rounded bg-slate-200 animate-pulse" />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-slate-100 px-3 py-4 md:border-l-0 md:border-t">
                <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-3 w-12 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
