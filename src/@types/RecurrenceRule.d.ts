declare class RecurrenceRule {
  static daily(interval: number): RecurrenceRule

  static dailyEndDate(interval: number, endDate: Date): RecurrenceRule

  static dailyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

  static weekly(interval: number): RecurrenceRule

  static weeklyEndDate(interval: number, endDate: Date): RecurrenceRule

  static weeklyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

  static monthly(interval: number): RecurrenceRule

  static monthlyEndDate(interval: number, endDate: Date): RecurrenceRule

  static monthlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

  static yearly(interval: number): RecurrenceRule

  static yearlyEndDate(interval: number, endDate: Date): RecurrenceRule

  static yearlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule

  static complexWeekly(interval: number, daysOfTheWeek: number[], setPositions: number[]): RecurrenceRule

  static complexWeeklyEndDate(
    interval: number,
    daysOfTheWeek: number[],
    setPositions: number[],
    endDate: Date,
  ): RecurrenceRule

  static complexWeeklyOccurrenceCount(
    interval: number,
    daysOfTheWeek: number[],
    setPositions: number[],
    occurrenceCount: number,
  ): RecurrenceRule

  static complexMonthly(
    interval: number,
    daysOfTheWeek: number[],
    daysOfTheMonth: number[],
    setPositions: number[],
  ): RecurrenceRule

  static complexMonthlyEndDate(
    interval: number,
    daysOfTheWeek: number[],
    daysOfTheMonth: number[],
    setPositions: number[],
    endDate: Date,
  ): RecurrenceRule

  static complexMonthlyOccurrenceCount(
    interval: number,
    daysOfTheWeek: number[],
    daysOfTheMonth: number[],
    setPositions: number[],
    occurrenceCount: number,
  ): RecurrenceRule

  static complexYearly(
    interval: number,
    daysOfTheWeek: number[],
    monthsOfTheYear: number[],
    weeksOfTheYear: number[],
    daysOfTheYear: number[],
    setPositions: number[],
  ): RecurrenceRule

  static complexYearlyEndDate(
    interval: number,
    daysOfTheWeek: number[],
    monthsOfTheYear: number[],
    weeksOfTheYear: number[],
    daysOfTheYear: number[],
    setPositions: number[],
    endDate: Date,
  ): RecurrenceRule

  static complexYearlyOccurrenceCount(
    interval: number,
    daysOfTheWeek: number[],
    monthsOfTheYear: number[],
    weeksOfTheYear: number[],
    daysOfTheYear: number[],
    setPositions: number[],
    occurrenceCount: number,
  ): RecurrenceRule
}
