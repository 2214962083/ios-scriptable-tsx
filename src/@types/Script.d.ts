declare class Script {
  static name(): string

  static complete(): void

  static setShortcutOutput(value: unknown): void

  static setWidget(widget: unknown): void
}
