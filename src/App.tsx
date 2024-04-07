import PianoRoll from "./components/PianoRoll";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-full flex-col bg-black">
        <PianoRoll />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
