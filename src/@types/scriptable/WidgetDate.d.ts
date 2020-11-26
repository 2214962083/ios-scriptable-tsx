declare class WidgetDate {
  date: Date

  textColor: Color

  font: Font

  textOpacity: number

  lineLimit: number

  minimumScaleFactor: number

  shadowColor: Color

  shadowRadius: number

  shadowOffset: Point

  url: string

  leftAlignText(): void

  centerAlignText(): void

  rightAlignText(): void

  applyTimeStyle(): void

  applyDateStyle(): void

  applyRelativeStyle(): void

  applyOffsetStyle(): void

  applyTimerStyle(): void
}
