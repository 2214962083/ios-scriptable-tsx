const MODULE = module
// src/lib/help.ts
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
        return image ? image : Data.fromFile(filePath)
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
const setStorage = setStorageDirectory(FileManager.local().libraryDirectory()).setStorage
const getStorage = setStorageDirectory(FileManager.local().libraryDirectory()).getStorage
const removeStorage = setStorageDirectory(FileManager.local().libraryDirectory()).removeStorage
const setCache = setStorageDirectory(FileManager.local().temporaryDirectory()).setStorage
const getCache = setStorageDirectory(FileManager.local().temporaryDirectory()).getStorage
const removeCache = setStorageDirectory(FileManager.local().temporaryDirectory()).removeStorage
async function request(args) {
  const {url, data, header, dataType = 'json', method = 'GET', timeout = 60 * 1e3, useCache = false} = args
  const cache = getStorage(url)
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
    setStorage(url, result)
    return result
  } catch (err) {
    if (cache !== null) return cache
    return err
  }
}
async function getImage(args) {
  const {filepath, url, useCache = true} = args
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
    if (useCache) {
      const cache = getCache(url)
      if (cache) return cache
    }
    const res = await request({url, dataType: 'image'})
    const image = res && res.data
    image && setCache(url, image)
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

// src/lib/jsx-runtime.ts
class GenrateView {
  static setListWidget(listWidget2) {
    this.listWidget = listWidget2
  }
  static async wbox(props, ...children) {
    const {background, spacing, href, updateDate, padding} = props
    isDefined(background) && setBackground(this.listWidget, background)
    isDefined(spacing) && (this.listWidget.spacing = spacing)
    isDefined(href) && (this.listWidget.url = href)
    isDefined(updateDate) && (this.listWidget.refreshAfterDate = updateDate)
    isDefined(padding) && this.listWidget.setPadding(...padding)
    await addChildren(this.listWidget, children)
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
      } = props
      isDefined(background) && setBackground(widgetStack, background)
      isDefined(spacing) && (widgetStack.spacing = spacing)
      isDefined(padding) && widgetStack.setPadding(...padding)
      isDefined(borderRadius) && (widgetStack.cornerRadius = borderRadius)
      isDefined(borderWidth) && (widgetStack.borderWidth = borderWidth)
      isDefined(borderColor) && (widgetStack.borderColor = getColor(borderColor))
      isDefined(href) && (widgetStack.url = href)
      widgetStack.size = new Size(width, height)
      const verticalAlignMap = {
        bottom: 'bottomAlignContent',
        center: 'centerAlignContent',
        top: 'topAlignContent',
      }
      isDefined(verticalAlign) && runWidgetFunc(widgetStack, verticalAlignMap[verticalAlign])
      const flexDirectionMap = {
        row: 'layoutHorizontally',
        column: 'layoutVertically',
      }
      isDefined(flexDirection) && runWidgetFunc(widgetStack, flexDirectionMap[flexDirection])
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
      } = props
      const _image = typeof src === 'string' ? await getImage({url: src}) : src
      const widgetImage = parentInstance.addImage(_image)
      widgetImage.image = _image
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
        left: 'leftAlignImage',
        center: 'centerAlignImage',
        right: 'rightAlignImage',
      }
      isDefined(imageAlign) && runWidgetFunc(widgetImage, imageAlignMap[imageAlign])
      const modeMap = {
        contain: 'applyFittingContentMode',
        fill: 'applyFillingContentMode',
      }
      isDefined(mode) && runWidgetFunc(widgetImage, modeMap[mode])
    }
  }
  static wspacer(props) {
    return parentInstance => {
      const widgetSpacer = parentInstance.addSpacer(0)
      const {length} = props
      isDefined(length) && (widgetSpacer.length = length)
    }
  }
  static wtext(props, ...children) {
    return parentInstance => {
      const widgetText = parentInstance.addText('')
      const {textColor, font, opacity, maxLine, scale, shadowColor, shadowRadius, shadowOffset, href, textAlign} = props
      isDefined(textColor) && (widgetText.textColor = getColor(textColor))
      isDefined(font) && (widgetText.font = typeof font === 'number' ? Font.systemFont(font) : font)
      isDefined(opacity) && (widgetText.textOpacity = opacity)
      isDefined(maxLine) && (widgetText.lineLimit = maxLine)
      isDefined(scale) && (widgetText.minimumScaleFactor = scale)
      isDefined(shadowColor) && (widgetText.shadowColor = getColor(shadowColor))
      isDefined(shadowRadius) && (widgetText.shadowRadius = shadowRadius)
      isDefined(shadowOffset) && (widgetText.shadowOffset = shadowOffset)
      isDefined(href) && (widgetText.url = href)
      const textAlignMap = {
        left: 'leftAlignText',
        center: 'centerAlignText',
        right: 'rightAlignText',
      }
      isDefined(textAlign) && runWidgetFunc(widgetText, textAlignMap[textAlign])
      if (children && Array.isArray(children)) {
        widgetText.text = children.join('')
      }
    }
  }
  static wdate(props) {
    return parentInstance => {
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
      isDefined(date) && (widgetDate.date = date)
      const modeMap = {
        time: 'applyTimeStyle',
        date: 'applyDateStyle',
        relative: 'applyRelativeStyle',
        offset: 'applyOffsetStyle',
        timer: 'applyTimerStyle',
      }
      isDefined(mode) && runWidgetFunc(widgetDate, modeMap[mode])
      isDefined(textColor) && (widgetDate.textColor = getColor(textColor))
      isDefined(font) && (widgetDate.font = typeof font === 'number' ? Font.systemFont(font) : font)
      isDefined(opacity) && (widgetDate.textOpacity = opacity)
      isDefined(maxLine) && (widgetDate.lineLimit = maxLine)
      isDefined(scale) && (widgetDate.minimumScaleFactor = scale)
      isDefined(shadowColor) && (widgetDate.shadowColor = getColor(shadowColor))
      isDefined(shadowRadius) && (widgetDate.shadowRadius = shadowRadius)
      isDefined(shadowOffset) && (widgetDate.shadowOffset = shadowOffset)
      isDefined(href) && (widgetDate.url = href)
      const textAlignMap = {
        left: 'leftAlignText',
        center: 'centerAlignText',
        right: 'rightAlignText',
      }
      isDefined(textAlign) && runWidgetFunc(widgetDate, textAlignMap[textAlign])
    }
  }
}
const listWidget = new ListWidget()
GenrateView.setListWidget(listWidget)
async function h(type, props, ...children) {
  props = props || {}
  switch (type) {
    case 'wbox':
      return await GenrateView.wbox(props, ...children)
      break
    case 'wdate':
      return await GenrateView.wdate(props)
      break
    case 'wimage':
      return await GenrateView.wimage(props)
      break
    case 'wspacer':
      return await GenrateView.wspacer(props)
      break
    case 'wstack':
      return await GenrateView.wstack(props, ...children)
      break
    case 'wtext':
      return await GenrateView.wtext(props, ...children)
      break
    default:
      return typeof type === 'function' ? await type({children, ...props}) : null
      break
  }
}
function getColor(color) {
  return typeof color === 'string' ? new Color(color) : color
}
function getBackground(bg) {
  return typeof bg === 'string' || bg instanceof Color ? getColor(bg) : bg
}
function setBackground(widget, bg) {
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
async function addChildren(instance, children) {
  if (children && Array.isArray(children)) {
    for (const child of children) {
      typeof child === 'function' ? await child(instance) : ''
    }
  }
}
function isDefined(value) {
  return value !== void 0 && value !== null && (typeof value === 'number' ? isNaN(value) : true)
}
function runWidgetFunc(widget, key) {
  const value = widget[key]
  typeof value === 'function' ? value() : ''
}

// src/input/tsx-test.tsx
class MyWidget {
  async init() {
    const widget = await this.render()
    Script.setWidget(widget)
    widget.presentMedium()
    Script.complete()
  }
  async render() {
    const getUpDataRes = (await this.getUpData(83540912)).data
    const followers = getUpDataRes?.data.following
    const FollowerText = () => {
      if (getUpDataRes?.code != 0) {
        return /* @__PURE__ */ h(
          'wtext',
          {
            textAlign: 'center',
            textColor: '#fb7299',
            font: 14,
          },
          '请填写B站MID',
        )
      } else {
        return /* @__PURE__ */ h(
          'wtext',
          {
            textAlign: 'center',
            textColor: '#fb7299',
            font: Font.boldRoundedSystemFont(this.getFontsize(followers)),
          },
          this.toThousands(followers),
        )
      }
    }
    return /* @__PURE__ */ h(
      'wbox',
      {
        href: 'bilibili://',
      },
      /* @__PURE__ */ h(
        'wstack',
        null,
        /* @__PURE__ */ h('wimage', {
          src: 'https://www.bilibili.com/favicon.ico',
          width: 15,
          height: 15,
        }),
        /* @__PURE__ */ h(
          'wtext',
          {
            opacity: 0.9,
            font: 14,
          },
          '哔哩哔哩粉丝',
        ),
      ),
      /* @__PURE__ */ h('wspacer', {
        length: 20,
      }),
      /* @__PURE__ */ h(FollowerText, null),
      /* @__PURE__ */ h('wspacer', {
        length: 20,
      }),
      /* @__PURE__ */ h(
        'wtext',
        {
          font: 12,
          textAlign: 'center',
          opacity: 0.5,
        },
        '更新于:',
        this.nowTime(),
      ),
    )
  }
  async getUpData(id) {
    return await request({
      url: `http://api.bilibili.com/x/relation/stat?vmid=${id}`,
      dataType: 'json',
    })
  }
  toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  getFontsize(num) {
    if (num < 99) {
      return 38
    } else if (num < 9999 && num > 100) {
      return 30
    } else if (num < 99999 && num > 1e4) {
      return 28
    } else if (num < 999999 && num > 1e5) {
      return 24
    } else if (num < 9999999 && num > 1e6) {
      return 22
    } else {
      return 20
    }
  }
  nowTime() {
    const date = new Date()
    return date.toLocaleTimeString('chinese', {hour12: false})
  }
}
new MyWidget().init()
