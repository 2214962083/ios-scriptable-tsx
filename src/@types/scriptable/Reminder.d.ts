declare class Reminder {
  constructor()

  readonly identifier: string

  title: string

  notes: string

  isCompleted: boolean

  isOverdue: boolean

  priority: number

  dueDate: Date

  dueDateIncludesTime: boolean

  completionDate: Date

  creationDate: Date

  calendar: Calendar

  addRecurrenceRule(recurrenceRule: RecurrenceRule): void

  removeAllRecurrenceRules(): void

  save(): void

  remove(): void

  static scheduled(calendars: Calendar[]): Promise<Reminder[]>

  static all(calendars: Calendar[]): Promise<Reminder[]>

  static allCompleted(calendars: Calendar[]): Promise<Reminder[]>

  static allIncomplete(calendars: Calendar[]): Promise<Reminder[]>

  static allDueToday(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueToday(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueToday(calendars: Calendar[]): Promise<Reminder[]>

  static allDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>

  static allDueYesterday(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueYesterday(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueYesterday(calendars: Calendar[]): Promise<Reminder[]>

  static allDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>

  static allDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>

  static allDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>

  static completedDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>

  static completedToday(calendars: Calendar[]): Promise<Reminder[]>

  static completedThisWeek(calendars: Calendar[]): Promise<Reminder[]>

  static completedLastWeek(calendars: Calendar[]): Promise<Reminder[]>

  static allDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>

  static completedDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>

  static incompleteDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>

  static completedBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>
}
