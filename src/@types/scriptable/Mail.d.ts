declare class Mail {
  constructor()

  toRecipients: string[]

  ccRecipients: string[]

  bccRecipients: string[]

  subject: string

  body: string

  isBodyHTML: boolean

  preferredSendingEmailAddress: string

  send(): Promise<void>

  addImageAttachment(image: Image): void

  addFileAttachment(filePath: string): void

  addDataAttachment(data: Data, mimeType: string, filename: string): void
}
