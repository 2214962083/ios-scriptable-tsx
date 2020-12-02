export type ImportModule = <T = unknown>(path: string) => T

declare global {
  const importModule: ImportModule
}
