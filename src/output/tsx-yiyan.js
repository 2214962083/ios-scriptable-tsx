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
const setStorage = setStorageDirectory(FileManager.local().libraryDirectory()).setStorage
const getStorage = setStorageDirectory(FileManager.local().libraryDirectory()).getStorage
const removeStorage = setStorageDirectory(FileManager.local().libraryDirectory()).removeStorage
const setCache = setStorageDirectory(FileManager.local().temporaryDirectory()).setStorage
const getCache = setStorageDirectory(FileManager.local().temporaryDirectory()).getStorage
const removeCache = setStorageDirectory(FileManager.local().temporaryDirectory()).removeStorage
async function request(args) {
  const {url, data, header, dataType = 'json', method = 'GET', timeout = 60 * 1e3, useCache = false} = args
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

// src/lib/jsx-runtime.ts
class GenrateView {
  static setListWidget(listWidget2) {
    this.listWidget = listWidget2
  }
  static wbox(props, ...children) {
    const {background, spacing, href, updateDate, padding} = props
    try {
      isDefined(background) && setBackground(this.listWidget, background)
      isDefined(spacing) && (this.listWidget.spacing = spacing)
      isDefined(href) && (this.listWidget.url = href)
      isDefined(updateDate) && (this.listWidget.refreshAfterDate = updateDate)
      isDefined(padding) && this.listWidget.setPadding(...padding)
      addChildren(this.listWidget, children)
    } catch (err) {
      console.error(err)
    }
    return this.listWidget
  }
  static wstack(props, ...children) {
    return parentInstance => {
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
        isDefined(background) && setBackground(widgetStack, background)
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
      } catch (err) {
        console.error(err)
      }
      addChildren(widgetStack, children)
    }
  }
  static wimage(props) {
    return parentInstance => {
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
      const _image = src
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
          contain: () => widgetImage.applyFittingContentMode(),
          fill: () => widgetImage.applyFillingContentMode(),
        }
        isDefined(mode) && modeMap[mode]()
      } catch (err) {
        console.error(err)
      }
    }
  }
  static wspacer(props) {
    return parentInstance => {
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
    return parentInstance => {
      const widgetText = parentInstance.addText('')
      const {textColor, font, opacity, maxLine, scale, shadowColor, shadowRadius, shadowOffset, href, textAlign} = props
      if (children && Array.isArray(children)) {
        widgetText.text = children.join('')
      }
      try {
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
          left: () => widgetText.leftAlignText(),
          center: () => widgetText.centerAlignText(),
          right: () => widgetText.rightAlignText(),
        }
        isDefined(textAlign) && textAlignMap[textAlign]()
      } catch (err) {
        console.error(err)
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
      try {
        isDefined(date) && (widgetDate.date = date)
        isDefined(textColor) && (widgetDate.textColor = getColor(textColor))
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
      } catch (err) {
        console.error(err)
      }
    }
  }
}
const listWidget = new ListWidget()
GenrateView.setListWidget(listWidget)
function h(type, props, ...children) {
  props = props || {}
  switch (type) {
    case 'wbox':
      return GenrateView.wbox(props, ...children)
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
      return GenrateView.wstack(props, ...children)
      break
    case 'wtext':
      return GenrateView.wtext(props, ...children)
      break
    default:
      return type instanceof Function ? type({children, ...props}) : null
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
function addChildren(instance, children) {
  if (children && Array.isArray(children)) {
    for (const child of children) {
      child instanceof Function ? child(instance) : ''
    }
  }
}
function isDefined(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    return true
  }
  return value !== void 0 && value !== null
}

// src/input/tsx-yiyan.tsx
class YiyanWidget {
  async init() {
    const widget = await this.render()
    Script.setWidget(widget)
    widget.presentMedium()
    Script.complete()
  }
  async render() {
    const icon = await getImage({
      url: 'https://txc.gtimg.com/data/285778/2020/1012/f9cf50f08ebb8bd391a7118c8348f5d8.png',
    })
    const data = (await this.getRemoteData()).data || {}
    const {hitokoto = '', from = ''} = data
    return /* @__PURE__ */ h(
      'wbox',
      null,
      /* @__PURE__ */ h(
        'wstack',
        {
          verticalAlign: 'center',
        },
        /* @__PURE__ */ h('wimage', {
          src: icon,
          width: 14,
          height: 14,
          borderRadius: 4,
        }),
        /* @__PURE__ */ h('wspacer', {
          length: 10,
        }),
        /* @__PURE__ */ h(
          'wtext',
          {
            opacity: 0.7,
            font: Font.boldSystemFont(12),
          },
          '一言',
        ),
      ),
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wtext',
        {
          font: Font.lightSystemFont(16),
        },
        hitokoto,
      ),
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wtext',
        {
          font: Font.lightSystemFont(12),
          opacity: 0.5,
          textAlign: 'right',
          maxLine: 1,
        },
        from,
      ),
    )
  }
  async getRemoteData() {
    return await request({
      url: 'https://v1.hitokoto.cn',
      dataType: 'json',
    })
  }
}
new YiyanWidget().init()
