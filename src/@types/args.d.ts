export interface Args {
  readonly fileUrls: string[]
  readonly images: Image[]
  readonly notification: Notification
  readonly plainTexts: string[]
  readonly queryParameters: Record<string, string>
  readonly shortcutParameter: unknown
  readonly urls: string[]
  readonly widgetParameter: unknown
}

declare global {
  const args: Args
}
