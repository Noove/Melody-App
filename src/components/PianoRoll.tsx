import { useRef, useEffect } from "react";

const PianoRoll = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasContainer.current) return;

    console.log(canvasContainer.current.clientHeight, canvasContainer.current.clientWidth);

    const context = canvasRef.current.getContext("2d");

    canvasRef.current.width = canvasContainer.current.clientWidth;
    canvasRef.current.height = canvasContainer.current.clientHeight;

    const dh = 20;
    const dw = 100;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    if (context === null) return;

    for (let i = 0; i < height / dh; i++) {
      context.save();

      context.fillStyle = i % 2 === 0 ? "#bbb" : "#aaa";
      context.fillRect(0, i * dh, width, i * dh + dh);
      context.restore();
    }
    for (let i = 1; i < Math.ceil(width / dw); i++) {
      context.save();
      context.strokeStyle =
        i % 4 === 0 ? "rgba(0,0,0,.3)" : "rgba(255,255,255,.3)";
      context.beginPath();
      context.moveTo(i * dw, 0);
      context.lineTo(i * dw + 1, height);
      context.stroke();
      context.restore();
    }
  }, []);

  return (
    <div ref={canvasContainer} className="h-full w-full flex-1">
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default PianoRoll;
