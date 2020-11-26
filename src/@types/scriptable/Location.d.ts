declare class Location {
  static current(): Promise<Record<string, number>>

  static setAccuracyToBest(): void

  static setAccuracyToTenMeters(): void

  static setAccuracyToHundredMeters(): void

  static setAccuracyToKilometer(): void

  static setAccuracyToThreeKilometers(): void

  static reverseGeocode(latitude: number, longitude: number, locale: string): Record<string, unknown>[]
}
