class Note {
  private _ctx: CanvasRenderingContext2D;

  private _cellWidth: number;
  private _cellHeight: number;
  private _headerHeight: number;

  public _positionX: number;
  public _positionY: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    positionX: number,
    positionY: number,
    cellWidth: number,
    cellHeight: number,
    headerHeight: number,
  ) {
    this._ctx = ctx;
    this._positionX = positionX;
    this._positionY = positionY;
    this._cellWidth = cellWidth;
    this._cellHeight = cellHeight;
    this._headerHeight = headerHeight;
  }

  // Node is draggable if the mouse is within 10px of either left or right edge
  public checkIsDraggable(x: number, y: number) {
    if (
      x % this._cellWidth < 10 ||
      x % this._cellWidth > this._cellWidth - 10
    ) {
      return true;
    }

    return false;
  }

  public draw() {
    this._ctx.strokeStyle = "rgba(120,35,230,0.5)";
    this._ctx.fillStyle = "rgba(120,35,230,0.5)";

    this._ctx.beginPath();
    this._ctx.roundRect(
      this._positionX * this._cellWidth,
      this._positionY * this._cellHeight,
      this._cellWidth,
      this._cellHeight,
      10,
    );
    this._ctx.fill();
  }
}

export default Note;
