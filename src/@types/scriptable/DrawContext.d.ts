declare class DrawContext {
  constructor()

  size: Size

  respectScreenScale: boolean

  opaque: boolean

  getImage(): Image

  drawImageInRect(image: Image, rect: Rect): void

  drawImageAtPoint(image: Image, point: Point): void

  setFillColor(color: Color): void

  setStrokeColor(color: Color): void

  setLineWidth(width: number): void

  fill(rect: Rect): void

  fillRect(rect: Rect): void

  fillEllipse(rect: Rect): void

  stroke(rect: Rect): void

  strokeRect(rect: Rect): void

  strokeEllipse(rect: Rect): void

  addPath(path: Path): void

  strokePath(): void

  fillPath(): void

  drawText(text: string, pos: Point): void

  drawTextInRect(text: string, rect: Rect): void

  setFontSize(size: number): void

  setFont(font: Font): void

  setTextColor(color: Color): void

  setTextAlignedLeft(): void

  setTextAlignedCenter(): void

  setTextAlignedRight(): void
}
