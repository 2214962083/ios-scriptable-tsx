declare class Safari {
  static openInApp(url: string, fullscreen: boolean): Promise<void>

  static open(url: string): void
}
