declare class RelativeDateTimeFormatter {
  constructor()

  locale: string

  string(date: Date, referenceDate: Date): string

  useNamedDateTimeStyle(): void

  useNumericDateTimeStyle(): void
}
