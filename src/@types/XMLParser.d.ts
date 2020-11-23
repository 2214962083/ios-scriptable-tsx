declare class XMLParser {
  constructor(string: string)

  didStartDocument(): void

  didEndDocument(): void

  didStartElement(msg: string, info: Record<string, string>)

  didEndElement(str: string)

  foundCharacters(str: string)

  parseErrorOccurred(str: string)

  string: string

  parse(): boolean
}
