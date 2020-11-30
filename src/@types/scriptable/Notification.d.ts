declare class Notification {
  constructor()

  identifier: string

  title: string

  subtitle: string

  body: string

  preferredContentHeight: number

  badge: number

  threadIdentifier: string

  userInfo: Record<string, unknown>

  sound: 'default' | 'accept' | 'alert' | 'complete' | 'event' | 'failure' | 'piano_error' | 'piano_success' | 'popup'

  openURL: string

  deliveryDate: Date

  nextTriggerDate: Date

  scriptName: string

  actions: {
    title: string
    url: string
  }[]

  static current(): Notification

  schedule(): Promise<void>

  remove(): Promise<void>

  setTriggerDate(date: Date): void

  setDailyTrigger(hour: number, minute: number, repeats: boolean): void

  setWeeklyTrigger(weekday: number, hour: number, minute: number, repeats: boolean): void

  addAction(title: string, url: string, destructive: boolean): void

  static allPending(): Promise<Notification[]>

  static allDelivered(): Promise<Notification[]>

  static removeAllPending(): Promise<void>

  static removeAllDelivered(): Promise<void>

  static removePending(identifiers: string[]): Promise<void>

  static removeDelivered(identifiers: string[]): Promise<void>

  static resetCurrent(): void
}
