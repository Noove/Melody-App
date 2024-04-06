import usePlaybackState from "../state";
import Note from "./note.ts";

class PianoRollController {
  private _dpr: number;
  private _canvasWrapper: HTMLDivElement;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _headerHeight: number = 0;
  private _cellWidth: number;
  private _cellHeight: number;

  private _cellHeightCount = 35;
  private _cellWidthCount = 16;

  public _playheadPosition = 0;

  private _startTime: number;

  private notes: Note[] = [];
  private draggingNote: Note | null = null;
  private draggingSide: "left" | "right" | null = null;

  constructor(canvas: HTMLCanvasElement, canvasWrapper: HTMLDivElement) {
    this._canvas = canvas;
    this._canvasWrapper = canvasWrapper;
    this._dpr = window.devicePixelRatio || 1;

    this._ctx = canvas.getContext("2d")!;

    this._canvas.width = Math.floor(
      this._canvasWrapper.clientWidth * this._dpr,
    );
    this._canvas.height = Math.floor(
      this._canvasWrapper.clientHeight * this._dpr,
    );

    this._cellHeight =
      (this._canvas.height - this._headerHeight) / this._cellHeightCount;
    this._cellWidth = this._canvas.width / this._cellWidthCount;

    // Event handlers
    this._canvas.addEventListener("click", this.handleMouseClick.bind(this));
  }

  private drawPlayhead() {
    // Clear playhead top
    this._ctx.fillStyle = "rgb(0,0,0)";
    this._ctx.fillRect(0, 0, this._canvas.width, 50);

    // Playhead body
    this._ctx.fillStyle = "rgb(120,35,230)";
    this._ctx.beginPath();
    this._ctx.moveTo(this._playheadPosition * this._cellWidth - 25, 0);
    this._ctx.lineTo(this._playheadPosition * this._cellWidth + 25, 0);
    this._ctx.lineTo(this._playheadPosition * this._cellWidth + 25, 25);
    this._ctx.lineTo(this._playheadPosition * this._cellWidth, 50);
    this._ctx.lineTo(this._playheadPosition * this._cellWidth - 25, 25);

    this._ctx.closePath();
    this._ctx.fill();

    // Playhead line
    this._ctx.strokeStyle = "rgb(120,35,230)";
    this._ctx.lineWidth = 4;
    this._ctx.beginPath();
    this._ctx.moveTo(this._playheadPosition * this._cellWidth, 0);
    this._ctx.lineTo(
      this._playheadPosition * this._cellWidth,
      this._canvas.height,
    );
    this._ctx.stroke();
  }

  private drawGrid() {
    // Horizontal lines
    for (let i = 0; i < this._cellHeightCount; i++) {
      this._ctx.fillStyle = i % 2 === 0 ? "rgb(15,15,15)" : "rgb(20,20,20";
      this._ctx.lineWidth = 1;

      this._ctx.fillRect(
        0,
        i * this._cellHeight + this._headerHeight,
        this._canvas.width,
        this._cellHeight,
      );
    }

    // Vertical lines
    for (let i = 1; i < this._cellWidthCount; i++) {
      this._ctx.strokeStyle =
        i % 4 === 0 ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.2)";
      this._ctx.beginPath();
      this._ctx.moveTo(i * this._cellWidth, this._headerHeight);
      this._ctx.lineTo(i * this._cellWidth, this._canvas.height);
      this._ctx.stroke();
    }

    // Draw header separator line
    this._ctx.lineWidth = 2;
    this._ctx.strokeStyle = "rgba(255,255,255, .1)";

    this._ctx.beginPath();
    this._ctx.moveTo(0, this._headerHeight);
    this._ctx.lineTo(this._canvas.width, this._headerHeight);
    this._ctx.stroke();
  }

  private beatsToTime(beats: number, bpm: number) {
    var beatDuration = 60000 / bpm;

    var durationInMillis = beats * beatDuration;

    var minutes = Math.floor(durationInMillis / 60000);
    var seconds = Math.floor((durationInMillis % 60000) / 1000);
    var milliseconds = Math.floor((durationInMillis % 1000) / 10);

    var timeString =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds +
      "." +
      (milliseconds < 10 ? "0" : "") +
      (milliseconds < 1 ? "0" : "") +
      milliseconds;

    return timeString;
  }

  private handleMouseClick(e: MouseEvent) {
    const canvasBounds = this._canvas.getBoundingClientRect();
    const cellX = Math.floor((e.clientX * this._dpr) / this._cellWidth);
    const cellY = Math.floor(
      ((e.clientY - canvasBounds.top) * this._dpr) / this._cellHeight,
    );

    const note = new Note(
      this._ctx,
      cellX,
      cellY,
      this._cellWidth,
      this._cellHeight,
      this._headerHeight,
    );

    this.notes.push(note);
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this.draggingNote) {
      const canvasBounds = this._canvas.getBoundingClientRect();

      // Loop over notes and check if mouse is over any of them
      for (let i = 0; i < this.notes.length; i++) {
        const note = this.notes[i];

        const x = e.clientX * this._dpr;
        const y = (e.clientY - canvasBounds.top) * this._dpr;

        const isDraggable = note.checkIsDraggable(x, y);

        if (isDraggable) {
          this._canvas.style.cursor = "pointer";
          break;
        }
      }
    }
  }

  private handleDragStart(e: MouseEvent) {}

  private handleDragEnd(e: MouseEvent) {}

  public resize() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  public start() {
    this._startTime = Date.now();
  }

  public draw() {
    this.drawGrid();
    // this.drawPlayhead();

    this.notes.forEach((note) => {
      note.draw();
    });

    requestAnimationFrame(this.draw.bind(this));
  }

  public cleanup() {
    this._canvas.removeEventListener("click", this.handleMouseClick);
  }
}

export default PianoRollController;
