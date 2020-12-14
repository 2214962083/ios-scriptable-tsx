/// <reference path="./widget/wbox.d.ts" />
/// <reference path="./widget/wdate.d.ts" />
/// <reference path="./widget/wimage.d.ts" />
/// <reference path="./widget/wspacer.d.ts" />
/// <reference path="./widget/wstack.d.ts" />
/// <reference path="./widget/wtext.d.ts" />
/// <reference path="./JSX.d.ts" />

interface Module {
  filename: string
  exports: unknown
}
declare const MODULE: Module

declare namespace Scriptable {
  class Widget {}
}

/**
 * 结尾生成顶部等待（top-level-await）渲染
 * @param promiseFunc 渲染函数，如: () => render()
 */
declare const EndAwait: <T>(promiseFunc: () => Promise<T>) => Promise<T>
