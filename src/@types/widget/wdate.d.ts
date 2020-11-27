import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**时间组件属性*/
export interface WdateProps extends HTMLAttributes<Element> {
  /**时间*/
  date: Date

  /**显示模式*/
  /**
   * time: 显示日期的时间部分。例如：11:23PM
   * date: 显示整个日期。例如：June 3, 2019
   * relative: 将日期显示为相对于现在的日期。例如：2 hours, 23 minutes 1 year, 1 month
   * offset: 将日期显示为从现在开始的偏移量。例如：+2 hours -3 months
   * timer: 从现在开始将日期显示为计时器计数。例如：2:32 36:59:01
   */
  mode?: 'time' | 'date' | 'relative' | 'offset' | 'timer'

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

  /**点击打开哪个 url*/
  href?: string

  /**文字横向对齐*/
  textAlign?: 'left' | 'center' | 'right'
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**时间组件*/
      wdate: DetailedHTMLProps<WdateProps, Element>
    }
  }
}
