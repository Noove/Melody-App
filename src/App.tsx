import PianoRoll from "./components/PianoRoll";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";
import Menu from "./components/Menu";
import TextToSpeech from "./components/TextToSpeech";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-full flex-col bg-black">
        {selected == "voice" ? (
          <TextToSpeech />
        ) : selected == "music" ? (
          <>
            <PianoRoll /> <Footer />
          </>
        ) : (
          <Menu setSelected={setSelected} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
