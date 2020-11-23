declare class Path {
  constructor()

  move(point: Point): void

  addLine(point: Point): void

  addRect(rect: Rect): void

  addEllipse(rect: Rect): void

  addRoundedRect(rect: Rect, cornerWidth: number, cornerHeight: number): void

  addCurve(point: Point, control1: Point, control2: Point): void

  addQuadCurve(point: Point, control: Point): void

  addLines(points: Point[]): void

  addRects(rects: Rect[]): void

  closeSubpath(): void
}
