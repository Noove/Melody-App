import Note from "./note.ts";

class PianoRollController {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  // Header height in pixels
  private _headerHeight: number = 50;
  private _cellWidth: number;
  private _cellHeight: number;

  private _cellHeightCount = 35;
  private _cellWidthCount = 16;

  private notes: Note[] = [];

  private canDrag = false;
  private isDragging = false;
  private draggedNote: Note | null = null;
  private dragPoint: "left" | "right" | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d")!;

    this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
    this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;

    this._cellHeight =
      (this._canvas.height - this._headerHeight) / this._cellHeightCount;
    this._cellWidth = this._canvas.width / this._cellWidthCount;

    // Bind resize
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("mousemove", this.handleCursorMove.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  // Draw the background grid together with the header background
  private drawGrid() {
    // Header is a red rectangle
    this._ctx.fillStyle = "red";
    this._ctx.fillRect(0, 0, this._canvas.width, this._headerHeight);

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
  }

  // Draw a note
  private handleMouseDown(e: MouseEvent) {
    // Seek if the cursor is in the header
    if (e.clientY * window.devicePixelRatio <= 50) {
    }
    // Place a note if the cursor is in the grid
    else {
      const noteX =
        Math.floor((e.clientX * window.devicePixelRatio) / this._cellWidth) *
        this._cellWidth;
      const noteY =
        Math.floor(
          (e.clientY * window.devicePixelRatio - this._headerHeight) /
            this._cellHeight,
        ) *
          this._cellHeight +
        this._headerHeight;

      const note = new Note(
        this._ctx,
        noteX / this._cellWidth,
        Math.round((noteY - this._headerHeight) / this._cellHeight),
        this._cellWidth,
        this._cellHeight,
        this._headerHeight,
      );

      note.draw();

      this.notes.push(note);
    }
  }

  // Handle cursor movements
  private handleCursorMove(e: MouseEvent) {
    let hoveredNote = null;
    let hoveredSide = null;

    this.notes.forEach((note) => {
      if (note.getDraggableSide(e.clientX, e.clientY)) {
        hoveredNote = note;
        hoveredSide = note.getDraggableSide(e.clientX, e.clientY);
      }
    });

    if (hoveredNote) {
      this._canvas.style.cursor = "ew-resize";
      this.dragPoint = hoveredSide;
      this.canDrag = true;
    } else {
      this.canDrag = false;
      this.dragPoint = null;
      this._canvas.style.cursor = "default";
    }
  }

  public resize() {
    this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
    this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;

    this._cellHeight =
      (this._canvas.height - this._headerHeight) / this._cellHeightCount;
    this._cellWidth = this._canvas.width / this._cellWidthCount;

    this.draw();
  }

  public draw() {
    this.drawGrid();

    // Draw notes
    this.notes.forEach((note) => {
      note.draw();
    });

    requestAnimationFrame(this.draw.bind(this));
  }
}

export default PianoRollController;
