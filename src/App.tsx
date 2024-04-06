import PianoRoll from "./components/PianoRoll";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-black">
        {/* TOP CONTENT */}
        <div className="flex-1">
          <aside>{/* SIDEBAR */}</aside>

          {/* PIANO ROLL */}
          <PianoRoll />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default App;
