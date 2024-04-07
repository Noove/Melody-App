import * as Tone from "tone";

export const notes = [
  "B6",
  "A#6",
  "A6",
  "G#6",
  "G6",
  "F#6",
  "F6",
  "E6",
  "D#6",
  "D6",
  "C#6",
  "C6",
  "B5",
  "A#5",
  "A5",
  "G#5",
  "G5",
  "F#5",
  "F5",
  "E5",
  "D#5",
  "D5",
  "C#5",
  "C5",
  "B4",
  "A#4",
  "A4",
  "G#4",
  "G4",
  "F#4",
  "F4",
  "E4",
  "D#4",
  "D4",
  "C#4",
  "C4",
  "B3",
  "A#3",
  "A3",
  "G#3",
  "G3",
  "F#3",
  "F3",
  "E3",
  "D#3",
  "D3",
  "C#3",
  "C3",
  "B2",
  "A#2",
  "A2",
  "G#2",
  "G2",
  "F#2",
  "F2",
  "E2",
  "D#2",
  "D2",
  "C#2",
  "C2",
  "B1",
  "A#1",
  "A1",
  "G#1",
  "G1",
  "F#1",
  "F1",
  "E1",
  "D#1",
  "D1",
  "C#1",
  "C1",
  "B0",
  "A#0",
  "A0",
  "G#0",
  "G0",
  "F#0",
  "F0",
  "E0",
  "D#0",
  "D0",
  "C#0",
  "C0",
];

class Note {
  private _ctx: CanvasRenderingContext2D;

  private _cellWidth: number;
  private _cellHeight: number;
  private _headerHeight: number;

  public _positionX: number;
  public _positionY: number;

  public _offsetY: number = 0;

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

  public updateSize(cellWidth: number, cellHeight: number) {
    this._cellWidth = cellWidth;
    this._cellHeight = cellHeight;
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

  public get name() {
    return notes[this._positionY];
  }

  public get frequency() {
    return Tone.Frequency(this.name).toFrequency();
  }

  static fromName(note: string) {
    return {
      B6: 0,
      "A#6": 1,
      A6: 2,
      "G#6": 3,
      G6: 4,
      "F#6": 5,
      F6: 6,
      E6: 7,
      "D#6": 8,
      D6: 9,
      "C#6": 10,
      C6: 11,
      B5: 12,
      "A#5": 13,
      A5: 14,
      "G#5": 15,
      G5: 16,
      "F#5": 17,
      F5: 18,
      E5: 19,
      "D#5": 20,
      D5: 21,
      "C#5": 22,
      C5: 23,
      B4: 24,
      "A#4": 25,
      A4: 26,
      "G#4": 27,
      G4: 28,
      "F#4": 29,
      F4: 30,
      E4: 31,
      "D#4": 32,
      D4: 33,
      "C#4": 34,
      C4: 35,
      B3: 36,
      "A#3": 37,
      A3: 38,
      "G#3": 39,
      G3: 40,
      "F#3": 41,
      F3: 42,
      E3: 43,
      "D#3": 44,
      D3: 45,
      "C#3": 46,
      C3: 47,
      B2: 48,
      "A#2": 49,
      A2: 50,
      "G#2": 51,
      G2: 52,
      "F#2": 53,
      F2: 54,
      E2: 55,
      "D#2": 56,
      D2: 57,
      "C#2": 58,
      C2: 59,
      B1: 60,
      "A#1": 61,
      A1: 62,
      "G#1": 63,
      G1: 64,
      "F#1": 65,
      F1: 66,
      E1: 67,
      "D#1": 68,
      D1: 69,
      "C#1": 70,
      C1: 71,
    }[note];
  }

  public draw() {
    this._ctx.strokeStyle = "rgba(120,35,230,0.5)";
    this._ctx.fillStyle = "rgba(120,35,230,0.5)";

    this._ctx.beginPath();
    this._ctx.roundRect(
      this._positionX * this._cellWidth,
      (this._positionY + this._offsetY) * this._cellHeight + this._headerHeight,
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
