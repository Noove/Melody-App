import { useRef, useEffect, useState } from "react";

const PianoRoll = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tiles are stored as x, y, size, highlight
  const [tiles, _setTiles] = useState<[number, number, number, boolean][]>([]);
  const tilesRef = useRef(tiles);

  function setTiles(tiles: [number, number, number, boolean][]) {
    tilesRef.current = tiles;
    _setTiles(tiles);
  }

  const dpr = window.devicePixelRatio || 1;
  const dh = 50;
  const dw = 220;

  function resizeCanvas() {
    if (!canvasRef.current || !canvasContainer.current) return;

    canvasRef.current.width = canvasContainer.current.clientWidth * dpr;
    canvasRef.current.height = canvasContainer.current.clientHeight * dpr;

    // Redraw background
    drawBackgroundCells();
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

  function drawCell(x: number, y: number, s: number, h: boolean) {
    if (!canvasRef.current || !canvasContainer.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const cellRounding = [10, 10, 10, 10];

    if (h) {
      context.strokeStyle = "rgba(120,35,230,0.8)";
      context.fillStyle = "rgba(120,35,230,0.8)";
    } else {
      context.strokeStyle = "rgba(120,35,230,0.5)";
      context.fillStyle = "rgba(120,35,230,0.5)";
    }

    context.beginPath();
    context.roundRect(y * dw, x * dh, dw * s, dh, cellRounding);
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

    // Return if cell is already filled
    if (
      tilesRef.current.find(([cell_i, cell_j]) => {
        return cell_i === i && cell_j === j;
      })
    ) {
      return;
    }

    setTiles([...tilesRef.current, [i, j, 1, false]]);
  }

  function handleCanvasMouse(e: MouseEvent) {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    const i = Math.floor(y / dh);
    const j = Math.floor(x / dw);

    // Check if any tile is hovered over
    const tile = tilesRef.current.find(([cell_i, cell_j]) => {
      return cell_i === i && cell_j === j;
    });

    if (tile) {
      // Highlight hovered tile
      const newTiles = tilesRef.current.map(([cell_i, cell_j, s, h]) => {
        if (cell_i === i && cell_j === j) {
          return [cell_i, cell_j, s, true];
        } else {
          return [cell_i, cell_j, s, false];
        }
      });

      setTiles(newTiles);
    } else {
      const newTiles = tilesRef.current.map(([cell_i, cell_j, s, h]) => {
        return [cell_i, cell_j, s, false];
      });

      setTiles(newTiles);
    }

    // Show cursor to ew-resize when close to right or left edge of cell
    if (x % dw > dw - 10 || x % dw < 10) {
      canvasRef.current.style.cursor = "ew-resize";
    } else {
      canvasRef.current.style.cursor = "default";
    }
  }

  const animate = () => {
    // Redraw background
    drawBackgroundCells();

    // Redraw tiles
    tilesRef.current.forEach(([x, y, s, h]) => drawCell(x, y, s, h));

    // Request next frame
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    resizeCanvas();

    canvasRef.current?.addEventListener("click", handleCanvasClick);
    canvasRef.current?.addEventListener("mousemove", handleCanvasMouse);
    window.addEventListener("resize", resizeCanvas);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvasRef.current?.removeEventListener("click", handleCanvasClick);
      canvasRef.current?.removeEventListener("mousemove", handleCanvasMouse);
    };
  }, []);

  return (
    <div ref={canvasContainer} className="h-full w-full flex-1">
      <canvas className="h-full w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default PianoRoll;
