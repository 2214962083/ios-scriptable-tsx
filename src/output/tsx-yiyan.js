const MODULE = module
var __defProp = Object.defineProperty
var __markAsModule = target => __defProp(target, '__esModule', {value: true})
var __export = (target, all) => {
  __markAsModule(target)
  for (var name in all) __defProp(target, name, {get: all[name], enumerable: true})
}

// src/input/tsx-yiyan.tsx
__export(exports, {
  YiyanWidget: () => YiyanWidget,
})

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
async function request(args2) {
  const {url, data, header, dataType = 'json', method = 'GET', timeout = 60 * 1e3, useCache = false} = args2
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
async function showActionSheet(args2) {
  const {title, desc, cancelText = '取消', itemList} = args2
  const alert = new Alert()
  title && (alert.title = title)
  desc && (alert.message = desc)
  for (const item of itemList) {
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
  alert.addCancelAction(cancelText)
  const tapIndex = await alert.presentSheet()
  return tapIndex
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

// src/lib/jsx-runtime.ts
class GenrateView {
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
          contain: () => widgetImage.applyFittingContentMode(),
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
        isDefined(onClick) && runOnClick(widgetDate, onClick)
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
  instance.url = `${URLScheme.forRunningScript()}?eventId=${encodeURIComponent(_eventId)}`
  const {eventId} = args.queryParameters
  if (eventId && eventId === _eventId) {
    onClick()
  }
}

// src/input/tsx-yiyan.tsx
class YiyanWidget {
  async init() {
    console.log('production')
    this.widget = await this.render()
    if (!config.runsInWidget) return
    Script.setWidget(this.widget)
    Script.complete()
  }
  async render() {
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
          src: 'https://txc.gtimg.com/data/285778/2020/1012/f9cf50f08ebb8bd391a7118c8348f5d8.png',
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
          onClick: () => this.menu(),
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
  async menu() {
    const optionFunc = [this.selectPreviewSize]
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: [
        {
          text: '预览组件',
        },
      ],
    })
    optionFunc[selectIndex].apply(this)
  }
  async selectPreviewSize() {
    const selectIndex = await showActionSheet({
      title: '选择预览尺寸',
      itemList: [
        {
          text: '小组件',
        },
        {
          text: '中组件',
        },
        {
          text: '大组件',
        },
      ],
    })
    switch (selectIndex) {
      case 0:
        await this.widget.presentSmall()
        break
      case 1:
        await this.widget.presentMedium()
        break
      case 2:
        await this.widget.presentLarge()
        break
    }
  }
}
