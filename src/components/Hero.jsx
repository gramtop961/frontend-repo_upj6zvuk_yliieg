import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">All-In-One YouTube Auto Video Generator</h1>
          <p className="mt-4 text-blue-100/90 text-lg sm:text-xl">
            An autonomous YouTube automation engine inside Flames.Blue. Trend → Script → Voice → B‑roll → Edit → MP4.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950" />
    </section>
  );
}
