declare class Color {
  constructor(hex: string, alpha?: number)
  readonly alpha: number
  readonly blue: number
  readonly green: number
  readonly hex: string
  readonly red: number
  static black(): Color
  static blue(): Color
  static brown(): Color
  static clear(): Color
  static cyan(): Color
  static darkGray(): Color
  static dynamic(lightColor: Color, darkColor: Color): Color
  static gray(): Color
  static green(): Color
  static lightGray(): Color
  static magenta(): Color
  static orange(): Color
  static purple(): Color
  static red(): Color
  static white(): Color
  static yellow(): Color
}
