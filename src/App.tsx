import PianoRoll from "./components/PianoRoll";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-full flex-col bg-black">
        {/* TOP CONTENT */}
        {/* <TopBar /> */}

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <aside>{/* SIDEBAR */}</aside>

          {/* PIANO ROLL */}
          <PianoRoll />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
