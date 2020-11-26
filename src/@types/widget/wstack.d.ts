import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**容器组件属性*/
export interface WstackProps extends HTMLAttributes<Element> {
  /**背景*/
  background?: Color | Image | LinearGradient

  /**与同级上一个元素的间隔*/
  spacing?: number

  /**内边距*/
  padding?: [number | null, number | null, number | null, number | null]

  /**组件尺寸*/
  size?: 'small' | 'medium' | 'large'

  /**圆角*/
  borderRadius?: number

  /**边框宽度*/
  borderWidth?: number

  /**边框颜色*/
  borderColor?: Color

  /**点击跳转的链接*/
  href?: string

  /**内容垂直方向对齐方式*/
  verticalAlign?: 'top' | 'center' | 'bottom'

  /**排版方向（默认横着排）*/
  flexDirection?: 'row' | 'column'
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**容器组件*/
      wstack: DetailedHTMLProps<WstackProps, Element>
    }
  }
}
