// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;
//
// 「小件件」
// 开发环境，用于小组件调用
// https://x.im3x.cn
// https://github.com/im3x/Scriptables
//

// 组件基础类
// const RUNTIME_VERSION = 20201104

class Base {
  public arg: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public _actions: Record<string, (...args: any[]) => any>
  public widgetFamily!: string
  public SETTING_KEY!: string
  public FILE_MGR!: FileManager
  public FILE_MGR_LOCAL!: FileManager
  public BACKGROUND_KEY!: string
  public settings!: Record<string, unknown>
  public name!: string
  public desc!: string;
  [key: string]: unknown
  constructor(arg = '') {
    this.arg = arg
    this._actions = {}
    this.init()
  }

  init(widgetFamily = config.widgetFamily): void {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily || 'medium'
    // 系统设置的key，这里分为三个类型：
    // 1. 全局
    // 2. 不同尺寸的小组件
    // 3. 不同尺寸+小组件自定义的参数
    // 当没有key2时，获取key1，没有key1获取全局key的设置
    // this.SETTING_KEY = this.md5(Script.name()+'@'+this.widgetFamily+"@"+this.arg)
    // this.SETTING_KEY1 = this.md5(Script.name()+'@'+this.widgetFamily)
    this.SETTING_KEY = this.md5(Script.name())
    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    // this.FILE_MGR = FileManager[MODULE.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local()
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(
      this.FILE_MGR_LOCAL.documentsDirectory(),
      `bg_${this.SETTING_KEY}.jpg`,
    )
    // this.BACKGROUND_KEY1 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY1}.jpg`)
    // this.BACKGROUND_KEY2 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY2}.jpg`)
    // // 插件设置
    this.settings = this.getSettings()
  }

  render(): Promise<ListWidget> {
    throw new Error('抽象方法，要自行实现')
  }

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  registerAction(name: string, func: () => unknown): void {
    this._actions[name] = func.bind(this)
  }

  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl(name = '', data = ''): string {
    const u = URLScheme.forRunningScript()
    const q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(
      this.arg,
    )}&__size=${this.widgetFamily}`
    let result = ''
    if (u.includes('run?')) {
      result = `${u}&${q}`
    } else {
      result = `${u}?${q}`
    }
    return result
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode(str: string): string {
    const data = Data.fromString(str)
    return data.toBase64String()
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode(b64: string): string {
    const data = Data.fromBase64String(b64)
    return data.toRawString()
  }

  /**
   * md5 加密字符串
   * @param {string} str 要加密成md5的数据
   */
  md5(string: string): string {
    function RotateLeft(lValue: number, iShiftBits: number) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    function AddUnsigned(lX: number, lY: number) {
      const lX8 = lX & 0x80000000
      const lY8 = lY & 0x80000000
      const lX4 = lX & 0x40000000
      const lY4 = lY & 0x40000000
      const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8
        }
      } else {
        return lResult ^ lX8 ^ lY8
      }
    }

    function F(x: number, y: number, z: number) {
      return (x & y) | (~x & z)
    }

    function G(x: number, y: number, z: number) {
      return (x & z) | (y & ~z)
    }

    function H(x: number, y: number, z: number) {
      return x ^ y ^ z
    }

    function I(x: number, y: number, z: number) {
      return y ^ (x | ~z)
    }

    function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    }

    function ConvertToWordArray(string: string): number[] {
      let lWordCount
      const lMessageLength = string.length
      const lNumberOfWords_temp1 = lMessageLength + 8
      const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
      const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
      const lWordArray = Array(lNumberOfWords - 1)
      let lBytePosition = 0
      let lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    function WordToHex(lValue: number) {
      let WordToHexValue = '',
        WordToHexValue_temp = '',
        lByte,
        lCount
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        WordToHexValue_temp = '0' + lByte.toString(16)
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
      }
      return WordToHexValue
    }

    function Utf8Encode(string: string): string {
      string = string.replace(/\r\n/g, '\n')
      let utftext = ''

      for (let n = 0; n < string.length; n++) {
        const c = string.charCodeAt(n)

        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }

      return utftext
    }

    let x = []
    let k, AA, BB, CC, DD, a, b, c, d
    const S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22
    const S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20
    const S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23
    const S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21

    string = Utf8Encode(string)

    x = ConvertToWordArray(string)

    a = 0x67452301
    b = 0xefcdab89
    c = 0x98badcfe
    d = 0x10325476

    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db)
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244)
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97)
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314)
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
      a = AddUnsigned(a, AA)
      b = AddUnsigned(b, BB)
      c = AddUnsigned(c, CC)
      d = AddUnsigned(d, DD)
    }

    const temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)

    return temp.toLowerCase()
  }

  /**
   * HTTP 请求接口
   * @param {string} url 请求的url
   * @param {bool} json 返回数据是否为 json，默认 true
   * @param {bool} useCache 是否采用离线缓存（请求失败后获取上一次结果），
   * @return {string | json | null}
   */
  async httpGet(url: string, json = true, useCache = false): Promise<unknown> {
    let data = null
    const cacheKey = this.md5(url)
    if (useCache && Keychain.contains(cacheKey)) {
      const cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    try {
      const req = new Request(url)
      data = await (json ? req.loadJSON() : req.loadString())
    } catch (e) {}
    // 判断数据是否为空（加载失败）
    if (!data && Keychain.contains(cacheKey)) {
      // 判断是否有缓存
      const cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    // 存储缓存
    Keychain.set(cacheKey, json ? JSON.stringify(data) : (data as string))
    return data
  }

  // async httpPost(url: string, data: unknown): Promise<void> {}

  /**
   * 获取远程图片内容
   * @param {string} url 图片地址
   * @param {bool} useCache 是否使用缓存（请求失败时获取本地缓存）
   */
  async getImageByUrl(url: string, useCache = true): Promise<Image | null> {
    const cacheKey = this.md5(url)
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey)
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      return Image.fromFile(cacheFile)
    }
    try {
      const req = new Request(url)
      const img = await req.loadImage()
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img)
      return img
    } catch (e) {
      // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      const ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return await ctx.getImage()
    }
  }

  /**
   * 渲染标题内容
   * @param {object} widget 组件对象
   * @param {string} icon 图标地址
   * @param {string} title 标题内容
   * @param {bool|color} color 字体的颜色（自定义背景时使用，默认系统）
   */
  async renderHeader(
    widget: ListWidget,
    icon: string,
    title: string,
    color: boolean | Color = false,
  ): Promise<ListWidget> {
    const header = widget.addStack()
    header.centerAlignContent()
    const _icon = header.addImage((await this.getImageByUrl(icon)) as Image)
    _icon.imageSize = new Size(14, 14)
    _icon.cornerRadius = 4
    header.addSpacer(10)
    const _title = header.addText(title)
    if (color) _title.textColor = color as Color
    _title.textOpacity = 0.7
    _title.font = Font.boldSystemFont(12)
    widget.addSpacer(35)
    return widget
  }

  /**
   * 获取截图中的组件剪裁图
   * 可用作透明背景
   * 返回图片image对象
   * 代码改自：https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9
   * @param {string} title 开始处理前提示用户截图的信息，可选（适合用在组件自定义透明背景时提示）
   */
  async getWidgetScreenShot(title = null): Promise<Image | undefined> {
    // Generate an alert with the provided array of options.
    async function generateAlert(message: string, options: string[]) {
      const alert = new Alert()
      alert.message = message

      for (const option of options) {
        alert.addAction(option)
      }

      const response = await alert.presentAlert()
      return response
    }

    // Crop an image into the specified rect.
    function cropImage(img: Image, rect: Rect) {
      const draw = new DrawContext()
      draw.size = new Size(rect.width, rect.height)

      draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y))
      return draw.getImage()
    }

    // Pixel sizes and positions for widgets on all supported phones.
    function phoneSizes(): Record<
      number,
      {
        small: number
        medium: number
        large: number
        left: number
        right: number
        top: number
        middle: number
        bottom: number
        [key: string]: number
      }
    > {
      const phones = {
        // 12 pro max
        '2778': {
          small: 510,
          medium: 1092,
          large: 1146,
          left: 96,
          right: 678,
          top: 246,
          middle: 882,
          bottom: 1518,
        },

        // 12 and 12 Pro
        '2532': {
          small: 474,
          medium: 1014,
          large: 1062,
          left: 78,
          right: 618,
          top: 231,
          middle: 819,
          bottom: 1407,
        },

        // 11 Pro Max, XS Max
        '2688': {
          small: 507,
          medium: 1080,
          large: 1137,
          left: 81,
          right: 654,
          top: 228,
          middle: 858,
          bottom: 1488,
        },

        // 11, XR
        '1792': {
          small: 338,
          medium: 720,
          large: 758,
          left: 54,
          right: 436,
          top: 160,
          middle: 580,
          bottom: 1000,
        },

        // 11 Pro, XS, X
        '2436': {
          small: 465,
          medium: 987,
          large: 1035,
          left: 69,
          right: 591,
          top: 213,
          middle: 783,
          bottom: 1353,
        },

        // Plus phones
        '2208': {
          small: 471,
          medium: 1044,
          large: 1071,
          left: 99,
          right: 672,
          top: 114,
          middle: 696,
          bottom: 1278,
        },

        // SE2 and 6/6S/7/8
        '1334': {
          small: 296,
          medium: 642,
          large: 648,
          left: 54,
          right: 400,
          top: 60,
          middle: 412,
          bottom: 764,
        },

        // SE1
        '1136': {
          small: 282,
          medium: 584,
          large: 622,
          left: 30,
          right: 332,
          top: 59,
          middle: 399,
          bottom: 399,
        },

        // 11 and XR in Display Zoom mode
        '1624': {
          small: 310,
          medium: 658,
          large: 690,
          left: 46,
          right: 394,
          top: 142,
          middle: 522,
          bottom: 902,
        },

        // Plus in Display Zoom mode
        '2001': {
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
      return phones
    }

    let message
    message = title || '开始之前，请先前往桌面,截取空白界面的截图。然后回来继续'
    const exitOptions = ['我已截图', '前去截图 >']
    const shouldExit = await generateAlert(message, exitOptions)
    if (shouldExit) return

    // Get screenshot and determine phone size.
    const img = await Photos.fromLibrary()
    const height = img.size.height
    const phone = phoneSizes()[height]
    if (!phone) {
      message = '好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论'
      const _id = await generateAlert(message, ['帮助', '取消'])
      if (_id === 0) Safari.openInApp('https://support.qq.com/products/287371', false)
      return
    }

    // Prompt for widget size and position.
    message = '截图中要设置透明背景组件的尺寸类型是？'
    const sizes = ['小尺寸', '中尺寸', '大尺寸']
    const size = await generateAlert(message, sizes)
    const widgetSize = sizes[size]

    message = '要设置透明背景的小组件在哪个位置？'
    message +=
      height == 1136 ? ' （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）' : ''

    // Determine image crop based on phone size.
    const crop = {w: 0, h: 0, x: 0, y: 0}
    if (widgetSize == '小尺寸') {
      crop.w = phone.small
      crop.h = phone.small
      const positions = ['左上角', '右上角', '中间左', '中间右', '左下角', '右下角']
      const _posotions = ['Top left', 'Top right', 'Middle left', 'Middle right', 'Bottom left', 'Bottom right']
      const position = await generateAlert(message, positions)

      // Convert the two words into two keys for the phone size dictionary.
      const keys = _posotions[position].toLowerCase().split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
    } else if (widgetSize == '中尺寸') {
      crop.w = phone.medium
      crop.h = phone.small

      // Medium and large widgets have a fixed x-value.
      crop.x = phone.left
      const positions = ['顶部', '中间', '底部']
      const _positions = ['Top', 'Middle', 'Bottom']
      const position = await generateAlert(message, positions)
      const key = _positions[position].toLowerCase()
      crop.y = phone[key]
    } else if (widgetSize == '大尺寸') {
      crop.w = phone.medium
      crop.h = phone.large
      crop.x = phone.left
      const positions = ['顶部', '底部']
      const position = await generateAlert(message, positions)

      // Large widgets at the bottom have the "middle" y-value.
      crop.y = position ? phone.middle : phone.top
    }

    // Crop image and finalize the widget.
    const imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))

    return imgCrop
  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify(title: string, body = '', url?: string, opts = {}): Promise<void> {
    let n = new Notification()
    n = Object.assign(n, opts)
    n.title = title
    n.body = body
    if (url) n.openURL = url
    return await n.schedule()
  }

  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {float} opacity 透明度
   */
  async shadowImage(img: Image, color = '#000000', opacity = 0.7): Promise<Image> {
    const ctx = new DrawContext()
    // 获取图片的尺寸
    ctx.size = img.size

    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
    ctx.setFillColor(new Color(color, opacity))
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))

    const res = await ctx.getImage()
    return res
  }

  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json = true): Record<string, unknown> {
    let res = json ? {} : ''
    let cache = ''
    // if (global && Keychain.contains(this.SETTING_KEY2)) {
    //   cache = Keychain.get(this.SETTING_KEY2)
    // } else if (Keychain.contains(this.SETTING_KEY)) {
    //   cache = Keychain.get(this.SETTING_KEY)
    // } else if (Keychain.contains(this.SETTING_KEY1)) {
    //   cache = Keychain.get(this.SETTING_KEY1)
    // } else if (Keychain.contains(this.SETTING_KEY2)){
    if (Keychain.contains(this.SETTING_KEY)) {
      cache = Keychain.get(this.SETTING_KEY)
    }
    if (json) {
      try {
        res = JSON.parse(cache)
      } catch (e) {}
    } else {
      res = cache
    }

    return res
  }

  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify = true): void {
    const res = typeof this.settings === 'object' ? JSON.stringify(this.settings) : String(this.settings)
    Keychain.set(this.SETTING_KEY, res)
    if (notify) this.notify('设置成功', '桌面组件稍后将自动刷新')
  }

  /**
   * 获取当前插件是否有自定义背景图片
   * @reutrn img | false
   */
  getBackgroundImage(): Image | null {
    // 如果有KEY则优先加载，key>key1>key2
    // key2是全局
    let result = null
    if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
      result = Image.fromFile(this.BACKGROUND_KEY)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
      //   result = Image.fromFile(this.BACKGROUND_KEY1)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
      //   result = Image.fromFile(this.BACKGROUND_KEY2)
    }
    return result
  }

  /**
   * 设置当前组件的背景图片
   * @param {image} img
   */
  setBackgroundImage(img: Image, notify = true): void {
    if (!img) {
      // 移除背景
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY)
        // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
        //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY1)
        // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
        //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY2)
      }
      if (notify) this.notify('移除成功', '小组件背景图片已移除，稍后刷新生效')
    } else {
      // 设置背景
      // 全部设置一遍，
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY1, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY2, img)
      if (notify) this.notify('设置成功', '小组件背景图片已设置！稍后刷新生效')
    }
  }
}
// @base.end
const Testing = async (Widget: {new (arg: string): Base}, default_args = ''): Promise<void> => {
  let M: Base
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget((args.widgetParameter as string) || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else {
    const {act, data, __arg, __size} = args.queryParameters
    M = new Widget(__arg || default_args || '')
    if (__size) M.init(__size as typeof config.widgetFamily)
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions']
      const _actions = [
        // 远程开发
        async () => {
          // 1. 获取服务器ip
          const a = new Alert()
          a.title = '服务器 IP'
          a.message = '请输入远程开发服务器（电脑）IP地址'
          let xjj_debug_server = '192.168.1.3'
          if (Keychain.contains('xjj_debug_server')) {
            xjj_debug_server = Keychain.get('xjj_debug_server')
          }
          a.addTextField('server-ip', xjj_debug_server)
          a.addAction('连接')
          a.addCancelAction('取消')
          const id = await a.presentAlert()
          if (id === -1) return
          const ip = a.textFieldValue(0)
          // 保存到本地
          Keychain.set('xjj_debug_server', ip)
          const server_api = `http://${ip}:5566`
          // 2. 发送当前文件到远程服务器
          const SELF_FILE = MODULE.filename.replace('「小件件」开发环境', Script.name())
          const req = new Request(`${server_api}/sync`)
          req.method = 'POST'
          req.addFileToMultipart(SELF_FILE, 'Widget', Script.name())
          try {
            const res = await req.loadString()
            if (res !== 'ok') {
              return M.notify('连接失败', res)
            }
          } catch (e) {
            return M.notify('连接错误', e.message)
          }
          M.notify('连接成功', '编辑文件后保存即可进行下一步预览操作')
          // 重写console.log方法，把数据传递到nodejs
          const rconsole_log = async (data: unknown, t = 'log') => {
            const _req = new Request(`${server_api}/console`)
            _req.method = 'POST'
            _req.headers = {
              'Content-Type': 'application/json',
            }
            _req.body = JSON.stringify({
              t,
              data,
            })
            return await _req.loadString()
          }
          const lconsole_log = console.log.bind(console)
          const lconsole_warn = console.warn.bind(console)
          const lconsole_error = console.error.bind(console)
          console.log = d => {
            lconsole_log(d)
            rconsole_log(d, 'log')
          }
          console.warn = d => {
            lconsole_warn(d)
            rconsole_log(d, 'warn')
          }
          console.error = d => {
            lconsole_error(d)
            rconsole_log(d, 'error')
          }
          // 3. 同步
          while (1) {
            let _res = ''
            try {
              const _req = new Request(`${server_api}/sync?name=${encodeURIComponent(Script.name())}`)
              _res = await _req.loadString()
            } catch (e) {
              M.notify('停止调试', '与开发服务器的连接已终止')
              break
            }
            if (_res === 'stop') {
              console.log('[!] 停止同步')
              break
            } else if (_res === 'no') {
              // console.log("[-] 没有更新内容")
            } else if (_res.length > 0) {
              M.notify('同步成功', '新文件已同步，大小：' + _res.length)
              // 重新加载组件
              // 1. 读取当前源码
              const _code = _res.split('// @组件代码开始')[1].split('// @组件代码结束')[0]
              // 2. 解析 widget class
              let NewWidget = null
              try {
                const _func = new Function(`const _Debugger = Base => {\n${_code}\nreturn Widget\n}\nreturn _Debugger`)
                NewWidget = _func()(Base)
              } catch (e) {
                M.notify('解析失败', e.message)
              }
              if (!NewWidget) continue
              // 3. 重新执行 widget class
              // delete M
              M = new NewWidget(__arg || default_args || '')
              if (__size) M.init(__size as typeof config.widgetFamily)
              // 写入文件
              FileManager.local().writeString(SELF_FILE, _res)
              // 执行预览
              const i = await _actions[1](true)
              if (i === 4 + Object.keys(actions).length) break
            }
          }
        },
        // 预览组件
        async (debug = false) => {
          const a = new Alert()
          a.title = '预览组件'
          a.message = '测试桌面组件在各种尺寸下的显示效果'
          a.addAction('小尺寸 Small')
          a.addAction('中尺寸 Medium')
          a.addAction('大尺寸 Large')
          a.addAction('全部 All')
          a.addCancelAction('取消操作')
          const funcs = []
          if (debug) {
            for (const _ in actions) {
              a.addAction(_)
              funcs.push(actions[_].bind(M))
            }
            a.addDestructiveAction('停止调试')
          }
          const i = await a.presentSheet()
          if (i === -1) return
          let w
          switch (i) {
            case 0:
              M.widgetFamily = 'small'
              w = await M.render()
              await w.presentSmall()
              break
            case 1:
              M.widgetFamily = 'medium'
              w = await M.render()
              await w.presentMedium()
              break
            case 2:
              M.widgetFamily = 'large'
              w = await M.render()
              await w.presentLarge()
              break
            case 3:
              M.widgetFamily = 'small'
              w = await M.render()
              await w.presentSmall()
              M.widgetFamily = 'medium'
              w = await M.render()
              await w.presentMedium()
              M.widgetFamily = 'large'
              w = await M.render()
              await w.presentLarge()
              break
            default:
              const func = funcs[i - 4]
              if (func) await func()
              break
          }

          return i
        },
        // 复制源码
        async () => {
          const SELF_FILE = MODULE.filename.replace('「小件件」开发环境', Script.name())
          const source = FileManager.local().readString(SELF_FILE)
          Pasteboard.copyString(source)
          await M.notify('复制成功', '当前脚本的源代码已复制到剪贴板！')
        },
        async () => {
          Safari.openInApp('https://www.kancloud.cn/im3x/scriptable/content', false)
        },
        async () => {
          Safari.openInApp('https://support.qq.com/products/287371', false)
        },
      ]
      const alert = new Alert()
      alert.title = M.name
      alert.message = M.desc
      alert.addAction('远程开发')
      alert.addAction('预览组件')
      alert.addAction('复制源码')
      alert.addAction('开发文档')
      alert.addAction('反馈交流')
      for (const _ in actions) {
        alert.addAction(_)
        _actions.push(actions[_])
      }
      alert.addCancelAction('取消操作')
      const idx = await alert.presentSheet()
      if (_actions[idx]) {
        const func = _actions[idx]
        await func()
      }
      return
    }
    const _tmp = act
      .split('-')
      .map(_ => _[0].toUpperCase() + _.substr(1))
      .join('')
    const _act = `action${_tmp}`
    if (M[_act] && typeof M[_act] === 'function') {
      const func = (M[_act] as (...args: unknown[]) => void).bind(M)
      await func(data)
    }
  }
}

// 自更新
// 流程：
// 1. 获取远程gitee仓库的本文件代码
// 2. 对比sha，如果和本地存储的不一致，则下载
// 3. 下载保存，存储sha
// 4. 更新时间为每小时一次
//
// ;(async () => {
//   const UPDATE_KEY = 'XJJ_UPDATE_AT'
//   let UPDATED_AT = 0
//   const UPDATE_FILE = '「小件件」开发环境.js'
//   const FILE_MGR = FileManager[MODULE.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
//   if (Keychain.contains(UPDATE_KEY)) {
//     UPDATED_AT = parseInt(Keychain.get(UPDATE_KEY))
//   }
//   if (UPDATED_AT > +new Date() - 1000 * 60 * 60) return console.warn('[-] 1 小时内已检查过更新')
//   console.log('[*] 检测开发环境是否有更新..')
//   const req = new Request<Record<string, unknown>>('https://gitee.com/im3x/Scriptables/raw/v2-dev/package.json')
//   const res = await req.loadJSON()
//   console.log(`[+] 远程开发环境版本：${res['runtime_ver']}`)
//   if (res['runtime_ver'] === RUNTIME_VERSION) return console.warn('[-] 远程版本一致，暂无更新')
//   console.log('[+] 开始更新开发环境..')
//   const REMOTE_REQ = new Request(
//     'https://gitee.com/im3x/Scriptables/raw/v2-dev/Scripts/%E3%80%8C%E5%B0%8F%E4%BB%B6%E4%BB%B6%E3%80%8D%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83.js',
//   )
//   const REMOTE_RES = await REMOTE_REQ.load()
//   FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), UPDATE_FILE), REMOTE_RES)
//   const n = new Notification()
//   n.title = '更新成功'
//   n.body = '「小件件」开发环境已自动更新！'
//   n.schedule()
//   UPDATED_AT = +new Date()
//   Keychain.set(UPDATE_KEY, String(UPDATED_AT))
// })()

export {Base, Testing}
