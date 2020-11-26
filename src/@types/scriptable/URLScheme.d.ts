declare class URLScheme {
  static allParameters(): Record<string, string>

  static parameter(name: string): string

  static forOpeningScript(): string

  static forOpeningScriptSettings(): string

  static forRunningScript(): string
}
