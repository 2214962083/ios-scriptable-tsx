declare class DateFormatter {
  constructor()

  dateFormat: string

  locale: string

  string(date: Date): string

  date(str: string): string

  useNoDateStyle(): void

  useShortDateStyle(): void

  useMediumDateStyle(): void

  useLongDateStyle(): void

  useFullDateStyle(): void

  useNoTimeStyle(): void

  useShortTimeStyle(): void

  useMediumTimeStyle(): void

  useLongTimeStyle(): void

  useFullTimeStyle(): void
}
