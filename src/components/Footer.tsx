import { useState } from "react";
import { Volume, Volume1, Volume2, Play, Square, Settings } from "lucide-react";

const Footer = () => {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [time, setTime] = useState();

  const CircleButton = ({
    icon,
    isPlaying,
    setIsPlaying,
    className,
  }: {
    icon: React.ReactNode;
    isPlaying?: boolean;
    setIsPlaying?: (value: boolean) => void;
    className?: string;
  }) => {
    return (
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ${className}`}
        onClick={() => {
          if (setIsPlaying) {
            setIsPlaying(!isPlaying);
          }
        }}
      >
        {icon}
      </button>
    );
  };
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
            id="mySlider"
          />
        </div>

        <span className="mr-10 text-xl text-white">00:00.00</span>

        <div>
          {isPlaying ? (
            <CircleButton
              icon={<Square color="#fff" />}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          ) : (
            <CircleButton
              icon={<Play color="#fff" />}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
        </div>

        <CircleButton
          className="ml-auto mr-10"
          icon={<Settings color="#fff" />}
        />
        <button className="text-l bg-highlight flex h-12 items-center justify-center rounded-md px-4 text-white">
          Export to file
        </button>
      </footer>
    </>
  );
};

export default Footer;
