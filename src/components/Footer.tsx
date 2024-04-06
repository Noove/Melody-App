import { useEffect, useState } from "react";
import { Volume, Volume1, Volume2, Play, Square, Settings } from "lucide-react";
import CircleButton from "./CircleButton";
import usePlaybackState from "@/lib/state";

const Footer = () => {
  const [volume, setVolume] = useState(75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const { humanTime } = usePlaybackState();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPlaying((prevState) => !prevState);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

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

        <span className="mb-1 mr-5 flex justify-self-center text-2xl">
          {humanTime}
        </span>

        <CircleButton
          className="mr-20"
          icon={isPlaying ? <Square color="#fff" /> : <Play color="#fff" />}
          onClick={() => setIsPlaying(!isPlaying)}
        />

        {/* add bpm input */}
        <div className="mb-1 flex items-center text-xl">
          <input
            type="text"
            defaultValue={bpm}
            className="mr-2 h-12 w-16 rounded-md bg-white/10 text-center text-white"
            onChange={(e) => setBpm(parseInt(e.target.value))}
          ></input>
          <span className="text-white">BPM</span>
        </div>

        <CircleButton
          className="ml-auto mr-10"
          icon={<Settings color="#fff" />}
        />

        <button className="text-l mb-1 flex h-12 items-center justify-center rounded-md bg-highlight px-4">
          {(window as any).chrome ? "Send to device" : "Save to file"}
        </button>
      </footer>
    </>
  );
};

export default Footer;
