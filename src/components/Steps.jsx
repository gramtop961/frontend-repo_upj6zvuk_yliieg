export default function Steps() {
  const steps = [
    { id: 1, title: 'Trend Detection', desc: 'Find what is trending right now across Tech & AI, Gaming, Automobiles, and viral topics.' },
    { id: 2, title: 'Script Generation', desc: 'Create long-form + short-form scripts, scenes, title, description, and tags.' },
    { id: 3, title: 'Auto Voiceover', desc: 'Generate voiceover JSON action with your selected voice.' },
    { id: 4, title: 'AI B‑roll', desc: 'Generate scene-by-scene b‑roll clips from prompts.' },
    { id: 5, title: 'Auto Edit', desc: 'Merge voiceover and b‑roll into a polished 1080p video.' },
    { id: 6, title: 'Final Output', desc: 'Return MP4 video link, thumbnail text, title + SEO, and optional upload JSON.' }
  ];

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.id} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 text-blue-100 hover:bg-slate-800/80 transition">
              <div className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold mb-4">{s.id}</div>
              <h3 className="text-white font-semibold mb-1">{s.title}</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
