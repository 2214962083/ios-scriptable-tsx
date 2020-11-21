export interface Console {
  static error(message: unknown)
  static log(message: unknown)
  static warn(message: unknown)
}

declare global {
  const console: Console
}
