export type ImportModule = <T = unknown>(name: string) => T

declare global {
  const importModule: ImportModule
}
