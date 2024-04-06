import { useRef, useEffect, useState } from "react";
import { create } from "zustand";

type TTileStore = {
  tiles: [number, number][];
  addTile: (i: number, j: number) => void;
};

const tileStore = create<TTileStore>((set) => ({
  tiles: [],
  addTileToStore: (i: number, j: number) =>
    set((state) => ({ tiles: [...state.tiles, [i, j]] })),
}));

const PianoRoll = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { tiles, addTileToStore } = tileStore();

  const dpr = window.devicePixelRatio || 1;
  const dh = 50;
  const dw = 220;

  function resizeCanvas() {
    if (!canvasRef.current || !canvasContainer.current) return;

    canvasRef.current.width = canvasContainer.current.clientWidth * dpr;
    canvasRef.current.height = canvasContainer.current.clientHeight * dpr;

    // Redraw background
    drawBackgroundCells();

    // Redraw tiles if there are any
    console.log(tiles);
    if (tiles) {
      console.log("redrawing cells");
      tiles.forEach(([i, j]) => drawCell(i, j));
    }
  }

  function drawBackgroundCells() {
    if (!canvasRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    for (let i = 0; i < height / dh; i++) {
      context.save();

      context.fillStyle = i % 2 === 0 ? "rgb(15,15,15)" : "rgb(20,20,20";
      context.fillRect(0, i * dh, width, i * dh + dh);
      context.restore();
    }
    for (let i = 1; i < Math.ceil(width / dw); i++) {
      context.save();
      context.strokeStyle =
        i % 4 === 0 ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.2)";
      context.beginPath();
      context.moveTo(i * dw, 0);
      context.lineTo(i * dw + 1, height);
      context.stroke();
      context.restore();
    }
  }

  function drawCell(i: number, j: number) {
    if (!canvasRef.current || !canvasContainer.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const cellRounding = [10, 10, 10, 10];

    context.strokeStyle = "rgb(120,35,230)";
    context.fillStyle = "rgba(120,35,230)";

    context.beginPath();
    context.roundRect(j * dw, i * dh, dw, dh, cellRounding);
    context.stroke();
    context.fill();
  }

  function handleCanvasClick(e: MouseEvent) {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    const i = Math.floor(y / dh);
    const j = Math.floor(x / dw);

    addTileToStore(i, j);

    drawCell(i, j);
  }

  useEffect(() => {
    resizeCanvas();

    canvasRef.current?.addEventListener("click", handleCanvasClick);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvasRef.current?.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <div ref={canvasContainer} className="h-full w-full flex-1">
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default PianoRoll;
