declare class Device {
  static name(): string

  static systemName(): string

  static systemVersion(): string

  static model(): string

  static isPhone(): boolean

  static isPad(): boolean

  static screenSize(): Size

  static screenResolution(): Size

  static screenScale(): number

  static screenBrightness(): number

  static isInPortrait(): boolean

  static isInPortraitUpsideDown(): boolean

  static isInLandscapeLeft(): boolean

  static isInLandscapeRight(): boolean

  static isFaceUp(): boolean

  static isFaceDown(): boolean

  static batteryLevel(): number

  static isDischarging(): boolean

  static isCharging(): boolean

  static isFullyCharged(): boolean

  static preferredLanguages(): string[]

  static locale(): string

  static language(): string

  static isUsingDarkAppearance(): boolean

  static volume(): number

  static setScreenBrightness(percentage: number): void
}
