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

  public notes: Note[] = [];

  private canDrag: Note | null = null;
  private isDragging = false;
  private dragPoint: "left" | "right" | "center" | null = null;

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
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
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

    // DEBUG TEXT
    this._ctx.font = "48px serif";
    this._ctx.fillStyle = "#ffffff";
    this._ctx.fillText(this.isDragging + "", 50, 50);
  }

  // Draw a note
  private handleMouseDown(e: MouseEvent) {
    if (this.canDrag !== null) {
      this.isDragging = true;
      return;
    }

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

      // check if intersects with other notes
      const intersectsWith = this.notes.findIndex((n) => n.intersects(note));

      if (intersectsWith !== -1) {
        //delete note
        this.notes.splice(intersectsWith, 1);
        return;
      }

      note.draw();
      this.notes.push(note);
    }
  }

  private handleMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.canDrag = null;
      this.dragPoint = null;

      this._canvas.style.cursor = "default";
    }
  }

  // Handle cursor movements
  private handleCursorMove(e: MouseEvent) {
    let hoveredNote = null;
    let hoveredSide = null;

    if (this.isDragging) {
      const cursorSnappedX =
        Math.floor((e.clientX * window.devicePixelRatio) / this._cellWidth) *
        this._cellWidth;

      console.log(
        cursorSnappedX,
        cursorSnappedX / this._cellWidth - this.canDrag!._positionX,
      );
      if (this.dragPoint === "right") {
        this.canDrag!._size = Math.max(
          cursorSnappedX / this._cellWidth - this.canDrag!._positionX,
          1,
        );
      }
      if (this.dragPoint === "left") {
        const newX = cursorSnappedX / this._cellWidth;

        const newSize = Math.max(
          1,
          this.canDrag!._size + (this.canDrag!._positionX - newX),
        );

        this.canDrag!._positionX = newX;
        this.canDrag!._size = newSize;
      }

      this.canDrag!.draw();

      return;
    }

    this.notes.forEach((note) => {
      if (note.getDraggableSide(e.clientX, e.clientY)) {
        hoveredNote = note;
        hoveredSide = note.getDraggableSide(e.clientX, e.clientY);
      }
    });

    if (hoveredNote) {
      this._canvas.style.cursor = "ew-resize";
      this.dragPoint = hoveredSide;
      this.canDrag = hoveredNote;
    } else {
      this.canDrag = null;
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
