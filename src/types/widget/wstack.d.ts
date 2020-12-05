import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**容器组件属性*/
export interface WstackProps extends HTMLAttributes<Element> {
  /**
   * 背景
   * 可以为 Color 对象、hex 字符串
   * 可以为 Image 对象、网络图片链接
   * 可以为渐变对象 LinearGradient
   */
  background?: Color | Image | LinearGradient | string

  /**与同级上一个元素的间隔*/
  spacing?: number

  /**内边距*/
  padding?: [number, number, number, number]

  /**组件宽*/
  width?: number

  /**组件高*/
  height?: number

  /**圆角*/
  borderRadius?: number

  /**边框宽度*/
  borderWidth?: number

  /**边框颜色*/
  borderColor?: Color | string

  /**点击打开哪个 url, 不与 onClick 共存，当 onClick 存在时，只执行 onClick*/
  href?: string

  /**内容垂直方向对齐方式*/
  verticalAlign?: 'top' | 'center' | 'bottom'

  /**排版方向（默认横着排）*/
  flexDirection?: 'row' | 'column'

  /**点击事件，不与 href 共存，当 href 存在时，只执行 onClick */
  onClick?: () => unknown
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**容器组件*/
      wstack: DetailedHTMLProps<WstackProps, Element>
    }
  }
}
