import {WboxProps, WimageProps, WdateProps, WspacerProps, WstackProps, WtextProps} from '../types/widget'
import {getImage, hash} from './help'
import {URLSchemeFrom} from './constants'

type WidgetType = 'wbox' | 'wdate' | 'wimage' | 'wspacer' | 'wstack' | 'wtext'
type WidgetProps = WboxProps | WdateProps | WspacerProps | WstackProps | WtextProps | WimageProps
type Children<T extends Scriptable.Widget> = ((instance: T) => Promise<void>)[]
/**属性对应关系*/
type KeyMap<KEY extends null | undefined | string | symbol | number> = Record<NonNullable<KEY>, () => void>

class GenrateView {
  public static listWidget: ListWidget
  static setListWidget(listWidget: ListWidget): void {
    this.listWidget = listWidget
  }
  // 根组件
  static async wbox(props: WboxProps, ...children: Children<ListWidget>) {
    const {background, spacing, href, updateDate, padding, onClick} = props
    try {
      // background
      isDefined(background) && (await setBackground(this.listWidget, background))
      // spacing
      isDefined(spacing) && (this.listWidget.spacing = spacing)
      // href
      isDefined(href) && (this.listWidget.url = href)
      // updateDate
      isDefined(updateDate) && (this.listWidget.refreshAfterDate = updateDate)
      // padding
      isDefined(padding) && this.listWidget.setPadding(...padding)
      // onClick
      isDefined(onClick) && runOnClick(this.listWidget, onClick)
      await addChildren(this.listWidget, children)
    } catch (err) {
      console.error(err)
    }
    return this.listWidget
  }
  // 容器组件
  static wstack(props: WstackProps, ...children: Children<WidgetStack>) {
    return async (
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
        onClick,
      } = props
      try {
        // background
        isDefined(background) && (await setBackground(widgetStack, background))
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
        const verticalAlignMap: KeyMap<WstackProps['verticalAlign']> = {
          bottom: () => widgetStack.bottomAlignContent(),
          center: () => widgetStack.centerAlignContent(),
          top: () => widgetStack.topAlignContent(),
        }
        isDefined(verticalAlign) && verticalAlignMap[verticalAlign]()
        // flexDirection
        const flexDirectionMap: KeyMap<WstackProps['flexDirection']> = {
          row: () => widgetStack.layoutHorizontally(),
          column: () => widgetStack.layoutVertically(),
        }
        isDefined(flexDirection) && flexDirectionMap[flexDirection]()
        // onClick
        isDefined(onClick) && runOnClick(widgetStack, onClick)
      } catch (err) {
        console.error(err)
      }
      await addChildren(widgetStack, children)
    }
  }
  // 图片组件
  static wimage(props: WimageProps) {
    return async (
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
        onClick,
      } = props

      let _image: Image = src as Image

      // src 为网络连接时
      typeof src === 'string' && isUrl(src) && (_image = await getImage({url: src}))

      // src 为 icon name 时
      typeof src === 'string' && !isUrl(src) && (_image = SFSymbol.named(src).image)
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
        const imageAlignMap: KeyMap<WimageProps['imageAlign']> = {
          left: () => widgetImage.leftAlignImage(),
          center: () => widgetImage.centerAlignImage(),
          right: () => widgetImage.rightAlignImage(),
        }
        isDefined(imageAlign) && imageAlignMap[imageAlign]()
        // mode
        const modeMap: KeyMap<WimageProps['mode']> = {
          fit: () => widgetImage.applyFittingContentMode(),
          fill: () => widgetImage.applyFillingContentMode(),
        }
        isDefined(mode) && modeMap[mode]()
        // onClick
        isDefined(onClick) && runOnClick(widgetImage, onClick)
      } catch (err) {
        console.error(err)
      }
    }
  }
  // 占位空格组件
  static wspacer(props: WspacerProps) {
    return async (
      parentInstance: Scriptable.Widget & {
        addSpacer(length?: number): WidgetSpacer
      },
    ) => {
      const widgetSpacer = parentInstance.addSpacer()
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
    return async (
      parentInstance: Scriptable.Widget & {
        addText(text?: string): WidgetText
      },
    ) => {
      const widgetText = parentInstance.addText('')
      const {
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
        onClick,
      } = props

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
        //textAlign
        const textAlignMap: KeyMap<WtextProps['textAlign']> = {
          left: () => widgetText.leftAlignText(),
          center: () => widgetText.centerAlignText(),
          right: () => widgetText.rightAlignText(),
        }
        isDefined(textAlign) && textAlignMap[textAlign]()
        // onClick
        isDefined(onClick) && runOnClick(widgetText, onClick)
      } catch (err) {
        console.error(err)
      }
    }
  }
  // 日期组件
  static wdate(props: WdateProps) {
    return async (
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
        onClick,
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
        const modeMap: KeyMap<WdateProps['mode']> = {
          time: () => widgetDate.applyTimeStyle(),
          date: () => widgetDate.applyDateStyle(),
          relative: () => widgetDate.applyRelativeStyle(),
          offset: () => widgetDate.applyOffsetStyle(),
          timer: () => widgetDate.applyTimerStyle(),
        }
        isDefined(mode) && modeMap[mode]()
        // textAlign
        const textAlignMap: KeyMap<WdateProps['textAlign']> = {
          left: () => widgetDate.leftAlignText(),
          center: () => widgetDate.centerAlignText(),
          right: () => widgetDate.rightAlignText(),
        }
        isDefined(textAlign) && textAlignMap[textAlign]()
        // onClick
        isDefined(onClick) && runOnClick(widgetDate, onClick)
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
): Promise<unknown> | unknown {
  props = props || {}

  // 由于 Fragment 的存在，children 可能为多维数组混合，先把它展平
  const _children = flatteningArr(children as unknown[]) as typeof children

  switch (type) {
    case 'wbox':
      return GenrateView.wbox(props as WboxProps, ...(_children as Children<Scriptable.Widget>))
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
      return GenrateView.wstack(props as WstackProps, ...(_children as Children<Scriptable.Widget>))
      break
    case 'wtext':
      return GenrateView.wtext(props as WtextProps, ...(_children as string[]))
      break
    default:
      // custom component
      return type instanceof Function
        ? ((type as unknown) as (props: WidgetProps) => Promise<Scriptable.Widget>)({children: _children, ...props})
        : null
      break
  }
}

export function Fragment({children}: {children: typeof h[]}): typeof h[] {
  return children
}

/**
 * 展平所有维度数组
 * @param arr 数组
 */
function flatteningArr<T>(arr: T[]): T[] {
  return [].concat(
    ...arr.map((item: T | T[]) => {
      return (Array.isArray(item) ? flatteningArr(item) : item) as never[]
    }),
  ) as T[]
}

/**
 * 输出真正颜色（比如string转color）
 * @param color
 */
function getColor(color: Color | string): Color {
  return typeof color === 'string' ? new Color(color, 1) : color
}

/**
 * 输出真正背景（比如string转color）
 * @param bg 输入背景参数
 */
async function getBackground(bg: Color | Image | LinearGradient | string): Promise<Color | Image | LinearGradient> {
  bg = (typeof bg === 'string' && !isUrl(bg)) || bg instanceof Color ? getColor(bg) : bg
  if (typeof bg === 'string') {
    bg = await getImage({url: bg})
  }
  return bg
}

/**
 * 设置背景
 * @param widget 实例
 * @param bg 背景
 */
async function setBackground(
  widget: Scriptable.Widget & {
    backgroundColor: Color
    backgroundImage: Image
    backgroundGradient: LinearGradient
  },
  bg: Color | Image | LinearGradient | string,
): Promise<void> {
  const _bg = await getBackground(bg)
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
async function addChildren<T extends Scriptable.Widget>(instance: T, children: Children<T>): Promise<void> {
  if (children && Array.isArray(children)) {
    for (const child of children) {
      child instanceof Function ? await child(instance) : ''
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
 * 判断一个值是否为网络连接
 * @param value 值
 */
function isUrl(value: string): boolean {
  const reg = /^(http|https)\:\/\/[\w\W]+/
  return reg.test(value)
}

/**
 * 执行点击事件
 * @param instance 当前实例
 * @param onClick 点击事件
 */
function runOnClick<T extends Scriptable.Widget & {url: string}>(instance: T, onClick: () => unknown) {
  const _eventId = hash(onClick.toString())
  instance.url = `${URLScheme.forRunningScript()}?eventId=${encodeURIComponent(_eventId)}&from=${URLSchemeFrom.WIDGET}`
  const {eventId, from} = args.queryParameters
  if (eventId && eventId === _eventId && from === URLSchemeFrom.WIDGET) {
    onClick()
  }
}
