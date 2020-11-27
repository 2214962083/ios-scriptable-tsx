declare class ListWidget extends Scriptable.Widget {
  constructor()

  backgroundColor: Color

  backgroundImage: Image

  backgroundGradient: LinearGradient

  spacing: number

  url: string

  refreshAfterDate: Date

  addText(text?: string): WidgetText

  addDate(date?: Date): WidgetDate

  addImage(image?: Image): WidgetImage

  addSpacer(length?: number): WidgetSpacer

  addStack(): WidgetStack

  setPadding(top: number, leading: number, bottom: number, trailing: number): void

  useDefaultPadding(): void

  presentSmall(): Promise<void>

  presentMedium(): Promise<void>

  presentLarge(): Promise<void>
}
