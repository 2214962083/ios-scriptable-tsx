// @编译时间 1607796001681
const MODULE = module

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
const setStorage = setStorageDirectory(fm().libraryDirectory()).setStorage
const getStorage = setStorageDirectory(FileManager.local().libraryDirectory()).getStorage
const removeStorage = setStorageDirectory(FileManager.local().libraryDirectory()).removeStorage
const setCache = setStorageDirectory(FileManager.local().temporaryDirectory()).setStorage
const getCache = setStorageDirectory(FileManager.local().temporaryDirectory()).getStorage
const removeCache = setStorageDirectory(FileManager.local().temporaryDirectory()).removeStorage
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
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
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
const listWidget = new ListWidget()
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

// src/scripts/music163.tsx
const {setStorage: setStorage2, getStorage: getStorage2} = useStorage('music163-grid')
const favoriteListId = getStorage2('favoriteListId') || 3136952023
const likeListId = getStorage2('likeListId') || 310970433
const cloudListId = getStorage2('cloudListId') || 2463071445
const textColor = '#ffffff'
const RowCenter = ({children, ...props}) => {
  return /* @__PURE__ */ h(
    'wstack',
    {
      ...props,
    },
    /* @__PURE__ */ h('wspacer', null),
    children,
    /* @__PURE__ */ h('wspacer', null),
  )
}
const ColCenter = ({children, ...props}) => {
  return /* @__PURE__ */ h(
    'wstack',
    {
      ...props,
      flexDirection: 'column',
    },
    /* @__PURE__ */ h('wspacer', null),
    children,
    /* @__PURE__ */ h('wspacer', null),
  )
}
const Center = ({children, ...props}) => {
  return /* @__PURE__ */ h(
    RowCenter,
    {
      ...props,
    },
    /* @__PURE__ */ h(ColCenter, null, children),
  )
}
const Grid = ({...props}) => {
  const {iconName, background, text, href} = props
  return /* @__PURE__ */ h(
    'wstack',
    {
      background,
      href,
    },
    /* @__PURE__ */ h(
      Center,
      {
        background: '#00000033',
      },
      /* @__PURE__ */ h(
        'wstack',
        {
          flexDirection: 'column',
        },
        /* @__PURE__ */ h(
          RowCenter,
          null,
          /* @__PURE__ */ h('wimage', {
            src: iconName,
            filter: textColor,
            width: 20,
            height: 20,
          }),
        ),
        /* @__PURE__ */ h(
          RowCenter,
          null,
          /* @__PURE__ */ h(
            'wtext',
            {
              font: new Font('heavymenlo', 12.5),
              textColor,
            },
            text,
          ),
        ),
      ),
    ),
  )
}
class Music163 {
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
    const favoriteImageUrl = ((await this.getRandomMusic(favoriteListId)) || {}).picUrl
    const likeImageUrl = ((await this.getRandomMusic(likeListId)) || {}).picUrl
    const cloudImageUrl = ((await this.getRandomMusic(cloudListId)) || {}).picUrl
    const updateInterval = 3 * 60 * 60 * 1e3
    return /* @__PURE__ */ h(
      'wbox',
      {
        padding: [0, 0, 0, 0],
        updateDate: new Date(Date.now() + updateInterval),
      },
      /* @__PURE__ */ h(
        'wstack',
        null,
        /* @__PURE__ */ h(Grid, {
          iconName: 'heart.fill',
          text: 'Favorite',
          background: favoriteImageUrl || '#d65151',
          href: 'orpheus://playlist/' + favoriteListId + '?autoplay=1',
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
              iconName: 'star.fill',
              text: 'Like',
              background: likeImageUrl || '#5ebb07',
              href: 'orpheus://playlist/' + likeListId + '?autoplay=1',
            }),
            /* @__PURE__ */ h(Grid, {
              iconName: 'person.icloud.fill',
              text: 'Cloud',
              background: cloudImageUrl || '#0fb196',
              href: 'orpheus://playlist/' + cloudListId + '?autoplay=1',
            }),
          ),
          /* @__PURE__ */ h(
            'wstack',
            null,
            /* @__PURE__ */ h(Grid, {
              iconName: 'calendar',
              text: 'Daily',
              background: '#fe9500',
              href: 'orpheus://songrcmd?autoplay=1',
            }),
            /* @__PURE__ */ h(Grid, {
              iconName: 'radio.fill',
              text: 'FM',
              background: '#000000',
              href: 'orpheuswidget://radio',
            }),
          ),
        ),
      ),
    )
  }
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['自定义歌单', '预览组件'],
    })
    let musicListId
    switch (selectIndex) {
      case 0:
        const {texts} = await showModal({
          title: '设置歌单',
          content: '去网易云歌单 -> 分享 -> 复制链接， 然后粘贴到此',
          inputItems: [
            {
              placeholder: '这里填 Favorite 的歌单链接',
            },
            {
              placeholder: '这里填 Like 的歌单链接',
            },
            {
              placeholder: '这里填 Cloud 的歌单链接',
            },
          ],
        })
        if (texts[0]) {
          musicListId = this.getListIdFromLink(texts[0])
          musicListId && setStorage2('favoriteListId', musicListId)
          !musicListId &&
            (await showNotification({
              title: '歌单链接错误',
              body: 'Favorite 的歌单链接检测不到歌单 id ',
              sound: 'failure',
            }))
        }
        if (texts[1]) {
          musicListId = this.getListIdFromLink(texts[1])
          musicListId && setStorage2('likeListId', musicListId)
          !musicListId &&
            (await showNotification({title: '歌单链接错误', body: 'Like 的歌单链接检测不到歌单 id ', sound: 'failure'}))
        }
        if (texts[2]) {
          musicListId = this.getListIdFromLink(texts[2])
          musicListId && setStorage2('cloudListId', musicListId)
          !musicListId &&
            (await showNotification({
              title: '歌单链接错误',
              body: 'cloud 的歌单链接检测不到歌单 id ',
              sound: 'failure',
            }))
        }
        await showNotification({title: '设置完成', sound: 'default'})
        break
      case 1:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
  getListIdFromLink(musicListLink) {
    return Number((musicListLink.match(/\&id\=([\d]+)/) || [])[1]) || null
  }
  async getMusicListData(musicListId) {
    let tracks = []
    try {
      tracks =
        (
          await request({
            url: `https://api.imjad.cn/cloudmusic/?type=playlist&id=${musicListId}`,
            dataType: 'json',
          })
        ).data?.playlist.tracks || []
    } catch (err) {
      console.warn(`获取歌单数据失败：${err}`)
    }
    return tracks
  }
  async getRandomMusic(musicListId) {
    const tracks = await this.getMusicListData(musicListId)
    if (tracks.length <= 0) {
      await showNotification({title: `歌单ID${musicListId}获取出错`, body: '该歌单没有歌曲或获取歌曲失败'})
      return null
    }
    return tracks[getRandomInt(0, tracks.length - 1)].al
  }
}
new Music163().init()
