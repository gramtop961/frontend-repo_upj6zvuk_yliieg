import { useState } from 'react';

const TRIGGER = 'Create a full video automatically.';

export default function Runner() {
  const [topic, setTopic] = useState('Why AI copilots are changing software in 2025');
  const [voice, setVoice] = useState('male_tech_voice');
  const [style, setStyle] = useState('tech_fastpaced');
  const [format, setFormat] = useState('1080p');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

  async function run() {
    setError('');
    setResult(null);
    if (!BASE) {
      setError('Backend URL is not set. Please provide VITE_BACKEND_URL in your environment.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger_phrase: TRIGGER, topic, voice, style, format })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Run the Full Pipeline</h2>
        <p className="text-blue-200/80 mb-6">Type your topic, then start with the ready phrase. The system will run Trend → Script → Voice → B‑roll → Edit and return a final MP4 link.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Topic</label>
            <input value={topic} onChange={(e)=>setTopic(e.target.value)} className="w-full bg-slate-900 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Enter a topic" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Voice</label>
            <select value={voice} onChange={(e)=>setVoice(e.target.value)} className="w-full bg-slate-900 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="male_tech_voice">male_tech_voice</option>
              <option value="female_neutral">female_neutral</option>
              <option value="alloy">alloy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Style</label>
            <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full bg-slate-900 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="tech_fastpaced">tech_fastpaced</option>
              <option value="documentary">documentary</option>
              <option value="cinematic">cinematic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200/80 mb-1">Format</label>
            <select value={format} onChange={(e)=>setFormat(e.target.value)} className="w-full bg-slate-900 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              <option value="1080p">1080p</option>
              <option value="16:9">16:9</option>
              <option value="9:16">9:16</option>
              <option value="square">square</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={run} disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-5 py-3 rounded-xl font-semibold text-white transition">
            {loading ? 'Running…' : 'Create a full video automatically.'}
          </button>
          <span className="text-blue-200/70 text-sm">Trigger phrase must match exactly.</span>
        </div>

        {error && (
          <div className="mt-4 text-red-300 bg-red-900/30 border border-red-400/30 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 text-blue-100">
            <h3 className="text-xl font-semibold text-white mb-3">Result</h3>
            <div className="space-y-2 text-sm">
              {result.trend && (
                <div>
                  <div className="text-blue-300">Trend Pick</div>
                  <div className="text-blue-100/90">{result.trend.topic} — Viral score {result.trend.viral_score}</div>
                </div>
              )}
              {result.script && (
                <details className="bg-slate-900/60 rounded-lg p-3">
                  <summary className="cursor-pointer text-blue-300">Script</summary>
                  <pre className="whitespace-pre-wrap text-blue-100/80 mt-2">{result.script}</pre>
                </details>
              )}
              {Array.isArray(result.broll_urls) && result.broll_urls.length > 0 && (
                <div>
                  <div className="text-blue-300 mb-1">B‑roll</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.broll_urls.map((u, i) => (
                      <li key={i}><a href={u} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{u}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {result.voiceover_url && (
                <div>
                  <div className="text-blue-300">Voiceover</div>
                  <a className="text-blue-400 hover:underline" href={result.voiceover_url} target="_blank" rel="noreferrer">{result.voiceover_url}</a>
                </div>
              )}
              {result.final_url && (
                <div>
                  <div className="text-blue-300">Final MP4</div>
                  <a className="text-blue-400 hover:underline" href={result.final_url} target="_blank" rel="noreferrer">{result.final_url}</a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
