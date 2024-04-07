class Note {
  private _ctx: CanvasRenderingContext2D;

  private _cellWidth: number;
  private _cellHeight: number;
  private _headerHeight: number;

  public _positionX: number;
  public _positionY: number;

  public _size: number = 1;

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

  public getDraggableSide(x: number, y: number) {
    const cursorX = x * window.devicePixelRatio;
    const cursorY =
      Math.floor(
        (y * window.devicePixelRatio - this._headerHeight) / this._cellHeight,
      ) *
        this._cellHeight +
      this._headerHeight;

    if (
      cursorY >= this._positionY * this._cellHeight &&
      cursorY <= (this._positionY + 1) * this._cellHeight
    ) {
      if (
        cursorX >= this._positionX * this._cellWidth - 10 &&
        cursorX <= this._positionX * this._cellWidth + 10
      ) {
        return "left";
      }

      if (
        cursorX >= (this._positionX + this._size) * this._cellWidth - 10 &&
        cursorX <= (this._positionX + this._size) * this._cellWidth + 10
      ) {
        return "right";
      }
    }
  }

  public draw() {
    this._ctx.strokeStyle = "rgba(120,35,230,0.5)";
    this._ctx.fillStyle = "rgba(120,35,230,0.5)";

    this._ctx.beginPath();
    this._ctx.roundRect(
      this._positionX * this._cellWidth,
      this._positionY * this._cellHeight + this._headerHeight,
      this._cellWidth * this._size,
      this._cellHeight,
      10,
    );
    this._ctx.fill();
  }

  public intersects(other: Note) {
    return (
      this._positionX < other._positionX + other._size &&
      this._positionX + this._size > other._positionX &&
      this._positionY < other._positionY + 1 &&
      this._positionY + 1 > other._positionY
    );
  }
}

export default Note;
