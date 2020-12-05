import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**文字组件属性*/
export interface WtextProps extends HTMLAttributes<Element> {
  /**文字颜色*/
  textColor?: Color | string

  /**字体和字体大小*/
  font?: Font | number

  /**透明度0到1，0为完全透明*/
  opacity?: number

  /**做多显示多少行，当小于等于0时，禁用，默认禁用*/
  maxLine?: number

  /**文字缩放倍数，目前只支持缩小，数字为0到1，1是正常大小*/
  scale?: number

  /**阴影颜色*/
  shadowColor?: Color | string

  /**阴影虚化程度*/
  shadowRadius?: number

  /**阴影偏移量*/
  shadowOffset?: Point

  /**点击打开哪个 url, 不与 onClick 共存，当 onClick 存在时，只执行 onClick*/
  href?: string

  /**文字横向对齐*/
  textAlign?: 'left' | 'center' | 'right'

  /**点击事件，不与 href 共存，当 href 存在时，只执行 onClick */
  onClick?: () => unknown
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**文字组件*/
      wtext: DetailedHTMLProps<WtextProps, Element>
    }
  }
}
