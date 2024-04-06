import { useState } from "react";
import PianoRoll from "./components/PianoRoll";
import { Volume, Volume1, Volume2 } from "lucide-react";

function App() {
  const [volume, setVolume] = useState(50);

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
        <footer className="w-full bg-white/5 px-10">
          <div className="flex gap-x-4">
            {volume > 50 ? <Volume2 /> : volume > 0 ? <Volume1 /> : <Volume />}

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              className="slider"
              onChange={(e) => setVolume(parseInt(e.target.value))}
              id="mySlider"
            />
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
