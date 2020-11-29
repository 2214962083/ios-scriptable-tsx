export interface Config {
  readonly runsFromHomeScreen: boolean
  readonly runsInActionExtension: boolean
  readonly runsInApp: boolean
  readonly runsInNotification: boolean
  readonly runsInWidget: boolean
  readonly runsWithSiri: boolean
  readonly widgetFamily: 'small' | 'medium' | 'large' | null
}

declare global {
  const config: Config
}
