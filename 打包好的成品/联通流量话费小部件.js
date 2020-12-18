/**
 * 作者: 小明
 * 版本: 1.0.0
 * 更新时间：2020-12-18
 * github: https://github.com/2214962083/ios-scriptable-tsx
 */

// @编译时间 1608281812315
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
function useStorage(nameSpace) {
  const _nameSpace = nameSpace || `${MODULE.filename}`
  return {
    setStorage(key, value) {
      setStorage(`${_nameSpace}${key}`, value)
    },
    getStorage(key) {
      return getStorage(`${_nameSpace}${key}`)
    },
    removeStorage(key) {
      removeStorage(`${_nameSpace}${key}`)
    },
  }
}
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
async function showModal(args2) {
  const {title, content, showCancel = true, cancelText = '取消', confirmText = '确定', inputItems = []} = args2
  const alert = new Alert()
  title && (alert.title = title)
  content && (alert.message = content)
  showCancel && cancelText && alert.addCancelAction(cancelText)
  alert.addAction(confirmText)
  for (const input of inputItems) {
    const {type = 'text', text = '', placeholder = ''} = input
    if (type === 'password') {
      alert.addSecureTextField(placeholder, text)
    } else {
      alert.addTextField(placeholder, text)
    }
  }
  const tapIndex = await alert.presentAlert()
  const texts = inputItems.map((item, index) => alert.textFieldValue(index))
  return tapIndex === -1
    ? {
        cancel: true,
        confirm: false,
        texts,
      }
    : {
        cancel: false,
        confirm: true,
        texts,
      }
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
function sleep(ms) {
  return new Promise(resolve => {
    const timer = Timer.schedule(ms, false, () => {
      timer.invalidate()
      resolve()
    })
  })
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
async function setTransparentBackground(tips) {
  const phoneSizea = {
    2778: {
      small: 510,
      medium: 1092,
      large: 1146,
      left: 96,
      right: 678,
      top: 246,
      middle: 882,
      bottom: 1518,
    },
    2532: {
      small: 474,
      medium: 1014,
      large: 1062,
      left: 78,
      right: 618,
      top: 231,
      middle: 819,
      bottom: 1407,
    },
    2688: {
      small: 507,
      medium: 1080,
      large: 1137,
      left: 81,
      right: 654,
      top: 228,
      middle: 858,
      bottom: 1488,
    },
    1792: {
      small: 338,
      medium: 720,
      large: 758,
      left: 54,
      right: 436,
      top: 160,
      middle: 580,
      bottom: 1e3,
    },
    2436: {
      small: 465,
      medium: 987,
      large: 1035,
      left: 69,
      right: 591,
      top: 213,
      middle: 783,
      bottom: 1353,
    },
    2208: {
      small: 471,
      medium: 1044,
      large: 1071,
      left: 99,
      right: 672,
      top: 114,
      middle: 696,
      bottom: 1278,
    },
    1334: {
      small: 296,
      medium: 642,
      large: 648,
      left: 54,
      right: 400,
      top: 60,
      middle: 412,
      bottom: 764,
    },
    1136: {
      small: 282,
      medium: 584,
      large: 622,
      left: 30,
      right: 332,
      top: 59,
      middle: 399,
      bottom: 399,
    },
    1624: {
      small: 310,
      medium: 658,
      large: 690,
      left: 46,
      right: 394,
      top: 142,
      middle: 522,
      bottom: 902,
    },
    2001: {
      small: 444,
      medium: 963,
      large: 972,
      left: 81,
      right: 600,
      top: 90,
      middle: 618,
      bottom: 1146,
    },
  }
  const cropImage = (img2, rect) => {
    const draw = new DrawContext()
    draw.size = new Size(rect.width, rect.height)
    draw.drawImageAtPoint(img2, new Point(-rect.x, -rect.y))
    return draw.getImage()
  }
  const shouldExit = await showModal({
    content: tips || '开始之前，请先前往桌面,截取空白界面的截图。然后回来继续',
    cancelText: '我已截图',
    confirmText: '前去截图 >',
  })
  if (!shouldExit.cancel) return
  const img = await Photos.fromLibrary()
  const imgHeight = img.size.height
  const phone = phoneSizea[imgHeight]
  if (!phone) {
    const help3 = await showModal({
      content: '好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论',
      confirmText: '帮助',
      cancelText: '取消',
    })
    if (help3.confirm) Safari.openInApp('https://support.qq.com/products/287371', false)
    return
  }
  const sizes = ['小尺寸', '中尺寸', '大尺寸']
  const sizeIndex = await showActionSheet({
    title: '你准备用哪个尺寸',
    itemList: sizes,
  })
  const widgetSize = sizes[sizeIndex]
  const selectLocation = positions2 =>
    showActionSheet({
      title: '你准备把组件放桌面哪里？',
      desc:
        imgHeight == 1136
          ? ' （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）'
          : '',
      itemList: positions2,
    })
  const crop = {w: 0, h: 0, x: 0, y: 0}
  let positions
  let _positions
  let positionIndex
  let keys
  let key
  switch (widgetSize) {
    case '小尺寸':
      crop.w = phone.small
      crop.h = phone.small
      positions = ['左上角', '右上角', '中间左', '中间右', '左下角', '右下角']
      _positions = ['top left', 'top right', 'middle left', 'middle right', 'bottom left', 'bottom right']
      positionIndex = await selectLocation(positions)
      keys = _positions[positionIndex].split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
      break
    case '中尺寸':
      crop.w = phone.medium
      crop.h = phone.small
      crop.x = phone.left
      positions = ['顶部', '中间', '底部']
      _positions = ['top', 'middle', 'bottom']
      positionIndex = await selectLocation(positions)
      key = _positions[positionIndex]
      crop.y = phone[key]
      break
    case '大尺寸':
      crop.w = phone.medium
      crop.h = phone.large
      crop.x = phone.left
      positions = ['顶部', '底部']
      _positions = ['top', 'middle']
      positionIndex = await selectLocation(positions)
      key = _positions[positionIndex]
      crop.y = phone[key]
      break
  }
  const imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))
  return imgCrop
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
function Fragment({children}) {
  return children
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

// src/scripts/china10010.tsx
var PhoneDataType
;(function (PhoneDataType2) {
  PhoneDataType2['FLOW'] = 'flow'
  PhoneDataType2['FEE'] = 'fee'
  PhoneDataType2['VOICE'] = 'voice'
  PhoneDataType2['POINT'] = 'point'
  PhoneDataType2['CREDIT'] = 'credit'
  PhoneDataType2['WOPAY'] = 'woPay'
})(PhoneDataType || (PhoneDataType = {}))
var typeDesc = {
  [PhoneDataType.FLOW]: '流量',
  [PhoneDataType.FEE]: '话费',
  [PhoneDataType.VOICE]: '语音',
  [PhoneDataType.POINT]: '积分',
  [PhoneDataType.CREDIT]: '信用分',
  [PhoneDataType.WOPAY]: '电子券',
}
var formatNum = num => parseFloat(Number(num).toFixed(1))
var {setStorage: setStorage2, getStorage: getStorage2} = useStorage('china10010-xiaoming')
var defaultBgColor = Color.dynamic(new Color('#ffffff', 1), new Color('#000000', 1))
var textColor = getStorage2('textColor') || Color.dynamic(new Color('#000000', 1), new Color('#dddddd', 1))
var transparentBg = getStorage2('transparentBg') || defaultBgColor
var boxBg = getStorage2('boxBg') || defaultBgColor
var China10010 = class {
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
    const updateInterval = 1 * 60 * 1e3
    const size = config.widgetFamily
    const usefulPhoneDatas = await this.getUserfulPhoneData(getStorage2('phoneNumber') || '')
    if (typeof usefulPhoneDatas === 'string') {
      return /* @__PURE__ */ h(
        'wbox',
        null,
        /* @__PURE__ */ h(
          'wtext',
          {
            textAlign: 'center',
            font: 20,
          },
          usefulPhoneDatas,
        ),
      )
    }
    console.log(usefulPhoneDatas)
    return /* @__PURE__ */ h(
      'wbox',
      {
        padding: [0, 0, 0, 0],
        updateDate: new Date(Date.now() + updateInterval),
        background: typeof boxBg === 'string' && boxBg.match('透明背景') ? transparentBg : boxBg,
      },
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: 'column',
          padding: [0, 16, 0, 16],
        },
        /* @__PURE__ */ h('wspacer', null),
        /* @__PURE__ */ h(
          'wstack',
          {
            verticalAlign: 'center',
          },
          /* @__PURE__ */ h('wimage', {
            src: 'https://p.pstatp.com/origin/1381a0002e9cbaedbc301',
            width: 20,
            height: 20,
            borderRadius: 4,
          }),
          /* @__PURE__ */ h('wspacer', {
            length: 8,
          }),
          /* @__PURE__ */ h(
            'wtext',
            {
              opacity: 0.7,
              font: Font.boldSystemFont(14),
              textColor,
            },
            '中国联通',
          ),
        ),
        /* @__PURE__ */ h('wspacer', null),
        size === 'small' && this.renderSmall(usefulPhoneDatas),
        size === 'medium' && this.renderMedium(usefulPhoneDatas),
        size === 'large' && this.renderLarge(usefulPhoneDatas),
      ),
    )
  }
  renderSmall(usefulPhoneDatas) {
    const flow = usefulPhoneDatas.find(item => item.type === PhoneDataType.FLOW)
    const fee = usefulPhoneDatas.find(item => item.type === PhoneDataType.FEE)
    return /* @__PURE__ */ h(
      Fragment,
      null,
      /* @__PURE__ */ h(
        'wtext',
        {
          textColor,
          font: Font.lightSystemFont(14),
        },
        '剩余流量',
        formatNum(flow.count || 0) + flow.unit,
      ),
      /* @__PURE__ */ h('wspacer', null),
      /* @__PURE__ */ h(
        'wtext',
        {
          textColor,
          font: Font.lightSystemFont(14),
        },
        '剩余话费',
        formatNum(fee.count || 0) + fee.unit,
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  renderMedium(usefulPhoneDatas) {
    const showDataType = [PhoneDataType.FLOW, PhoneDataType.FEE, PhoneDataType.VOICE]
    return this.renderLarge(usefulPhoneDatas.filter(data => showDataType.indexOf(data.type) >= 0))
  }
  renderLarge(usefulPhoneDatas) {
    const Progress = ({...props}) => {
      const {color, bgcolor, progress, width, height, borderRadius = 0} = props
      return /* @__PURE__ */ h(
        'wstack',
        {
          background: bgcolor,
          width,
          height,
          borderRadius,
        },
        /* @__PURE__ */ h(
          'wstack',
          {
            background: color,
            height,
            width: width * progress,
          },
          /* @__PURE__ */ h('wtext', null),
        ),
        progress < 1 && /* @__PURE__ */ h('wspacer', null),
      )
    }
    const TableGrid = ({text, width, align, ...props}) =>
      /* @__PURE__ */ h(
        'wstack',
        {
          width,
        },
        (align === 'center' || align === 'right') && /* @__PURE__ */ h('wspacer', null),
        typeof text === 'string'
          ? /* @__PURE__ */ h(
              'wtext',
              {
                font: 14,
                textColor,
                ...props,
              },
              text,
            )
          : text,
        (align === 'center' || align === 'left') && /* @__PURE__ */ h('wspacer', null),
      )
    const TableRow = ({texts, ...props}) =>
      /* @__PURE__ */ h(
        'wstack',
        {
          verticalAlign: 'center',
        },
        /* @__PURE__ */ h(TableGrid, {
          text: texts[0],
          ...props,
          width: 60,
          align: 'left',
        }),
        /* @__PURE__ */ h('wspacer', null),
        /* @__PURE__ */ h(TableGrid, {
          text: texts[1],
          ...props,
          width: 90,
          align: 'center',
        }),
        /* @__PURE__ */ h('wspacer', null),
        /* @__PURE__ */ h(TableGrid, {
          text: texts[2],
          ...props,
          width: 70,
          align: 'right',
        }),
      )
    return /* @__PURE__ */ h(
      Fragment,
      null,
      /* @__PURE__ */ h(TableRow, {
        texts: ['类型', '剩余百分比', '剩余量'],
      }),
      usefulPhoneDatas.map(item =>
        /* @__PURE__ */ h(
          Fragment,
          null,
          /* @__PURE__ */ h('wspacer', null),
          /* @__PURE__ */ h(TableRow, {
            font: Font.lightSystemFont(14),
            texts: [
              typeDesc[item.type],
              Progress({
                color: '#39b54a',
                bgcolor: '#dddddd',
                width: 80,
                height: 10,
                borderRadius: 5,
                progress: formatNum(item.percent) / 100,
              }),
              formatNum(item.count) + item.unit,
            ],
          }),
        ),
      ),
      /* @__PURE__ */ h('wspacer', null),
    )
  }
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['登录获取cookie', '设置手机号和cookie', '设置颜色', '设置透明背景', '预览组件'],
    })
    switch (selectIndex) {
      case 0:
        const {cancel: cancelLogin} = await showModal({
          title: '为什么要登录',
          content:
            '获取手机号码信息需要 cookie，而 cookie 不登录获取不到\n\n登录完成后，关闭网页，网页会再自动打开\n\n此时点击底部按钮复制 cookie ，然后关网页去设置cookie\n\n若 cookie 失效，再次登录复制即可',
          confirmText: '去登录',
        })
        if (cancelLogin) return
        const loginUrl = 'http://wap.10010.com/mobileService/myunicom.htm'
        const webview = new WebView()
        await webview.loadURL(loginUrl)
        await webview.present()
        const sleepTime = 1e3
        let waitTimeCount = 0
        const maxWaitTime = 10 * 60 * sleepTime
        while (true) {
          if (waitTimeCount >= maxWaitTime) break
          const {isAddCookieBtn} = await webview.evaluateJavaScript(`
            window.isAddCookieBtn = false
            if (document.cookie.match('jsessionid')) {
              const copyWrap = document.createElement('div')
              copyWrap.innerHTML = \`
              <div style="position: fixed; bottom: 0; left: 0; z-index: 999999; width: 100vw; height: 10vh; text-align: center; line-height: 10vh; background: #000000; color: #ffffff; font-size: 16px;" id="copy-btn">复制cookie</div>
              \`
              function copy(text) {
                  var input = document.createElement('input');
                  input.setAttribute('value', text);
                  document.body.appendChild(input);
                  input.select();
                  var result = document.execCommand('copy');
                  document.body.removeChild(input);
                  return result;
              }
              document.body.appendChild(copyWrap)
              const copyBtn = document.querySelector('#copy-btn')
              copyBtn.onclick = () => {
                  copy(document.cookie)
                  copyBtn.innerText = '复制成功'
                  copyBtn.style.background = 'green'
              }
              window.isAddCookieBtn = true
            }
            Object.assign({}, {isAddCookieBtn: window.isAddCookieBtn})
          `)
          if (isAddCookieBtn) break
          await sleep(sleepTime)
          waitTimeCount += sleepTime
        }
        await webview.present()
        break
      case 1:
        const {texts: phoneInfo, cancel: phoneInfoCancel} = await showModal({
          title: '设置手机号和cookie',
          content: '请务必先登录，在登录处复制好 cookie 再来，不懂就仔细看登录说明',
          inputItems: [
            {
              text: getStorage2('phoneNumber') || '',
              placeholder: '这里填你的手机号',
            },
            {
              text: getStorage2('cookie') || '',
              placeholder: '这里填cookie',
            },
          ],
        })
        if (phoneInfoCancel) return
        setStorage2('phoneNumber', phoneInfo[0])
        setStorage2('cookie', phoneInfo[1])
        await showNotification({title: '设置完成', sound: 'default'})
        break
      case 2:
        const {texts, cancel} = await showModal({
          title: '设置全局背景和颜色',
          content: '如果为空，则还原默认',
          inputItems: [
            {
              text: getStorage2('boxBg') || '',
              placeholder: '全局背景：可以是颜色、图链接',
            },
            {
              text: getStorage2('textColor') || '',
              placeholder: '这里填文字颜色',
            },
          ],
        })
        if (cancel) return
        setStorage2('boxBg', texts[0])
        setStorage2('textColor', texts[1])
        await showNotification({title: '设置完成', sound: 'default'})
        break
      case 3:
        const img = (await setTransparentBackground()) || null
        if (img) {
          setStorage2('transparentBg', img)
          setStorage2('boxBg', '透明背景')
          await showNotification({title: '设置透明背景成功', sound: 'default'})
        }
        break
      case 4:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
  async getUserfulPhoneData(phoneNumber) {
    if (!phoneNumber) return '请设置手机号'
    if (!isLaunchInsideApp() && !getStorage2('cookie')) return 'cookie 不存在，请先登录'
    const api = `https://wap.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${phoneNumber}&showType=3`
    const res = await request({
      url: api,
      dataType: 'text',
      header: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        cookie: getStorage2('cookie') || '',
      },
    })
    let usefulPhoneDatas = []
    try {
      const phoneDatas = JSON.parse(res.data || '').data.dataList || []
      usefulPhoneDatas = phoneDatas.map(info => {
        const percent = info.usedTitle.replace(/(已用|剩余)([\d\.]+)?\%/, (...args2) => {
          return args2[1] === '剩余' ? args2[2] : 100 - args2[2]
        })
        return {
          type: info.type,
          percent: Number(percent) > 100 ? 100 : Number(percent),
          unit: info.unit,
          count: Number(info.number),
          label: info.remainTitle,
        }
      })
    } catch (err) {
      console.warn(`获取联通卡信息失败: ${err}`)
      await showNotification({title: '获取联通卡信息失败', body: '检查一下网络，或重新登录', sound: 'failure'})
      return '获取联通卡信息失败\n检查一下网络，或重新登录'
    }
    return usefulPhoneDatas
  }
}
EndAwait(() => new China10010().init())

await __topLevelAwait__()
