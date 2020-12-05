/// <reference path="./widget/wbox.d.ts" />
/// <reference path="./widget/wdate.d.ts" />
/// <reference path="./widget/wimage.d.ts" />
/// <reference path="./widget/wspacer.d.ts" />
/// <reference path="./widget/wstack.d.ts" />
/// <reference path="./widget/wtext.d.ts" />

interface Module {
  filename: string
  exports: unknown
}
declare const MODULE: Module

declare namespace Scriptable {
  class Widget {}
}
