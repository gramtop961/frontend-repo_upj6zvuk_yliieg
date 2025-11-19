import Hero from './components/Hero';
import Steps from './components/Steps';
import SystemInstruction from './components/SystemInstruction';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <Steps />
      <SystemInstruction />
      <footer className="py-10 text-center text-blue-200/70">
        Ready phrase: “Create a full video automatically.”
      </footer>
    </div>
  );
}

export default App;
