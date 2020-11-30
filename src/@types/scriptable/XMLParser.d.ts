declare class XMLParser {
  constructor(string: string)

  didStartDocument(): void

  didEndDocument(): void

  didStartElement(msg: string, info: Record<string, string>): void

  didEndElement(str: string): void

  foundCharacters(str: string): void

  parseErrorOccurred(str: string): void

  string: string

  parse(): boolean
}
