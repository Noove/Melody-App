import { useState } from "react";
import { Volume, Volume1, Volume2, Play, Square, Settings } from "lucide-react";

import CircleButton from "./CircleButton";

const Footer = () => {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <footer className="flex h-20 w-full items-center bg-white/10 px-10">
        <div className="mr-20 flex h-full items-center gap-x-4">
          {volume > 50 ? (
            <Volume2 color="#fff" />
          ) : volume > 0 ? (
            <Volume1 color="#fff" />
          ) : (
            <Volume color="#fff" />
          )}

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="slider range cursor-pointer accent-white/5"
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
        </div>

        <span className="mr-10 text-xl text-white">00:00.00</span>

        <CircleButton
          icon={isPlaying ? <Square color="#fff" /> : <Play color="#fff" />}
          onClick={() => setIsPlaying(!isPlaying)}
        />

        <CircleButton
          className="ml-auto mr-10"
          icon={<Settings color="#fff" />}
        />

        <button className="text-l bg-highlight flex h-12 items-center justify-center rounded-md px-4 text-white">
          {(window as any).chrome ? "Send to device" : "Save to file"}
        </button>
      </footer>
    </>
  );
};

export default Footer;
