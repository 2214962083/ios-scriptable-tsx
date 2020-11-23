declare class Timer {
  constructor()

  timeInterval: number

  repeats: boolean

  schedule(callback: () => void): void

  invalidate(): void

  static schedule(timeInterval: number, repeats: boolean, callback: () => void): Timer
}
