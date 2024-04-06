import PianoRoll from "./components/PianoRoll";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
function App() {
  return (
    <>
      <div className="flex h-screen w-full flex-col bg-black">
        {/* TOP CONTENT */}
        <TopBar />

        {/* MAIN CONTENT */}
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
