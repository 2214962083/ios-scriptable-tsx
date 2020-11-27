import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**图片组件属性*/
export interface WimageProps extends HTMLAttributes<Element> {
  /**图片网络链接*/
  src: string | Image

  /**点击打开链接*/
  href?: string

  /**图片是否可以调整大小，默认是*/
  resizable?: boolean

  /**宽*/
  width?: number

  /**高*/
  height: number

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
   * 如果为true，则图像的角将相对于包含的小部件进行四舍五入。
   * 如果为true，则会忽略borderRadius的值
   * */
  containerRelativeShape?: boolean

  /**加滤镜(tintColor)*/
  filter?: Color | string

  /**横向对齐*/
  imageAlign?: 'left' | 'center' | 'right'

  /**
   * fill 图像自适应,保持原有尺寸比,内容被缩放，默认。
   * contain 图像拉伸填充,不保证保持原有的比例，内容拉伸填充整个内容容器
   */
  mode?: 'contain' | 'fill'
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**图片组件*/
      wimage: DetailedHTMLProps<WimageProps, Element>
    }
  }
}
