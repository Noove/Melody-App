import { useEffect, useState } from "react";
import { Volume, Volume1, Volume2, Play, Square, Settings } from "lucide-react";
import CircleButton from "./CircleButton";
import usePlaybackState from "@/lib/state";
import PianoRollController from "@/lib/piano-roll";
import * as Tone from "tone";

const Footer = () => {
  const [volume, setVolume] = useState(75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const { humanTime } = usePlaybackState();

  // function onPlay(playing: boolean) {
  //   const oldSynths: Record<string, Tone.Synth> = (window as any).synths || {};
  //   for (const key in oldSynths) {
  //     oldSynths[key].dispose();
  //   }

  //   if (!playing) return;

  //   const controller: PianoRollController = (window as any).controller;

  //   // descending from B6
  //   const noteScale = [
  //     "B6",
  //     "A#6",
  //     "A6",
  //     "G#6",
  //     "G6",
  //     "F#6",
  //     "F6",
  //     "E6",
  //     "D#6",
  //     "D6",
  //     "C#6",
  //     "C6",
  //     "B5",
  //     "A#5",
  //     "A5",
  //     "G#5",
  //     "G5",
  //     "F#5",
  //     "F5",
  //     "E5",
  //     "D#5",
  //     "D5",
  //     "C#5",
  //     "C5",
  //     "B4",
  //     "A#4",
  //     "A4",
  //     "G#4",
  //     "G4",
  //     "F#4",
  //     "F4",
  //     "E4",
  //     "D#4",
  //     "D4",
  //     "C#4",
  //     "C4",
  //     "B3",
  //     "A#3",
  //     "A3",
  //     "G#3",
  //     "G3",
  //     "F#3",
  //     "F3",
  //     "E3",
  //     "D#3",
  //     "D3",
  //     "C#3",
  //     "C3",
  //     "B2",
  //     "A#2",
  //     "A2",
  //     "G#2",
  //     "G2",
  //     "F#2",
  //     "F2",
  //     "E2",
  //     "D#2",
  //     "D2",
  //     "C#2",
  //     "C2",
  //     "B1",
  //     "A#1",
  //     "A1",
  //     "G#1",
  //     "G1",
  //     "F#1",
  //     "F1",
  //     "E1",
  //     "D#1",
  //     "D1",
  //     "C#1",
  //     "C1",
  //     "B0",
  //     "A#0",
  //     "A0",
  //     "G#0",
  //     "G0",
  //     "F#0",
  //     "F0",
  //     "E0",
  //     "D#0",
  //     "D0",
  //     "C#0",
  //     "C0",
  //   ];
  //   const synths: Record<string, Tone.Synth> = {};

  //   const start = Tone.now();
  //   const step = 60 / bpm;

  //   controller.notes.forEach((note) => {
  //     const noteNote = noteScale[note._positionY];
  //     if (!synths[noteNote]) {
  //       synths[noteNote] = new Tone.Synth().toDestination();
  //     }

  //     synths[noteNote].triggerAttackRelease(
  //       noteNote,
  //       step * note._size,
  //       start + step * note._positionX,
  //     );
  //   });

  //   (window as any).synths = synths;
  // }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsPlaying((prevState) => {
          (window as any).controller.togglePlay();
          return !prevState;
        });
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

        <span className="mb-1 mr-5 flex w-full max-w-44 justify-self-center text-2xl">
          {humanTime}
        </span>

        <CircleButton
          className="mr-20"
          icon={isPlaying ? <Square color="#fff" /> : <Play color="#fff" />}
          onClick={() => {
            setIsPlaying(!isPlaying);
            (window as any).controller.togglePlay();
          }}
        />

        {/* add bpm input */}
        <div className="mb-1 flex items-center text-xl">
          <input
            className="mr-2 h-12 w-16 rounded-md bg-white/10 text-center text-white"
            type="number"
            value={bpm}
            onChange={(e) => {
              setBpm(parseInt(e.target.value));
              (window as any).controller.setBPM(parseInt(e.target.value));
            }}
          />
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
