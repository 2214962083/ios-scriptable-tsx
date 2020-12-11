/**
 * 作者: 小明
 * 版本: 1.0.0
 * 更新时间：2020-12-11
 * github: https://github.com/2214962083/scriptable.git
 */

// @编译时间 1607657751861
const MODULE = module

// src/lib/constants.ts
var URLSchemeFrom
;(function (URLSchemeFrom2) {
  URLSchemeFrom2['WIDGET'] = 'widget'
})(URLSchemeFrom || (URLSchemeFrom = {}))
var port = 9090

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
  sound && notification.sound
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
function getSciptableTopComment(path) {
  if (!fm().fileExists(path)) return ''
  const code = fm().readString(path)
  return (
    (code.match(/\/\/\s*Variables\s*used\s*by\s*Scriptable[\w\W]+?icon\-color\:[\w\W]+?\;\s*icon-glyph\:[\w\W]+?\;/i) ||
      [])[0] || ''
  )
}
function sleep(ms) {
  return new Promise(resolve => {
    const timer = Timer.schedule(ms, false, () => {
      timer.invalidate()
      resolve()
    })
  })
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
var listWidget = new ListWidget()
GenrateView.setListWidget(listWidget)
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

// src/lib/baisc.ts
var {setStorage: setStorage2, getStorage: getStorage2} = useStorage('basic-storage')
var runScriptDate = Date.now()
setStorage2('runScriptDate', runScriptDate)
var Basic = class {
  constructor() {
    this.syncInterval = 1 * 1e3
    this.lastCompileDate = 0
    this.timeout = 5 * 1e3
    this.requestFailTimes = 0
    this.maxRequestFailTimes = 10
  }
  async init() {
    await this.showMenu()
  }
  getLocalScripts() {
    const dirPath = MODULE.filename.split('/').slice(0, -1).join('/')
    let scriptNames = FileManager.local().listContents(dirPath) || []
    scriptNames = scriptNames.filter(scriptName => /\.js$/.test(scriptName))
    return scriptNames.map(scriptName => ({
      name: scriptName,
      path: FileManager.local().joinPath(dirPath, scriptName),
    }))
  }
  async getScriptText(url) {
    try {
      const req = new Request(url)
      req.timeoutInterval = this.timeout / 1e3
      const res = await req.loadString()
      this.requestFailTimes = 0
      return res || ''
    } catch (err) {
      this.requestFailTimes += 1
      return ''
    }
  }
  async showMenu() {
    const that = this
    let itemList = ['远程开发']
    const syncScriptName = getStorage2('syncScriptName')
    const syncScriptPath = getStorage2('syncScriptPath')
    const remoteFileAddress = getStorage2('remoteFileAddress')
    const scriptText = getStorage2('scriptText')
    if (syncScriptName && syncScriptPath && remoteFileAddress) {
      itemList = ['远程开发', `同步${syncScriptName}`]
      if (scriptText) {
        itemList.push(`运行缓存里的${syncScriptName}`)
      }
    }
    const selectIndex = await showActionSheet({
      itemList,
    })
    switch (selectIndex) {
      case 0:
        await that.developRemote()
        break
      case 1:
        await that.developRemote({
          syncScriptName,
          syncScriptPath,
          remoteFileAddress,
        })
        break
      case 2:
        await that.runCode(syncScriptName, scriptText)
        break
    }
  }
  async developRemote(params = {}) {
    const that = this
    let _syncScriptPath = params.syncScriptPath
    let _syncScriptName = params.syncScriptName
    let _remoteFileAddress = params.remoteFileAddress
    if (!_syncScriptPath || !_syncScriptName) {
      const scripts = that.getLocalScripts()
      const selectIndex = await showActionSheet({
        title: '选择你要开发的脚本',
        itemList: scripts.map(script => script.name),
      })
      if (selectIndex < 0) return
      _syncScriptPath = scripts[selectIndex].path
      setStorage2('syncScriptPath', _syncScriptPath)
      _syncScriptName = scripts[selectIndex].name
      setStorage2('syncScriptName', _syncScriptName)
    }
    if (!_remoteFileAddress) {
      _remoteFileAddress = getStorage2('remoteFileAddress') || ''
      const {cancel, texts} = await showModal({
        title: '远程文件地址',
        content: '请输入远程开发服务器（电脑）要同步的文件地址',
        confirmText: '连接',
        inputItems: [
          {
            placeholder: '输入远程文件地址',
            text: _remoteFileAddress || `http://192.168.1.3:${port}/index.js`,
          },
        ],
      })
      if (cancel) return
      _remoteFileAddress = texts[0]
      if (!_remoteFileAddress) return
      setStorage2('remoteFileAddress', _remoteFileAddress)
    }
    if (!_remoteFileAddress || !_syncScriptName || !_syncScriptPath) {
      await showNotification({
        title: '信息不完整，运行终止',
        body: '没选择脚本或远程ip没填写',
        sound: 'failure',
      })
      return
    }
    await showNotification({title: '开始同步代码'})
    const syncScript = async () => {
      let scriptText = await that.getScriptText(_remoteFileAddress)
      const compileDateRegExp = /\/\/\s*?\@编译时间\s*?([\d]+)/
      const dateMatchResult = scriptText.match(compileDateRegExp)
      const thisCompileDate = Number(dateMatchResult && dateMatchResult[1]) || null
      if (!scriptText || !thisCompileDate) return
      if (thisCompileDate && thisCompileDate <= that.lastCompileDate) return
      try {
        const comment = getSciptableTopComment(_syncScriptPath)
        await FileManager.local().writeString(
          _syncScriptPath,
          `${comment}
${scriptText}`,
        )
        const serverApi = (_remoteFileAddress?.match(/http\:\/\/[\d\.]+?\:[\d]+/) || [])[0]
        scriptText = `${that.getRewriteConsoleCode(serverApi)}
${scriptText}`
        setStorage2('scriptText', scriptText)
        that.lastCompileDate = thisCompileDate
        await showNotification({title: '同步代码成功'})
        await that.runCode(_syncScriptName, scriptText)
      } catch (err) {
        console.log('代码写入失败')
        console.log(err)
        await showNotification({
          title: '代码同步失败',
          body: err.message,
          sound: 'failure',
        })
      }
    }
    while (1) {
      const _runScriptDate = getStorage2('runScriptDate')
      if (runScriptDate !== Number(_runScriptDate)) {
        break
      }
      if (this.requestFailTimes >= this.maxRequestFailTimes) {
        await showNotification({
          title: '已停止同步',
          subtitle: '远程开发已停止，连接超时。',
          sound: 'complete',
        })
        break
      }
      await syncScript()
      await sleep(that.syncInterval)
    }
  }
  async runCode(syncScriptName, scriptText) {
    try {
      const runRemoteCode = new Function(`${scriptText}`)
      runRemoteCode()
    } catch (err) {
      console.log('同步的代码执行失败')
      console.log(err)
      await showNotification({
        title: `${syncScriptName}执行失败`,
        body: err.message,
        sound: 'failure',
      })
    }
  }
  getRewriteConsoleCode(serverApi) {
    return `
// 保留日志原始打印方法
const __log__ = console.log;
const __warn__ = console.warn;
const __error__ = console.error;

/**发到日志远程控制台*/
const __sendLogToRemote__ = async (type = 'log', data = '') => {
  const req = new Request('${serverApi}/console');
  req.method = 'POST';
  req.headers = {
    'Content-Type': 'application/json',
  };
  req.body = JSON.stringify({
    type,
    data,
  });
  return await req.loadJSON()
}

/**存储上个console 的promise*/
let __lastConsole__ = Promise.resolve()

/**重写生成日志函数*/
const __generateLog__ = (type = 'log', oldFunc) => {
  return function(...args) {
    /**为了同步打印，finally 兼容性太差*/
    __lastConsole__.then(() => {
      __lastConsole__ = __sendLogToRemote__(type, args[0]).catch(err => {})
    }).catch(() => {
      __lastConsole__ = __sendLogToRemote__(type, args[0]).catch(err => {})
    })
    oldFunc.apply(this, args);
  }
};
if (!console.__rewrite__) {
  console.log = __generateLog__('log', __log__).bind(console);
  console.warn = __generateLog__('warn', __warn__).bind(console);
  console.error = __generateLog__('error', __error__).bind(console);
}
console.__rewrite__ = true;
    `
  }
}
new Basic().init()
