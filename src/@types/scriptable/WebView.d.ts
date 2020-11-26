declare class WebView {
  constructor()

  shouldAllowRequest(req: Request): boolean

  static loadHTML(html: string, baseURL: string, preferredSize: Size, fullscreen: boolean): Promise<void>

  static loadFile(fileURL: string, preferredSize: Size, fullscreen: boolean): Promise<void>

  static loadURL(url: string, preferredSize: Size, fullscreen: boolean): Promise<void>

  loadURL(url: string): Promise<void>

  loadRequest(request: Request): Promise<void>

  loadHTML(html: string, baseURL: string): Promise<void>

  loadFile(fileURL: string): Promise<void>

  evaluateJavaScript<T = unknown>(javaScript: string, useCallback: boolean): Promise<T>

  getHTML(): Promise<string>

  present(fullscreen: boolean): Promise<void>

  waitForLoad(): Promise<unknown>
}
