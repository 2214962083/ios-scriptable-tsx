declare class WidgetImage {
  image: Image

  resizable: boolean

  imageSize: Size

  imageOpacity: number

  cornerRadius: number

  borderWidth: number

  borderColor: Color

  containerRelativeShape: boolean

  tintColor: Color

  url: string

  leftAlignImage(): void

  centerAlignImage(): void

  rightAlignImage(): void

  applyFittingContentMode(): void

  applyFillingContentMode(): void
}
