declare class UITableCell {
  widthWeight: number

  onTap(): void

  dismissOnTap: boolean

  titleColor: Color

  subtitleColor: Color

  titleFont: Font

  subtitleFont: Font

  static text(title: string, subtitle: string): UITableCell

  static image(image: Image): UITableCell

  static imageAtURL(url: string): UITableCell

  static button(title: string): UITableCell

  leftAligned(): void

  centerAligned(): void

  rightAligned(): void
}
