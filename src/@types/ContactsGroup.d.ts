declare class ContactsGroup {
  constructor()

  readonly identifier: string

  name: string

  static all(containers: ContactsContainer[]): Promise<ContactsGroup[]>

  addMember(contact: Contact): void

  removeMember(contact: Contact): void

  static add(group: ContactsGroup, containerIdentifier: string): void

  static update(group: ContactsGroup): void

  static delete(group: ContactsGroup): void
}
