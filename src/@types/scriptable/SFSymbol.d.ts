declare class SFSymbol {
  readonly image: Image

  static named(symbolName: string): SFSymbol

  applyFont(font: Font): void

  applyUltraLightWeight(): void

  applyThinWeight(): void

  applyLightWeight(): void

  applyRegularWeight(): void

  applyMediumWeight(): void

  applySemiboldWeight(): void

  applyBoldWeight(): void

  applyHeavyWeight(): void

  applyBlackWeight(): void
}
