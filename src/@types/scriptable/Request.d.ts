declare class Request<RES = Record<string | number, unknown>> {
  constructor(url: string)

  url: string

  method: string

  headers: Record<string, string>

  body: unknown

  timeoutInterval: number

  readonly response: Record<string, unknown>

  allowInsecureRequest: boolean

  onRedirect(req: Request): Request

  load(): Promise<Data>

  loadString(): Promise<string>

  loadJSON(): Promise<RES>

  loadImage(): Promise<Image>

  addParameterToMultipart(name: string, value: string): void

  addFileDataToMultipart(data: Data, mimeType: string, name: string, filename: string): void

  addFileToMultipart(filePath: string, name: string, filename: string): void

  addImageToMultipart(image: Image, name: string, filename: string): void
}
