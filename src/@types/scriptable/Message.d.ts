declare class Message {
  constructor()

  recipients: string[]

  body: string

  send(): Promise<void>

  addImageAttachment(image: Image): void

  addFileAttachment(filePath: string): void

  addDataAttachment(data: Data, uti: string, filename: string): void
}
