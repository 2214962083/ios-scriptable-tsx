import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**组件盒子属性*/
export interface WboxProps extends HTMLAttributes<Element> {
  /**背景*/
  background?: Color | Image | LinearGradient | string

  /**间隔距离*/
  spacing?: number

  /**点击打开哪个 url, 不与 onClick 共存，当 onClick 存在时，只执行 onClick*/
  href?: string

  /**小组件更新日期*/
  updateDate?: Date

  /**内边距*/
  padding?: [number, number, number, number]

  /**点击事件，不与 href 共存，当 href 存在时，只执行 onClick */
  onClick?: () => unknown
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**组件盒子*/
      wbox: DetailedHTMLProps<WboxProps, Element>
    }
  }
}
