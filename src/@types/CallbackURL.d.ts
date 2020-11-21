declare class CallbackURL {
  constructor(baseURL: string)
  addParameter(name: string, value: string): void
  getURL(): string
  open(): Promise<Record<string, string>>
}
