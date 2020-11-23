declare class FileManager {
  static local(): FileManager

  static iCloud(): FileManager

  read(filePath: string): Data

  readString(filePath: string): string

  readImage(filePath: string): Image

  write(filePath: string, content: Data): void

  writeString(filePath: string, content: string): void

  writeImage(filePath: string, image: Image): void

  remove(filePath: string): void

  move(sourceFilePath: string, destinationFilePath: string): void

  copy(sourceFilePath: string, destinationFilePath: string): void

  fileExists(filePath: string): boolean

  isDirectory(path: string): boolean

  createDirectory(path: string, intermediateDirectories: boolean): void

  temporaryDirectory(): string

  cacheDirectory(): string

  documentsDirectory(): string

  libraryDirectory(): string

  joinPath(lhsPath: string, rhsPath: string): string

  allTags(filePath: string): string[]

  addTag(filePath: string, tag: string): void

  removeTag(filePath: string, tag: string): void

  readExtendedAttribute(filePath: string, name: string): string

  writeExtendedAttribute(filePath: string, value: string, name: string): void

  removeExtendedAttribute(filePath: string, name: string): void

  allExtendedAttributes(filePath: string): string[]

  getUTI(filePath: string): string

  listContents(directoryPath: string): string[]

  fileName(filePath: string, includeFileExtension: boolean): string

  fileExtension(filePath: string): string

  bookmarkedPath(name: string): string

  bookmarkExists(name: string): boolean

  downloadFileFromiCloud(filePath: string): Promise<void>

  isFileStoredIniCloud(filePath: string): boolean

  isFileDownloaded(filePath: string): boolean

  creationDate(filePath: string): Date

  modificationDate(filePath: string): Date

  fileSize(filePath: string): number

  allFileBookmarks(): {
    name: string
    source: string
  }[]
}
