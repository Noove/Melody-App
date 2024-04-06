import PianoRollController from "@/lib/piano-roll";
import { useRef, useEffect, useState } from "react";

const PianoRoll = () => {
  const [controller, setController] = useState<PianoRollController | null>(
    null,
  );
  const canvasContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && canvasContainer.current && !controller) {
      const controller = new PianoRollController(
        canvasRef.current,
        canvasContainer.current,
      );
      setController(controller);

      requestAnimationFrame(() => {
        controller.draw();
      });
    }
  }, []);

  return (
    <div ref={canvasContainer} className="h-full w-full flex-1">
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default PianoRoll;
