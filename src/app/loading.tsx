export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col">
      {/* skeleton: mirrors the section order in page.tsx */}
      <div className="h-16 border-b border-white/5 animate-pulse bg-white/5" aria-hidden="true" />
      <div className="section-container flex-1 py-24 space-y-16">
        <div className="space-y-4">
          <div className="h-3 w-40 rounded-full bg-white/10 mx-auto animate-pulse" aria-hidden="true" />
          <div className="h-12 w-2/3 rounded-xl bg-white/10 mx-auto animate-pulse" aria-hidden="true" />
          <div className="h-5 w-3/5 rounded bg-white/5 mx-auto animate-pulse" aria-hidden="true" />
          <div className="h-12 w-52 rounded-[24px] bg-primary/20 mx-auto animate-pulse" aria-hidden="true" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map(k => (
            <div key={k} className="card p-8 space-y-4 animate-pulse" aria-hidden="true">
              <div className="h-10 w-10 rounded-xl bg-white/10 mx-auto" />
              <div className="h-4 w-32 rounded bg-white/10 mx-auto" />
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-3/4 rounded bg-white/5 mx-auto" />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map(k => (
            <div key={k} className="card p-8 space-y-4 animate-pulse" aria-hidden="true">
              <div className="h-10 w-10 rounded-xl bg-white/10" />
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/5" />
            </div>
          ))}
        </div>

        <div className="card p-8 md:p-12 space-y-4 max-w-xl mx-auto animate-pulse" aria-hidden="true">
          <div className="h-8 w-48 rounded bg-white/10 mx-auto" />
          <div className="h-4 w-3/4 rounded bg-white/5 mx-auto" />
          <div className="h-12 rounded-xl bg-white/5" />
          <div className="h-12 rounded-xl bg-white/5" />
          <div className="h-12 rounded-[24px] bg-primary/20" />
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-busy="true">
        Đang tải nội dung
      </p>
    </div>
  )
}