import {Availability, Calendar} from './Calendar'

declare class CalendarEvent {
  constructor()
  readonly attendees: {
    isCurrentUser: boolean
    name: string
    status: string
    type: string
    role: string
  }[]
  availability: Availability
  calendar: Calendar
  endDate: Date
  readonly identifier: string
  isAllDay: boolean
  location: string
  notes: string
  startDate: Date
  timeZone: string
  title: string

  addRecurrenceRule(recurrenceRule: RecurrenceRule): void
  static between(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<CalendarEvent[]>
  static lastWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
  static nextWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
  static presentCreate(): Promise<CalendarEvent>
  static presentEdit(): Promise<CalendarEvent>
  remove()
  removeAllRecurrenceRules()
  save()
  static thisWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
  static today(calendars: Calendar[]): Promise<CalendarEvent[]>
  static tomorrow(calendars: Calendar[]): Promise<CalendarEvent[]>
  static yesterday(calendars: Calendar[]): Promise<CalendarEvent[]>
}
