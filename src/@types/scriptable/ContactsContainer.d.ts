declare class ContactsContainer {
  readonly identifier: string

  readonly name: string

  static default(): Promise<ContactsContainer>

  static all(): Promise<ContactsContainer[]>

  static withIdentifier(identifier: string): Promise<ContactsContainer>
}
