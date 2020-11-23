declare class Keychain {
  static contains(key: string): boolean

  static set(key: string, value: string): void

  static get(key: string): string

  static remove(key: string): void
}
