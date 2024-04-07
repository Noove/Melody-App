import PianoRollController from "@/lib/piano-roll";
import { useRef, useEffect, useState } from "react";

const PianoRoll = () => {
  const [controller, setController] = useState<PianoRollController | null>(
    null,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && !controller) {
      const controller = new PianoRollController(canvasRef.current);
      (window as any).controller = controller;
      setController(controller);

      controller.draw();
    }
  }, []);

  return (
    // <div ref={canvasContainer} className="h-full w-full flex-1">
    <canvas className="h-full w-full flex-1" ref={canvasRef}></canvas>
    // </div>
  );
};

export default PianoRoll;
