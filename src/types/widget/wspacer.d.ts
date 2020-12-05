import {DetailedHTMLProps, HTMLAttributes} from 'react'

/**占位组件属性*/
export interface WspacerProps extends HTMLAttributes<Element> {
  /**空位长度,当为0时是弹性占位*/
  length?: number
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**占位组件*/
      wspacer: DetailedHTMLProps<WspacerProps, Element>
    }
  }
}
