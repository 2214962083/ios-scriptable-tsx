declare class Image {
  readonly size: Size

  static fromFile(filePath: string): Image

  static fromData(data: Data): Image
}
