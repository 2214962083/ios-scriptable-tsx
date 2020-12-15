/**
 * 作者: 小明
 * 版本: 1.0.0
 * 更新时间：2020-12-15
 * github: https://github.com/2214962083/ios-scriptable-tsx
 */

// @编译时间 1608026117114
const MODULE = module
let __topLevelAwait__ = () => Promise.resolve()
function EndAwait(promiseFunc) {
  __topLevelAwait__ = promiseFunc
}

// src/lib/constants.ts
var URLSchemeFrom
;(function (URLSchemeFrom2) {
  URLSchemeFrom2['WIDGET'] = 'widget'
})(URLSchemeFrom || (URLSchemeFrom = {}))

// src/lib/help.ts
function fm() {
  return FileManager[MODULE.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
}
function setStorageDirectory(dirPath) {
  return {
    setStorage(key, value) {
      const hashKey = hash(key)
      const filePath = FileManager.local().joinPath(dirPath, hashKey)
      if (value instanceof Image) {
        FileManager.local().writeImage(filePath, value)
        return
      }
      if (value instanceof Data) {
        FileManager.local().write(filePath, value)
      }
      Keychain.set(hashKey, JSON.stringify(value))
    },
    getStorage(key) {
      const hashKey = hash(key)
      const filePath = FileManager.local().joinPath(FileManager.local().libraryDirectory(), hashKey)
      if (FileManager.local().fileExists(filePath)) {
        const image = Image.fromFile(filePath)
        const file = Data.fromFile(filePath)
        return image ? image : file ? file : null
      }
      if (Keychain.contains(hashKey)) {
        return JSON.parse(Keychain.get(hashKey))
      } else {
        return null
      }
    },
    removeStorage(key) {
      const hashKey = hash(key)
      const filePath = FileManager.local().joinPath(FileManager.local().libraryDirectory(), hashKey)
      if (FileManager.local().fileExists(filePath)) {
        FileManager.local().remove(hashKey)
      }
      if (Keychain.contains(hashKey)) {
        Keychain.remove(hashKey)
      }
    },
  }
}
var setStorage = setStorageDirectory(fm().libraryDirectory()).setStorage
var getStorage = setStorageDirectory(FileManager.local().libraryDirectory()).getStorage
var removeStorage = setStorageDirectory(FileManager.local().libraryDirectory()).removeStorage
var setCache = setStorageDirectory(FileManager.local().temporaryDirectory()).setStorage
var getCache = setStorageDirectory(FileManager.local().temporaryDirectory()).getStorage
var removeCache = setStorageDirectory(FileManager.local().temporaryDirectory()).removeStorage
async function request(args2) {
  const {
    url,
    data,
    header,
    dataType = 'json',
    method = 'GET',
    timeout = 60 * 1e3,
    useCache = false,
    failReturnCache = true,
  } = args2
  const cacheKey = `url:${url}`
  const cache = getStorage(cacheKey)
  if (useCache && cache !== null) return cache
  const req = new Request(url)
  req.method = method
  header && (req.headers = header)
  data && (req.body = data)
  req.timeoutInterval = timeout / 1e3
  req.allowInsecureRequest = true
  let res
  try {
    switch (dataType) {
      case 'json':
        res = await req.loadJSON()
        break
      case 'text':
        res = await req.loadString()
        break
      case 'image':
        res = await req.loadImage()
        break
      case 'data':
        res = await req.load()
        break
      default:
        res = await req.loadJSON()
    }
    const result = {...req.response, data: res}
    setStorage(cacheKey, result)
    return result
  } catch (err) {
    if (cache !== null && failReturnCache) return cache
    return err
  }
}
async function showActionSheet(args2) {
  const {title, desc, cancelText = '取消', itemList} = args2
  const alert = new Alert()
  title && (alert.title = title)
  desc && (alert.message = desc)
  for (const item of itemList) {
    if (typeof item === 'string') {
      alert.addAction(item)
    } else {
      switch (item.type) {
        case 'normal':
          alert.addAction(item.text)
          break
        case 'warn':
          alert.addDestructiveAction(item.text)
          break
        default:
          alert.addAction(item.text)
          break
      }
    }
  }
  alert.addCancelAction(cancelText)
  const tapIndex = await alert.presentSheet()
  return tapIndex
}
async function showNotification(args2) {
  const {title, subtitle = '', body = '', openURL, sound, ...others} = args2
  let notification = new Notification()
  notification.title = title
  notification.subtitle = subtitle
  notification.body = body
  openURL && (notification.openURL = openURL)
  sound && (notification.sound = sound)
  notification = Object.assign(notification, others)
  return await notification.schedule()
}
async function getImage(args2) {
  const {filepath, url, useCache = true} = args2
  const generateDefaultImage = async () => {
    const ctx = new DrawContext()
    ctx.size = new Size(100, 100)
    ctx.setFillColor(Color.red())
    ctx.fillRect(new Rect(0, 0, 100, 100))
    return await ctx.getImage()
  }
  try {
    if (filepath) {
      return Image.fromFile(filepath) || (await generateDefaultImage())
    }
    if (!url) return await generateDefaultImage()
    const cacheKey = `image:${url}`
    if (useCache) {
      const cache = getCache(url)
      if (cache instanceof Image) {
        return cache
      } else {
        removeCache(cacheKey)
      }
    }
    const res = await request({url, dataType: 'image'})
    const image = res && res.data
    image && setCache(cacheKey, image)
    return image || (await generateDefaultImage())
  } catch (err) {
    return await generateDefaultImage()
  }
}
function hash(string) {
  let hash2 = 0,
    i,
    chr
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash2 = (hash2 << 5) - hash2 + chr
    hash2 |= 0
  }
  return `hash_${hash2}`
}
function isLaunchInsideApp() {
  return !config.runsInWidget && args.queryParameters.from !== URLSchemeFrom.WIDGET
}
async function showPreviewOptions(render) {
  const selectIndex = await showActionSheet({
    title: '预览组件',
    desc: '测试桌面组件在各种尺寸下的显示效果',
    itemList: ['小尺寸', '中尺寸', '大尺寸', '全部尺寸'],
  })
  switch (selectIndex) {
    case 0:
      config.widgetFamily = 'small'
      await (await render()).presentSmall()
      break
    case 1:
      config.widgetFamily = 'medium'
      await (await render()).presentMedium()
      break
    case 2:
      config.widgetFamily = 'large'
      await (await render()).presentLarge()
      break
    case 3:
      config.widgetFamily = 'small'
      await (await render()).presentSmall()
      config.widgetFamily = 'medium'
      await (await render()).presentMedium()
      config.widgetFamily = 'large'
      await (await render()).presentLarge()
      break
  }
  return selectIndex
}

// src/lib/jsx-runtime.ts
var GenrateView = class {
  static setListWidget(listWidget2) {
    this.listWidget = listWidget2
  }
  static async wbox(props, ...children) {
    const {background, spacing, href, updateDate, padding, onClick} = props
    try {
      isDefined(background) && (await setBackground(this.listWidget, background))
      isDefined(spacing) && (this.listWidget.spacing = spacing)
      isDefined(href) && (this.listWidget.url = href)
      isDefined(updateDate) && (this.listWidget.refreshAfterDate = updateDate)
      isDefined(padding) && this.listWidget.setPadding(...padding)
      isDefined(onClick) && runOnClick(this.listWidget, onClick)
      await addChildren(this.listWidget, children)
    } catch (err) {
      console.error(err)
    }
    return this.listWidget
  }
  static wstack(props, ...children) {
    return async parentInstance => {
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
        isDefined(background) && (await setBackground(widgetStack, background))
        isDefined(spacing) && (widgetStack.spacing = spacing)
        isDefined(padding) && widgetStack.setPadding(...padding)
        isDefined(borderRadius) && (widgetStack.cornerRadius = borderRadius)
        isDefined(borderWidth) && (widgetStack.borderWidth = borderWidth)
        isDefined(borderColor) && (widgetStack.borderColor = getColor(borderColor))
        isDefined(href) && (widgetStack.url = href)
        widgetStack.size = new Size(width, height)
        const verticalAlignMap = {
          bottom: () => widgetStack.bottomAlignContent(),
          center: () => widgetStack.centerAlignContent(),
          top: () => widgetStack.topAlignContent(),
        }
        isDefined(verticalAlign) && verticalAlignMap[verticalAlign]()
        const flexDirectionMap = {
          row: () => widgetStack.layoutHorizontally(),
          column: () => widgetStack.layoutVertically(),
        }
        isDefined(flexDirection) && flexDirectionMap[flexDirection]()
        isDefined(onClick) && runOnClick(widgetStack, onClick)
      } catch (err) {
        console.error(err)
      }
      await addChildren(widgetStack, children)
    }
  }
  static wimage(props) {
    return async parentInstance => {
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
      let _image = src
      typeof src === 'string' && isUrl(src) && (_image = await getImage({url: src}))
      typeof src === 'string' && !isUrl(src) && (_image = SFSymbol.named(src).image)
      const widgetImage = parentInstance.addImage(_image)
      widgetImage.image = _image
      try {
        isDefined(href) && (widgetImage.url = href)
        isDefined(resizable) && (widgetImage.resizable = resizable)
        widgetImage.imageSize = new Size(width, height)
        isDefined(opacity) && (widgetImage.imageOpacity = opacity)
        isDefined(borderRadius) && (widgetImage.cornerRadius = borderRadius)
        isDefined(borderWidth) && (widgetImage.borderWidth = borderWidth)
        isDefined(borderColor) && (widgetImage.borderColor = getColor(borderColor))
        isDefined(containerRelativeShape) && (widgetImage.containerRelativeShape = containerRelativeShape)
        isDefined(filter) && (widgetImage.tintColor = getColor(filter))
        const imageAlignMap = {
          left: () => widgetImage.leftAlignImage(),
          center: () => widgetImage.centerAlignImage(),
          right: () => widgetImage.rightAlignImage(),
        }
        isDefined(imageAlign) && imageAlignMap[imageAlign]()
        const modeMap = {
          fit: () => widgetImage.applyFittingContentMode(),
          fill: () => widgetImage.applyFillingContentMode(),
        }
        isDefined(mode) && modeMap[mode]()
        isDefined(onClick) && runOnClick(widgetImage, onClick)
      } catch (err) {
        console.error(err)
      }
    }
  }
  static wspacer(props) {
    return async parentInstance => {
      const widgetSpacer = parentInstance.addSpacer()
      const {length} = props
      try {
        isDefined(length) && (widgetSpacer.length = length)
      } catch (err) {
        console.error(err)
      }
    }
  }
  static wtext(props, ...children) {
    return async parentInstance => {
      const widgetText = parentInstance.addText('')
      const {
        textColor: textColor2,
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
        isDefined(textColor2) && (widgetText.textColor = getColor(textColor2))
        isDefined(font) && (widgetText.font = typeof font === 'number' ? Font.systemFont(font) : font)
        isDefined(opacity) && (widgetText.textOpacity = opacity)
        isDefined(maxLine) && (widgetText.lineLimit = maxLine)
        isDefined(scale) && (widgetText.minimumScaleFactor = scale)
        isDefined(shadowColor) && (widgetText.shadowColor = getColor(shadowColor))
        isDefined(shadowRadius) && (widgetText.shadowRadius = shadowRadius)
        isDefined(shadowOffset) && (widgetText.shadowOffset = shadowOffset)
        isDefined(href) && (widgetText.url = href)
        const textAlignMap = {
          left: () => widgetText.leftAlignText(),
          center: () => widgetText.centerAlignText(),
          right: () => widgetText.rightAlignText(),
        }
        isDefined(textAlign) && textAlignMap[textAlign]()
        isDefined(onClick) && runOnClick(widgetText, onClick)
      } catch (err) {
        console.error(err)
      }
    }
  }
  static wdate(props) {
    return async parentInstance => {
      const widgetDate = parentInstance.addDate(new Date())
      const {
        date,
        mode,
        textColor: textColor2,
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
        isDefined(date) && (widgetDate.date = date)
        isDefined(textColor2) && (widgetDate.textColor = getColor(textColor2))
        isDefined(font) && (widgetDate.font = typeof font === 'number' ? Font.systemFont(font) : font)
        isDefined(opacity) && (widgetDate.textOpacity = opacity)
        isDefined(maxLine) && (widgetDate.lineLimit = maxLine)
        isDefined(scale) && (widgetDate.minimumScaleFactor = scale)
        isDefined(shadowColor) && (widgetDate.shadowColor = getColor(shadowColor))
        isDefined(shadowRadius) && (widgetDate.shadowRadius = shadowRadius)
        isDefined(shadowOffset) && (widgetDate.shadowOffset = shadowOffset)
        isDefined(href) && (widgetDate.url = href)
        const modeMap = {
          time: () => widgetDate.applyTimeStyle(),
          date: () => widgetDate.applyDateStyle(),
          relative: () => widgetDate.applyRelativeStyle(),
          offset: () => widgetDate.applyOffsetStyle(),
          timer: () => widgetDate.applyTimerStyle(),
        }
        isDefined(mode) && modeMap[mode]()
        const textAlignMap = {
          left: () => widgetDate.leftAlignText(),
          center: () => widgetDate.centerAlignText(),
          right: () => widgetDate.rightAlignText(),
        }
        isDefined(textAlign) && textAlignMap[textAlign]()
        isDefined(onClick) && runOnClick(widgetDate, onClick)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
var listWidget = new ListWidget()
GenrateView.setListWidget(listWidget)
function h(type, props, ...children) {
  props = props || {}
  const _children = flatteningArr(children)
  switch (type) {
    case 'wbox':
      return GenrateView.wbox(props, ..._children)
      break
    case 'wdate':
      return GenrateView.wdate(props)
      break
    case 'wimage':
      return GenrateView.wimage(props)
      break
    case 'wspacer':
      return GenrateView.wspacer(props)
      break
    case 'wstack':
      return GenrateView.wstack(props, ..._children)
      break
    case 'wtext':
      return GenrateView.wtext(props, ..._children)
      break
    default:
      return type instanceof Function ? type({children: _children, ...props}) : null
      break
  }
}
function flatteningArr(arr) {
  return [].concat(
    ...arr.map(item => {
      return Array.isArray(item) ? flatteningArr(item) : item
    }),
  )
}
function getColor(color) {
  return typeof color === 'string' ? new Color(color, 1) : color
}
async function getBackground(bg) {
  bg = (typeof bg === 'string' && !isUrl(bg)) || bg instanceof Color ? getColor(bg) : bg
  if (typeof bg === 'string') {
    bg = await getImage({url: bg})
  }
  return bg
}
async function setBackground(widget, bg) {
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
async function addChildren(instance, children) {
  if (children && Array.isArray(children)) {
    for (const child of children) {
      child instanceof Function ? await child(instance) : ''
    }
  }
}
function isDefined(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    return true
  }
  return value !== void 0 && value !== null
}
function isUrl(value) {
  const reg = /^(http|https)\:\/\/[\w\W]+/
  return reg.test(value)
}
function runOnClick(instance, onClick) {
  const _eventId = hash(onClick.toString())
  instance.url = `${URLScheme.forRunningScript()}?eventId=${encodeURIComponent(_eventId)}&from=${URLSchemeFrom.WIDGET}`
  const {eventId, from} = args.queryParameters
  if (eventId && eventId === _eventId && from === URLSchemeFrom.WIDGET) {
    onClick()
  }
}

// src/lib/components/layout.tsx
var Stack = ({children, ...props}) => {
  const {justifyContent = 'flex-start', alignItems = 'flex-start', ...wstackProps} = props
  const {flexDirection = 'row'} = wstackProps
  const JustifyContentFlexStart = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row'} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...props2,
      },
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  const JustifyContentCenter = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row'} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...props2,
      },
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  const JustifyContentFlexEnd = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row'} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...props2,
      },
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
    )
  }
  const AlignItemsFlexStart = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row', ...wstackProps2} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...wstackProps2,
        flexDirection: flexDirection2 === 'row' ? 'column' : 'row',
      },
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  const AlignItemsCenter = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row', ...wstackProps2} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...wstackProps2,
        flexDirection: flexDirection2 === 'row' ? 'column' : 'row',
      },
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  const AlignItemsFlexEnd = ({children: children2, ...props2}) => {
    const {flexDirection: flexDirection2 = 'row', ...wstackProps2} = props2
    return /* @__PURE__ */ h(
      'wstack',
      {
        ...wstackProps2,
        flexDirection: flexDirection2 === 'row' ? 'column' : 'row',
      },
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: flexDirection2,
        },
        children2,
      ),
    )
  }
  const JustifyContentMap = {
    'flex-start': JustifyContentFlexStart,
    center: JustifyContentCenter,
    'flex-end': JustifyContentFlexEnd,
  }
  const AlignItemsMap = {
    'flex-start': AlignItemsFlexStart,
    center: AlignItemsCenter,
    'flex-end': AlignItemsFlexEnd,
  }
  const _children = Array.isArray(children)
    ? children.map(child => {
        return h(AlignItemsMap[alignItems], {flexDirection}, child)
      })
    : h(AlignItemsMap[alignItems], {flexDirection}, children)
  return h(JustifyContentMap[justifyContent], {...wstackProps}, _children)
}
var Col = ({children, ...props}) => {
  props.flexDirection = 'column'
  return /* @__PURE__ */ h(
    Stack,
    {
      ...props,
    },
    children,
  )
}

// src/scripts/launcher.tsx
var textColor = '#ffffff'
var colors = {
  red: '#e54d42',
  orange: '#f37b1d',
  yellow: '#fbbd08',
  olive: '#8dc63f',
  green: '#39b54a',
  cyan: '#1cbbb4',
  blue: '#0081ff',
  purple: '#6739b6',
  mauve: '#9c26b0',
  pink: '#e03997',
  brown: '#a5673f',
  grey: '#8799a3',
  black: '#000000',
}
var Grid = ({...props}) => {
  const {iconName, background, text, href} = props
  const bgColors = Object.values(colors)
  const bgRandom = Math.floor(Math.random() * bgColors.length)
  const bgColor = bgColors[bgRandom]
  return /* @__PURE__ */ h(
    'wstack',
    {
      background: background || bgColor,
      href,
      borderColor: '#00000088',
      borderWidth: 1,
    },
    /* @__PURE__ */ h(
      Col,
      {
        background: /^\#[\d]+$/.test(String(background)) ? '#00000000' : '#00000033',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconName &&
        /* @__PURE__ */ h('wimage', {
          src: iconName,
          filter: textColor,
          width: 20,
          height: 20,
        }),
      /* @__PURE__ */ h('wspacer', {
        length: 10,
      }),
      (!iconName || text) &&
        /* @__PURE__ */ h(
          'wtext',
          {
            font: new Font('heavymenlo', 12.5),
            textColor,
          },
          text || '',
        ),
    ),
  )
}
var Launcher = class {
  constructor(config2) {
    this.config = config2
  }
  async init() {
    if (isLaunchInsideApp()) {
      return await this.showMenu()
    }
    const widget = await this.render()
    Script.setWidget(widget)
    Script.complete()
  }
  async render() {
    if (isLaunchInsideApp()) {
      await showNotification({title: '稍等片刻', body: '小部件渲染中...', sound: 'alert'})
    }
    const updateInterval = 24 * 60 * 60 * 1e3
    const size = config.widgetFamily
    return /* @__PURE__ */ h(
      'wbox',
      {
        padding: [0, 0, 0, 0],
        updateDate: new Date(Date.now() + updateInterval),
        href: size === 'small' ? this.config[0].href : '',
      },
      size === 'small' && this.renderSmall(),
      size === 'medium' && this.renderMedium(),
      size === 'large' && this.renderLarge(),
    )
  }
  renderSmall() {
    return /* @__PURE__ */ h(
      'wstack',
      {
        flexDirection: 'column',
      },
      /* @__PURE__ */ h(
        'wstack',
        null,
        /* @__PURE__ */ h(Grid, {
          ...this.config[0],
        }),
      ),
    )
  }
  renderMedium() {
    return /* @__PURE__ */ h(
      'wstack',
      null,
      /* @__PURE__ */ h(Grid, {
        ...this.config[0],
      }),
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: 'column',
        },
        /* @__PURE__ */ h(
          'wstack',
          null,
          /* @__PURE__ */ h(Grid, {
            ...this.config[1],
          }),
          /* @__PURE__ */ h(Grid, {
            ...this.config[2],
          }),
        ),
        /* @__PURE__ */ h(
          'wstack',
          null,
          /* @__PURE__ */ h(Grid, {
            ...this.config[3],
          }),
          /* @__PURE__ */ h(Grid, {
            ...this.config[4],
          }),
        ),
      ),
    )
  }
  renderLarge() {
    return /* @__PURE__ */ h(
      'wstack',
      {
        flexDirection: 'column',
      },
      /* @__PURE__ */ h(
        'wstack',
        null,
        /* @__PURE__ */ h(Grid, {
          ...this.config[0],
        }),
        /* @__PURE__ */ h(
          'wstack',
          {
            flexDirection: 'column',
          },
          /* @__PURE__ */ h(
            'wstack',
            null,
            /* @__PURE__ */ h(Grid, {
              ...this.config[1],
            }),
            /* @__PURE__ */ h(Grid, {
              ...this.config[2],
            }),
          ),
          /* @__PURE__ */ h(
            'wstack',
            null,
            /* @__PURE__ */ h(Grid, {
              ...this.config[3],
            }),
            /* @__PURE__ */ h(Grid, {
              ...this.config[4],
            }),
          ),
        ),
      ),
      /* @__PURE__ */ h(
        'wstack',
        null,
        /* @__PURE__ */ h(
          'wstack',
          {
            flexDirection: 'column',
          },
          /* @__PURE__ */ h(
            'wstack',
            null,
            /* @__PURE__ */ h(Grid, {
              ...this.config[5],
            }),
            /* @__PURE__ */ h(Grid, {
              ...this.config[6],
            }),
          ),
          /* @__PURE__ */ h(Grid, {
            ...this.config[7],
          }),
        ),
        /* @__PURE__ */ h(
          'wstack',
          {
            flexDirection: 'column',
          },
          /* @__PURE__ */ h(Grid, {
            ...this.config[8],
          }),
          /* @__PURE__ */ h(
            'wstack',
            null,
            /* @__PURE__ */ h(Grid, {
              ...this.config[9],
            }),
            /* @__PURE__ */ h(Grid, {
              ...this.config[10],
            }),
          ),
        ),
      ),
    )
  }
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['预览组件'],
    })
    switch (selectIndex) {
      case 0:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
}
var luancherConfig = [
  {
    href: 'weixin://scanqrcode',
    background: colors.green,
    iconName: 'barcode.viewfinder',
    text: '扫一扫',
  },
  {
    href: 'alipayqr://platformapi/startapp?saId=10000007',
    background: colors.blue,
    iconName: 'barcode.viewfinder',
    text: '扫一扫',
  },
  {
    href: 'weixin://',
    background: colors.green,
    iconName: 'message.fill',
    text: '微信',
  },
  {
    href: 'orpheuswidget://',
    background: colors.red,
    iconName: 'music.note',
    text: '网易云',
  },
  {
    href: 'alipay://platformapi/startapp?appId=20000056',
    background: colors.blue,
    iconName: 'qrcode',
    text: '付款码',
  },
  {
    href: 'mqq://',
    background: colors.blue,
    iconName: 'paperplane.fill',
    text: 'QQ',
  },
  {
    href: 'weibo://',
    background: colors.red,
    iconName: 'eye',
    text: '微博',
  },
  {
    href: 'bilibili://',
    background: colors.pink,
    iconName: 'tv',
    text: '哔哩哔哩',
  },
  {
    href: 'zhihu://',
    background: colors.blue,
    iconName: 'questionmark',
    text: '知乎',
  },
  {
    href: 'iqiyi://',
    background: colors.green,
    iconName: 'film',
    text: '爱奇艺',
  },
  {
    href: 'tencentlaunch1104466820://',
    background: colors.orange,
    iconName: 'gamecontroller',
    text: '王者',
  },
]
EndAwait(() => new Launcher(luancherConfig).init())

await __topLevelAwait__()
