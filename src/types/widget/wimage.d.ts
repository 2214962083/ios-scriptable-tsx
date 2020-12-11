import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**图片组件属性*/
export interface WimageProps extends HTMLAttributes<Element> {
  /**图片网络链接、
   * 图片对象
   * SF Symbol 的 name  (ios 的 内置 icon 库的某个 icon name)，详见 https://apps.apple.com/us/app/sf-symbols-browser/id1491161336
   */
  src: string | Image

  /**点击打开哪个 url, 不与 onClick 共存，当 onClick 存在时，只执行 onClick*/
  href?: string

  /**图片是否可以调整大小，默认是*/
  resizable?: boolean

  /**宽*/
  width?: number

  /**高*/
  height?: number

  /**透明度0到1，0为完全透明*/
  opacity?: number

  /**圆角*/
  borderRadius?: number

  /**边框宽度*/
  borderWidth?: number

  /**边框颜色*/
  borderColor?: Color | string

  /**
   * 默认为false
   * 如果为true，则图片的角将相对于包含的小部件进行四舍五入。
   * 如果为true，则会忽略borderRadius的值
   * */
  containerRelativeShape?: boolean

  /**加滤镜(tintColor)*/
  filter?: Color | string

  /**横向对齐*/
  imageAlign?: 'left' | 'center' | 'right'

  /**
   * fit 图片将适应可用空间，默认。
   * fill 图片将填充可用空间。
   */
  mode?: 'fit' | 'fill'

  /**点击事件，不与 href 共存，当 href 存在时，只执行 onClick */
  onClick?: () => unknown
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**图片组件*/
      wimage: DetailedHTMLProps<WimageProps, Element>
    }
  }
}
