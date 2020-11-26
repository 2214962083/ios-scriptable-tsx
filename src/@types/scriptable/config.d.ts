export interface Config {
  readonly runsFromHomeScreen: boolean
  readonly runsInActionExtension: boolean
  readonly runsInApp: boolean
  readonly runsInNotification: boolean
  readonly runsInWidget: boolean
  readonly runsWithSiri: boolean
  readonly widgetFamily: string
}

declare global {
  const config: Config
}
