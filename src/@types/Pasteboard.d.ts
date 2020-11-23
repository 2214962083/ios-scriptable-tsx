declare class Pasteboard {
  static copy(string: string): void

  static paste(): string

  static copyString(string: string): void

  static pasteString(): string

  static copyImage(image: Image): void

  static pasteImage(): Image
}
