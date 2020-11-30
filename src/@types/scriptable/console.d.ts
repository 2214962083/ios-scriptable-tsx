export class Console {
  static error(message: unknown): void
  static log(message: unknown): void
  static warn(message: unknown): void
}

declare global {
  const console: Console
}
