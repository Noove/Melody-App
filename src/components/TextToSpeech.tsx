import { createHeaderFile, bufferToRaw, fileToBuffer, downloadString, downloadRaw } from "@/lib/convert";
import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [voice, setVoice] = useState(true);

  function play(text: string, voice: boolean) {
    fetch(
      `https://martinusius.sk/tts.php?text=${text}&${voice ? "gender=male" : "gender=female"}`,
    )
      .then((response) => response.blob())
      .then(async (blob) => {
        const audio = new Audio(URL.createObjectURL(blob));

        // setAudio(audio);
        audio.play();
      });
  }

  function saveToFile(text: string, voice: boolean) {
    fetch(
      `https://martinusius.sk/tts.php?text=${text}&${voice ? "gender=male" : "gender=female"}`,
    )
      .then((response) => response.blob())
      .then(async (blob) => {
        const buffer = await fileToBuffer(blob);
        const raw = bufferToRaw(buffer);
        const voiceHeader = createHeaderFile(raw);

        downloadRaw(raw, 'voice.raw');
        downloadString(voiceHeader, 'voice.h');
      });
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-20">
      <h1 className="mb-5">Enter text:</h1>
      <textarea
        className="h-96 w-full border-collapse bg-white/10 p-2 text-sm"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <div className="mt-4 flex w-full items-center">
        <div className="flex gap-x-2">
          <p>Man</p>
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              onChange={() => {
                setVoice(!voice);
              }}
            ></input>
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
          </label>

          <p>Woman</p>
        </div>
        <div className="ml-auto">
          <button
            className="bg-highlight mr-4 self-end rounded-lg p-2"
            onClick={() => play(text, voice)}
          >
            Generate Voice
          </button>
          <button
            className="self-end rounded-lg bg-white/5 p-2"
            onClick={() => saveToFile(text, voice)}
          >
            Save to file
          </button>
        </div>
      </div>
    </div>
  );
};
export default TextToSpeech;
