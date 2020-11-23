declare class Data {
  static fromString(string: string): Data

  static fromFile(filePath: string): Data

  static fromBase64String(base64String: string): Data

  static fromJPEG(image: Image): Data

  static fromPNG(image: Image): Data

  toRawString(): string

  toBase64String(): string

  getBytes(): number[]
}
