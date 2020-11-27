import {WboxProps} from '@app/@types/widget/wbox'
import {WimageProps} from '@app/@types/widget/wimage'
import {WdateProps} from './../@types/widget/wdate.d'
import {WspacerProps} from './../@types/widget/wspacer.d'
import {WstackProps} from './../@types/widget/wstack.d'
import {WtextProps} from './../@types/widget/wtext.d'
import {getImage} from './help'

type WidgetType = 'wbox' | 'wdate' | 'wimage' | 'wspacer' | 'wstack' | 'wtext'
type WidgetProps = WboxProps | WdateProps | WspacerProps | WstackProps | WtextProps | WimageProps
type Children<T extends Scriptable.Widget> = ((instance: T) => Promise<void>)[]
/**属性对应关系*/
type KeyMap<KEY extends null | undefined | string | symbol | number, VALUE_FROM> = Record<
  NonNullable<KEY>,
  keyof VALUE_FROM
>

class GenrateView {
  public static listWidget: ListWidget
  static setListWidget(listWidget: ListWidget): void {
    this.listWidget = listWidget
  }
  // 根组件
  static wbox(props: WboxProps, ...children: Children<ListWidget>) {
    const {background, spacing, href, updateDate, padding} = props
    try {
      // background
      isDefined(background) && setBackground(this.listWidget, background)
      // spacing
      isDefined(spacing) && (this.listWidget.spacing = spacing)
      // href
      isDefined(href) && (this.listWidget.url = href)
      // updateDate
      isDefined(updateDate) && (this.listWidget.refreshAfterDate = updateDate)
      // padding
      isDefined(padding) && this.listWidget.setPadding(...padding)
      addChildren(this.listWidget, children)
    } catch (err) {
      console.error(err)
    }
    return this.listWidget
  }
  // 容器组件
  static wstack(props: WstackProps, ...children: Children<WidgetStack>) {
    return (
      parentInstance: Scriptable.Widget & {
        addStack(): WidgetStack
      },
    ) => {
      const widgetStack = parentInstance.addStack()
      const {
        background,
        spacing,
        padding,
        width = 0,
        height = 0,
        borderRadius,
        borderWidth,
        borderColor,
        href,
        verticalAlign,
        flexDirection,
      } = props
      try {
        // background
        isDefined(background) && setBackground(widgetStack, background)
        // spacing
        isDefined(spacing) && (widgetStack.spacing = spacing)
        // padding
        isDefined(padding) && widgetStack.setPadding(...padding)
        // borderRadius
        isDefined(borderRadius) && (widgetStack.cornerRadius = borderRadius)
        // borderWidth
        isDefined(borderWidth) && (widgetStack.borderWidth = borderWidth)
        // borderColor
        isDefined(borderColor) && (widgetStack.borderColor = getColor(borderColor))
        // href
        isDefined(href) && (widgetStack.url = href)
        // width、height
        widgetStack.size = new Size(width, height)
        // verticalAlign
        const verticalAlignMap: KeyMap<WstackProps['verticalAlign'], WidgetStack> = {
          bottom: 'bottomAlignContent',
          center: 'centerAlignContent',
          top: 'topAlignContent',
        }
        isDefined(verticalAlign) && runWidgetFunc(widgetStack, verticalAlignMap[verticalAlign])
        // flexDirection
        const flexDirectionMap: KeyMap<WstackProps['flexDirection'], WidgetStack> = {
          row: 'layoutHorizontally',
          column: 'layoutVertically',
        }
        isDefined(flexDirection) && runWidgetFunc(widgetStack, flexDirectionMap[flexDirection])
      } catch (err) {
        console.error(err)
      }
      addChildren(widgetStack, children)
    }
  }
  // 图片组件
  static wimage(props: WimageProps) {
    return (
      parentInstance: Scriptable.Widget & {
        addImage(image: Image): WidgetImage
      },
    ) => {
      const {
        src,
        href,
        resizable,
        width = 0,
        height = 0,
        opacity,
        borderRadius,
        borderWidth,
        borderColor,
        containerRelativeShape,
        filter,
        imageAlign,
        mode,
      } = props
      const _image = src as Image // typeof src === 'string' ? getImage({url: src}) : src
      const widgetImage = parentInstance.addImage(_image)
      widgetImage.image = _image

      try {
        // href
        isDefined(href) && (widgetImage.url = href)
        // resizable
        isDefined(resizable) && (widgetImage.resizable = resizable)
        // width、height
        widgetImage.imageSize = new Size(width, height)
        // opacity
        isDefined(opacity) && (widgetImage.imageOpacity = opacity)
        // borderRadius
        isDefined(borderRadius) && (widgetImage.cornerRadius = borderRadius)
        // borderWidth
        isDefined(borderWidth) && (widgetImage.borderWidth = borderWidth)
        // borderColor
        isDefined(borderColor) && (widgetImage.borderColor = getColor(borderColor))
        // containerRelativeShape
        isDefined(containerRelativeShape) && (widgetImage.containerRelativeShape = containerRelativeShape)
        // filter
        isDefined(filter) && (widgetImage.tintColor = getColor(filter))
        // imageAlign
        const imageAlignMap: KeyMap<WimageProps['imageAlign'], WidgetImage> = {
          left: 'leftAlignImage',
          center: 'centerAlignImage',
          right: 'rightAlignImage',
        }
        isDefined(imageAlign) && runWidgetFunc(widgetImage, imageAlignMap[imageAlign])
        // mode
        const modeMap: KeyMap<WimageProps['mode'], WidgetImage> = {
          contain: 'applyFittingContentMode',
          fill: 'applyFillingContentMode',
        }
        isDefined(mode) && runWidgetFunc(widgetImage, modeMap[mode])
      } catch (err) {
        console.error(err)
      }
    }
  }
  // 占位空格组件
  static wspacer(props: WspacerProps) {
    return (
      parentInstance: Scriptable.Widget & {
        addSpacer(length?: number): WidgetSpacer
      },
    ) => {
      const widgetSpacer = parentInstance.addSpacer(0)
      const {length} = props
      try {
        // length
        isDefined(length) && (widgetSpacer.length = length)
      } catch (err) {
        console.error(err)
      }
    }
  }
  // 文字组件
  static wtext(props: WtextProps, ...children: string[]) {
    return (
      parentInstance: Scriptable.Widget & {
        addText(text?: string): WidgetText
      },
    ) => {
      const widgetText = parentInstance.addText('')
      const {textColor, font, opacity, maxLine, scale, shadowColor, shadowRadius, shadowOffset, href, textAlign} = props

      if (children && Array.isArray(children)) {
        widgetText.text = children.join('')
      }
      try {
        // textColor
        isDefined(textColor) && (widgetText.textColor = getColor(textColor))
        // font
        isDefined(font) && (widgetText.font = typeof font === 'number' ? Font.systemFont(font) : font)
        // opacity
        isDefined(opacity) && (widgetText.textOpacity = opacity)
        // maxLine
        isDefined(maxLine) && (widgetText.lineLimit = maxLine)
        // scale
        isDefined(scale) && (widgetText.minimumScaleFactor = scale)
        // shadowColor
        isDefined(shadowColor) && (widgetText.shadowColor = getColor(shadowColor))
        // shadowRadius
        isDefined(shadowRadius) && (widgetText.shadowRadius = shadowRadius)
        // shadowOffset
        isDefined(shadowOffset) && (widgetText.shadowOffset = shadowOffset)
        // href
        isDefined(href) && (widgetText.url = href)
        // textAlign
        // const textAlignMap: KeyMap<WtextProps['textAlign'], WidgetText> = {
        //   left: 'leftAlignText',
        //   center: 'centerAlignText',
        //   right: 'rightAlignText',
        // }
        // isDefined(textAlign) && runWidgetFunc(widgetText, textAlignMap[textAlign])

        // 坑爹，scriptable 的 bug，这个api只能直接调用
        switch (textAlign) {
          case 'left':
            widgetText.leftAlignText()
            break
          case 'right':
            widgetText.rightAlignText()
            break
          case 'center':
            widgetText.centerAlignText()
            break
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
  // 日期组件
  static wdate(props: WdateProps) {
    return (
      parentInstance: Scriptable.Widget & {
        addDate(date: Date): WidgetDate
      },
    ) => {
      const widgetDate = parentInstance.addDate(new Date())
      const {
        date,
        mode,
        textColor,
        font,
        opacity,
        maxLine,
        scale,
        shadowColor,
        shadowRadius,
        shadowOffset,
        href,
        textAlign,
      } = props

      try {
        // date
        isDefined(date) && (widgetDate.date = date)
        // textColor
        isDefined(textColor) && (widgetDate.textColor = getColor(textColor))
        // font
        isDefined(font) && (widgetDate.font = typeof font === 'number' ? Font.systemFont(font) : font)
        // opacity
        isDefined(opacity) && (widgetDate.textOpacity = opacity)
        // maxLine
        isDefined(maxLine) && (widgetDate.lineLimit = maxLine)
        // scale
        isDefined(scale) && (widgetDate.minimumScaleFactor = scale)
        // shadowColor
        isDefined(shadowColor) && (widgetDate.shadowColor = getColor(shadowColor))
        // shadowRadius
        isDefined(shadowRadius) && (widgetDate.shadowRadius = shadowRadius)
        // shadowOffset
        isDefined(shadowOffset) && (widgetDate.shadowOffset = shadowOffset)
        // href
        isDefined(href) && (widgetDate.url = href)
        // mode
        const modeMap: KeyMap<WdateProps['mode'], WidgetDate> = {
          time: 'applyTimeStyle',
          date: 'applyDateStyle',
          relative: 'applyRelativeStyle',
          offset: 'applyOffsetStyle',
          timer: 'applyTimerStyle',
        }
        isDefined(mode) && runWidgetFunc(widgetDate, modeMap[mode])
        // textAlign
        // const textAlignMap: KeyMap<WdateProps['textAlign'], WidgetDate> = {
        //   left: 'leftAlignText',
        //   center: 'centerAlignText',
        //   right: 'rightAlignText',
        // }
        // isDefined(textAlign) && runWidgetFunc(widgetDate, textAlignMap[textAlign])

        // 坑爹，scriptable 的 bug，这个api只能直接调用
        switch (textAlign) {
          case 'left':
            widgetDate.leftAlignText()
            break
          case 'right':
            widgetDate.rightAlignText()
            break
          case 'center':
            widgetDate.centerAlignText()
            break
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}

const listWidget = new ListWidget()
GenrateView.setListWidget(listWidget)
export function h(
  type: WidgetType | (() => () => void),
  props?: WidgetProps,
  ...children: Children<Scriptable.Widget> | string[]
): Scriptable.Widget | ((instance: Scriptable.Widget) => void) | null | undefined {
  props = props || {}
  switch (type) {
    case 'wbox':
      return GenrateView.wbox(props as WboxProps, ...(children as Children<ListWidget>))
      break
    case 'wdate':
      return GenrateView.wdate(props as WdateProps)
      break
    case 'wimage':
      return GenrateView.wimage(props as WimageProps)
      break
    case 'wspacer':
      return GenrateView.wspacer(props as WspacerProps)
      break
    case 'wstack':
      return GenrateView.wstack(props as WstackProps, ...(children as Children<WidgetStack>))
      break
    case 'wtext':
      return GenrateView.wtext(props as WtextProps, ...(children as string[]))
      break
    default:
      // custom component
      return type instanceof Function
        ? ((type as unknown) as (props: WidgetProps) => Promise<Scriptable.Widget>)({children, ...props})
        : null
      break
  }
}

/**
 * 输出真正颜色（比如string转color）
 * @param color
 */
function getColor(color: Color | string): Color {
  return typeof color === 'string' ? new Color(color) : color
}

/**
 * 输出真正背景（比如string转color）
 * @param bg 输入背景参数
 */
function getBackground(bg: Color | Image | LinearGradient | string): Color | Image | LinearGradient {
  return typeof bg === 'string' || bg instanceof Color ? getColor(bg) : bg
}

/**
 * 设置背景
 * @param widget 实例
 * @param bg 背景
 */
function setBackground(
  widget: Scriptable.Widget & {
    backgroundColor: Color
    backgroundImage: Image
    backgroundGradient: LinearGradient
  },
  bg: Color | Image | LinearGradient | string,
): void {
  const _bg = getBackground(bg)
  if (_bg instanceof Color) {
    widget.backgroundColor = _bg
  }
  if (_bg instanceof Image) {
    widget.backgroundImage = _bg
  }
  if (_bg instanceof LinearGradient) {
    widget.backgroundGradient = _bg
  }
}

/**
 * 添加子组件列表（把当前实例传下去）
 * @param instance 当前实例
 * @param children 子组件列表
 */
function addChildren<T extends Scriptable.Widget>(instance: T, children: Children<T>): void {
  if (children && Array.isArray(children)) {
    for (const child of children) {
      child instanceof Function ? child(instance) : ''
    }
  }
}

/**
 * 如果某值不是 undefined、null、NaN 则返回 true
 * @param value 值
 */
function isDefined<T>(value: T | undefined | null): value is T {
  if (typeof value === 'number' && !isNaN(value)) {
    return true
  }
  return value !== undefined && value !== null
}

/**
 * 根据组件属性名，执行组件该属性对应的方法
 * @param widget 组件实例
 * @param key 组件属性名
 */
function runWidgetFunc<T extends Scriptable.Widget>(widget: T, key: keyof T): void {
  const value = widget[key]
  value instanceof Function ? value() : ''
}
