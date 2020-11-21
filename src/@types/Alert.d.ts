declare class Alert {
  constructor()
  message: string
  title: string
  addAction(title: string): void
  addCancelAction(title: string): void
  addDestructiveAction(title: string): void
  addSecureTextField(placeholder: string, text: string): void
  addTextField(placeholder: string, text: string): void
  present(): Promise<number>
  presentAlert(): Promise<number>
  presentSheet(): Promise<number>
  textFieldValue(index: number): string
}
