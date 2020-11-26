export interface Module {
  filename: string
  exports: Record<string, unknown>
}

declare global {
  const module: Module
  const MODULE: Module
}
