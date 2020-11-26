declare class Photos {
  static fromLibrary(): Promise<Image>

  static fromCamera(): Promise<Image>

  static latestPhoto(): Promise<Image>

  static latestPhotos(count: number): Promise<Image[]>

  static latestScreenshot(): Promise<Image>

  static latestScreenshots(count: number): Promise<Image[]>

  static removeLatestPhoto(): void

  static removeLatestPhotos(count: number): void

  static removeLatestScreenshot(): void

  static removeLatestScreenshots(count: number): void

  static save(image: Image): void
}
