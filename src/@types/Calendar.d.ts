export type Availability = 'busy' | 'free' | 'tentative' | 'unavailable'
declare class Calendar {
  readonly allowsContentModifications: boolean
  color: Color
  readonly identifier: string
  readonly isSubscribed: boolean
  title: string

  static createForReminders(title: string): Promise<Calendar>
  static defaultForEvents(): Promise<Calendar>
  static defaultForReminders(): Promise<Calendar>
  static findOrCreateForReminders(title: string): Promise<Calendar>
  static forEvents(): Promise<Calendar[]>
  static forEventsByTitle(title: string): Promise<Calendar>
  static forReminders(): Promise<Calendar[]>
  static forRemindersByTitle(title: string): Promise<Calendar>
  static presentPicker(allowMultiple: boolean = false): Promise<Calendar[]>
  remove(): void
  save(): void
  supportsAvailability(availability: Availability): boolean
}
