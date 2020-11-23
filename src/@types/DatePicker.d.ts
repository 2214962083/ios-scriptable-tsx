declare class DatePicker {
  constructor()

  minimumDate: Date

  maximumDate: Date

  countdownDuration: number

  minuteInterval: number

  initialDate: Date

  pickTime(): Promise<Date>

  pickDate(): Promise<Date>

  pickDateAndTime(): Promise<Date>

  pickCountdownDuration(): Promise<number>
}
