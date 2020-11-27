declare class WidgetStack extends Scriptable.Widget {
  backgroundColor: Color

  backgroundImage: Image

  backgroundGradient: LinearGradient

  spacing: number

  size: Size

  cornerRadius: number

  borderWidth: number

  borderColor: Color

  url: string

  addText(text?: string): WidgetText

  addDate(date?: Date): WidgetDate

  addImage(image?: Image): WidgetImage

  addSpacer(length?: number): WidgetSpacer

  addStack(): WidgetStack

  setPadding(top: number, leading: number, bottom: number, trailing: number): void

  useDefaultPadding(): void

  topAlignContent(): void

  centerAlignContent(): void

  bottomAlignContent(): void

  layoutHorizontally(): void

  layoutVertically(): void
}
