declare class DocumentPicker {
  static open(types: string[]): Promise<string[]>

  static openFile(): Promise<string>

  static openFolder(): Promise<string>

  static export(path: string): Promise<string[]>

  static exportString(content: string, name: string): Promise<string[]>

  static exportImage(image: Image, name: string): Promise<string[]>

  static exportData(data: Data, name: string): Promise<string[]>
}
