declare class Contact {
  constructor()

  readonly identifier: string

  namePrefix: string

  givenName: string

  middleName: string

  familyName: string

  nickname: string

  birthday: Date

  image: Image

  emailAddresses: {
    identifier?: string
    label?: string
    localizedLabel?: string
    value: string
  }[]

  phoneNumbers: {
    identifier?: string
    label?: string
    localizedLabel?: string
    value: string
  }[]

  postalAddresses: {
    identifier?: string
    label: string
    localizedLabel: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }[]

  socialProfiles: {
    identifier?: string
    label: string
    localizedLabel: string
    service: string
    url: string
    userIdentifier: string | null
    username: string
  }[]

  note: string

  urlAddresses: Record<string, string>[]

  dates: Record<string, unknown>[]

  organizationName: string

  departmentName: string

  jobTitle: string

  readonly isNamePrefixAvailable: boolean

  readonly isGiveNameAvailable: boolean

  readonly isMiddleNameAvailable: boolean

  readonly isFamilyNameAvailable: boolean

  readonly isNicknameAvailable: boolean

  readonly isBirthdayAvailable: boolean

  readonly isEmailAddressesAvailable: boolean

  readonly isPhoneNumbersAvailable: boolean

  readonly isPostalAddressesAvailable: boolean

  readonly isSocialProfilesAvailable: boolean

  readonly isImageAvailable: boolean

  readonly isNoteAvailable: boolean

  readonly isURLAddressesAvailable: boolean

  readonly isOrganizationNameAvailable: boolean

  readonly isDepartmentNameAvailable: boolean

  readonly isJobTitleAvailable: boolean

  readonly isDatesAvailable: boolean

  static all(containers: ContactsContainer[]): Promise<Contact[]>

  static inGroups(groups: ContactsGroup[]): Promise<Contact[]>

  static add(contact: Contact, containerIdentifier: string): void

  static update(contact: Contact): void

  static delete(contact: Contact): void

  static persistChanges(): Promise<void>
}
