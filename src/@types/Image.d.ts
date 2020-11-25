declare class Image {
  readonly size: Size

  static fromFile(filePath: string): Image | null

  static fromData(data: Data): Image | null
}
