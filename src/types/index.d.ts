/// <reference path="./widget/wbox.d.ts" />
/// <reference path="./widget/wdate.d.ts" />
/// <reference path="./widget/wimage.d.ts" />
/// <reference path="./widget/wspacer.d.ts" />
/// <reference path="./widget/wstack.d.ts" />
/// <reference path="./widget/wtext.d.ts" />

export * from './widget/wbox'
export * from './widget/wdate'
export * from './widget/wimage'
export * from './widget/wspacer'
export * from './widget/wstack'
export * from './widget/wtext'

export interface Module {
  filename: string
  exports: unknown
}
declare global {
  const MODULE: Module

  namespace Scriptable {
    class Widget extends Extract<ListWidget, WidgetDate, WidgetImage, WidgetSpacer, WidgetStack, WidgetText> {}
  }
}
