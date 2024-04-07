import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  function sendRequest(text: string) {
    fetch(`https://martinusius.sk/tts.php?text=${text}`)
      .then((response) => response.blob())
      .then((blob) => {
        const audio = new Audio(URL.createObjectURL(blob));
        setAudio(audio);
        audio.play();
      });
  }

  function uploadToDevice(audio: HTMLAudioElement | null) {
    // TO DO: Implement upload to device
    if (audio) {
      console.log("Uploading audio to device...");
    }
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
      <div className="flex w-full justify-end">
        <button
          className="bg-highlight mr-5 mt-5 self-end rounded-lg p-2"
          onClick={() => sendRequest(text)}
        >
          Generate Voice
        </button>
        <button
          className="mt-5 self-end rounded-lg bg-white/5 p-2"
          onClick={() => uploadToDevice(audio)}
        >
          Upload to device
        </button>
      </div>
    </div>
  );
};
export default TextToSpeech;
