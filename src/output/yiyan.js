// @编译时间 1606903060596
const MODULE = module

// src/lib/base.ts
class Base {
  constructor(arg = '') {
    this.arg = arg
    this._actions = {}
    this.init()
  }
  init(widgetFamily = config.widgetFamily) {
    this.widgetFamily = widgetFamily || 'medium'
    this.SETTING_KEY = this.md5(Script.name())
    this.FILE_MGR_LOCAL = FileManager.local()
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(
      this.FILE_MGR_LOCAL.documentsDirectory(),
      `bg_${this.SETTING_KEY}.jpg`,
    )
    this.settings = this.getSettings()
  }
  render() {
    throw new Error('抽象方法，要自行实现')
  }
  registerAction(name, func) {
    this._actions[name] = func.bind(this)
  }
  actionUrl(name = '', data = '') {
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
  base64Encode(str) {
    const data = Data.fromString(str)
    return data.toBase64String()
  }
  base64Decode(b64) {
    const data = Data.fromBase64String(b64)
    return data.toRawString()
  }
  md5(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }
    function AddUnsigned(lX, lY) {
      const lX8 = lX & 2147483648
      const lY8 = lY & 2147483648
      const lX4 = lX & 1073741824
      const lY4 = lY & 1073741824
      const lResult = (lX & 1073741823) + (lY & 1073741823)
      if (lX4 & lY4) {
        return lResult ^ 2147483648 ^ lX8 ^ lY8
      }
      if (lX4 | lY4) {
        if (lResult & 1073741824) {
          return lResult ^ 3221225472 ^ lX8 ^ lY8
        } else {
          return lResult ^ 1073741824 ^ lX8 ^ lY8
        }
      } else {
        return lResult ^ lX8 ^ lY8
      }
    }
    function F(x2, y, z) {
      return (x2 & y) | (~x2 & z)
    }
    function G(x2, y, z) {
      return (x2 & z) | (y & ~z)
    }
    function H(x2, y, z) {
      return x2 ^ y ^ z
    }
    function I(x2, y, z) {
      return y ^ (x2 | ~z)
    }
    function FF(a2, b2, c2, d2, x2, s, ac) {
      a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(F(b2, c2, d2), x2), ac))
      return AddUnsigned(RotateLeft(a2, s), b2)
    }
    function GG(a2, b2, c2, d2, x2, s, ac) {
      a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(G(b2, c2, d2), x2), ac))
      return AddUnsigned(RotateLeft(a2, s), b2)
    }
    function HH(a2, b2, c2, d2, x2, s, ac) {
      a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(H(b2, c2, d2), x2), ac))
      return AddUnsigned(RotateLeft(a2, s), b2)
    }
    function II(a2, b2, c2, d2, x2, s, ac) {
      a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(I(b2, c2, d2), x2), ac))
      return AddUnsigned(RotateLeft(a2, s), b2)
    }
    function ConvertToWordArray(string2) {
      let lWordCount
      const lMessageLength = string2.length
      const lNumberOfWords_temp1 = lMessageLength + 8
      const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
      const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
      const lWordArray = Array(lNumberOfWords - 1)
      let lBytePosition = 0
      let lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (string2.charCodeAt(lByteCount) << lBytePosition)
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }
    function WordToHex(lValue) {
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
    function Utf8Encode(string2) {
      string2 = string2.replace(/\r\n/g, '\n')
      let utftext = ''
      for (let n = 0; n < string2.length; n++) {
        const c2 = string2.charCodeAt(n)
        if (c2 < 128) {
          utftext += String.fromCharCode(c2)
        } else if (c2 > 127 && c2 < 2048) {
          utftext += String.fromCharCode((c2 >> 6) | 192)
          utftext += String.fromCharCode((c2 & 63) | 128)
        } else {
          utftext += String.fromCharCode((c2 >> 12) | 224)
          utftext += String.fromCharCode(((c2 >> 6) & 63) | 128)
          utftext += String.fromCharCode((c2 & 63) | 128)
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
    a = 1732584193
    b = 4023233417
    c = 2562383102
    d = 271733878
    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 3614090360)
      d = FF(d, a, b, c, x[k + 1], S12, 3905402710)
      c = FF(c, d, a, b, x[k + 2], S13, 606105819)
      b = FF(b, c, d, a, x[k + 3], S14, 3250441966)
      a = FF(a, b, c, d, x[k + 4], S11, 4118548399)
      d = FF(d, a, b, c, x[k + 5], S12, 1200080426)
      c = FF(c, d, a, b, x[k + 6], S13, 2821735955)
      b = FF(b, c, d, a, x[k + 7], S14, 4249261313)
      a = FF(a, b, c, d, x[k + 8], S11, 1770035416)
      d = FF(d, a, b, c, x[k + 9], S12, 2336552879)
      c = FF(c, d, a, b, x[k + 10], S13, 4294925233)
      b = FF(b, c, d, a, x[k + 11], S14, 2304563134)
      a = FF(a, b, c, d, x[k + 12], S11, 1804603682)
      d = FF(d, a, b, c, x[k + 13], S12, 4254626195)
      c = FF(c, d, a, b, x[k + 14], S13, 2792965006)
      b = FF(b, c, d, a, x[k + 15], S14, 1236535329)
      a = GG(a, b, c, d, x[k + 1], S21, 4129170786)
      d = GG(d, a, b, c, x[k + 6], S22, 3225465664)
      c = GG(c, d, a, b, x[k + 11], S23, 643717713)
      b = GG(b, c, d, a, x[k + 0], S24, 3921069994)
      a = GG(a, b, c, d, x[k + 5], S21, 3593408605)
      d = GG(d, a, b, c, x[k + 10], S22, 38016083)
      c = GG(c, d, a, b, x[k + 15], S23, 3634488961)
      b = GG(b, c, d, a, x[k + 4], S24, 3889429448)
      a = GG(a, b, c, d, x[k + 9], S21, 568446438)
      d = GG(d, a, b, c, x[k + 14], S22, 3275163606)
      c = GG(c, d, a, b, x[k + 3], S23, 4107603335)
      b = GG(b, c, d, a, x[k + 8], S24, 1163531501)
      a = GG(a, b, c, d, x[k + 13], S21, 2850285829)
      d = GG(d, a, b, c, x[k + 2], S22, 4243563512)
      c = GG(c, d, a, b, x[k + 7], S23, 1735328473)
      b = GG(b, c, d, a, x[k + 12], S24, 2368359562)
      a = HH(a, b, c, d, x[k + 5], S31, 4294588738)
      d = HH(d, a, b, c, x[k + 8], S32, 2272392833)
      c = HH(c, d, a, b, x[k + 11], S33, 1839030562)
      b = HH(b, c, d, a, x[k + 14], S34, 4259657740)
      a = HH(a, b, c, d, x[k + 1], S31, 2763975236)
      d = HH(d, a, b, c, x[k + 4], S32, 1272893353)
      c = HH(c, d, a, b, x[k + 7], S33, 4139469664)
      b = HH(b, c, d, a, x[k + 10], S34, 3200236656)
      a = HH(a, b, c, d, x[k + 13], S31, 681279174)
      d = HH(d, a, b, c, x[k + 0], S32, 3936430074)
      c = HH(c, d, a, b, x[k + 3], S33, 3572445317)
      b = HH(b, c, d, a, x[k + 6], S34, 76029189)
      a = HH(a, b, c, d, x[k + 9], S31, 3654602809)
      d = HH(d, a, b, c, x[k + 12], S32, 3873151461)
      c = HH(c, d, a, b, x[k + 15], S33, 530742520)
      b = HH(b, c, d, a, x[k + 2], S34, 3299628645)
      a = II(a, b, c, d, x[k + 0], S41, 4096336452)
      d = II(d, a, b, c, x[k + 7], S42, 1126891415)
      c = II(c, d, a, b, x[k + 14], S43, 2878612391)
      b = II(b, c, d, a, x[k + 5], S44, 4237533241)
      a = II(a, b, c, d, x[k + 12], S41, 1700485571)
      d = II(d, a, b, c, x[k + 3], S42, 2399980690)
      c = II(c, d, a, b, x[k + 10], S43, 4293915773)
      b = II(b, c, d, a, x[k + 1], S44, 2240044497)
      a = II(a, b, c, d, x[k + 8], S41, 1873313359)
      d = II(d, a, b, c, x[k + 15], S42, 4264355552)
      c = II(c, d, a, b, x[k + 6], S43, 2734768916)
      b = II(b, c, d, a, x[k + 13], S44, 1309151649)
      a = II(a, b, c, d, x[k + 4], S41, 4149444226)
      d = II(d, a, b, c, x[k + 11], S42, 3174756917)
      c = II(c, d, a, b, x[k + 2], S43, 718787259)
      b = II(b, c, d, a, x[k + 9], S44, 3951481745)
      a = AddUnsigned(a, AA)
      b = AddUnsigned(b, BB)
      c = AddUnsigned(c, CC)
      d = AddUnsigned(d, DD)
    }
    const temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)
    return temp.toLowerCase()
  }
  async httpGet(url, json = true, useCache = false) {
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
    if (!data && Keychain.contains(cacheKey)) {
      const cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    Keychain.set(cacheKey, json ? JSON.stringify(data) : data)
    return data
  }
  async getImageByUrl(url, useCache = true) {
    const cacheKey = this.md5(url)
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey)
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      return Image.fromFile(cacheFile)
    }
    try {
      const req = new Request(url)
      const img = await req.loadImage()
      FileManager.local().writeImage(cacheFile, img)
      return img
    } catch (e) {
      const ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return await ctx.getImage()
    }
  }
  async renderHeader(widget, icon, title, color = false) {
    const header = widget.addStack()
    header.centerAlignContent()
    const _icon = header.addImage(await this.getImageByUrl(icon))
    _icon.imageSize = new Size(14, 14)
    _icon.cornerRadius = 4
    header.addSpacer(10)
    const _title = header.addText(title)
    if (color) _title.textColor = color
    _title.textOpacity = 0.7
    _title.font = Font.boldSystemFont(12)
    widget.addSpacer(35)
    return widget
  }
  async getWidgetScreenShot(title = null) {
    async function generateAlert(message2, options) {
      const alert = new Alert()
      alert.message = message2
      for (const option of options) {
        alert.addAction(option)
      }
      const response = await alert.presentAlert()
      return response
    }
    function cropImage(img2, rect) {
      const draw = new DrawContext()
      draw.size = new Size(rect.width, rect.height)
      draw.drawImageAtPoint(img2, new Point(-rect.x, -rect.y))
      return draw.getImage()
    }
    function phoneSizes() {
      const phones = {
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
      return phones
    }
    let message
    message = title || '开始之前，请先前往桌面,截取空白界面的截图。然后回来继续'
    const exitOptions = ['我已截图', '前去截图 >']
    const shouldExit = await generateAlert(message, exitOptions)
    if (shouldExit) return
    const img = await Photos.fromLibrary()
    const height = img.size.height
    const phone = phoneSizes()[height]
    if (!phone) {
      message = '好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论'
      const _id = await generateAlert(message, ['帮助', '取消'])
      if (_id === 0) Safari.openInApp('https://support.qq.com/products/287371', false)
      return
    }
    message = '截图中要设置透明背景组件的尺寸类型是？'
    const sizes = ['小尺寸', '中尺寸', '大尺寸']
    const size = await generateAlert(message, sizes)
    const widgetSize = sizes[size]
    message = '要设置透明背景的小组件在哪个位置？'
    message +=
      height == 1136 ? ' （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）' : ''
    const crop = {w: 0, h: 0, x: 0, y: 0}
    if (widgetSize == '小尺寸') {
      crop.w = phone.small
      crop.h = phone.small
      const positions = ['左上角', '右上角', '中间左', '中间右', '左下角', '右下角']
      const _posotions = ['Top left', 'Top right', 'Middle left', 'Middle right', 'Bottom left', 'Bottom right']
      const position = await generateAlert(message, positions)
      const keys = _posotions[position].toLowerCase().split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]
    } else if (widgetSize == '中尺寸') {
      crop.w = phone.medium
      crop.h = phone.small
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
      crop.y = position ? phone.middle : phone.top
    }
    const imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))
    return imgCrop
  }
  async notify(title, body = '', url, opts = {}) {
    let n = new Notification()
    n = Object.assign(n, opts)
    n.title = title
    n.body = body
    if (url) n.openURL = url
    return await n.schedule()
  }
  async shadowImage(img, color = '#000000', opacity = 0.7) {
    const ctx = new DrawContext()
    ctx.size = img.size
    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
    ctx.setFillColor(new Color(color, opacity))
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
    const res = await ctx.getImage()
    return res
  }
  getSettings(json = true) {
    let res = json ? {} : ''
    let cache = ''
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
  saveSettings(notify = true) {
    const res = typeof this.settings === 'object' ? JSON.stringify(this.settings) : String(this.settings)
    Keychain.set(this.SETTING_KEY, res)
    if (notify) this.notify('设置成功', '桌面组件稍后将自动刷新')
  }
  getBackgroundImage() {
    let result = null
    if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
      result = Image.fromFile(this.BACKGROUND_KEY)
    }
    return result
  }
  setBackgroundImage(img, notify = true) {
    if (!img) {
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY)
      }
      if (notify) this.notify('移除成功', '小组件背景图片已移除，稍后刷新生效')
    } else {
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img)
      if (notify) this.notify('设置成功', '小组件背景图片已设置！稍后刷新生效')
    }
  }
}
const Testing = async (Widget2, default_args = '') => {
  let M
  if (config.runsInWidget) {
    M = new Widget2(args.widgetParameter || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else {
    const {act, data, __arg, __size} = args.queryParameters
    M = new Widget2(__arg || default_args || '')
    if (__size) M.init(__size)
    if (!act || !M['_actions']) {
      const actions = M['_actions']
      const _actions = [
        async () => {
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
          Keychain.set('xjj_debug_server', ip)
          const server_api = `http://${ip}:5566`
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
          const rconsole_log = async (data2, t = 'log') => {
            const _req = new Request(`${server_api}/console`)
            _req.method = 'POST'
            _req.headers = {
              'Content-Type': 'application/json',
            }
            _req.body = JSON.stringify({
              t,
              data: data2,
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
            } else if (_res.length > 0) {
              M.notify('同步成功', '新文件已同步，大小：' + _res.length)
              const _code = _res.split('// @组件代码开始')[1].split('// @组件代码结束')[0]
              let NewWidget = null
              try {
                const _func = new Function(`const _Debugger = Base => {
${_code}
return Widget
}
return _Debugger`)
                NewWidget = _func()(Base)
              } catch (e) {
                M.notify('解析失败', e.message)
              }
              if (!NewWidget) continue
              M = new NewWidget(__arg || default_args || '')
              if (__size) M.init(__size)
              FileManager.local().writeString(SELF_FILE, _res)
              const i = await _actions[1](true)
              if (i === 4 + Object.keys(actions).length) break
            }
          }
        },
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
      const func = M[_act].bind(M)
      await func(data)
    }
  }
}

// src/input/yiyan.ts
class Widget extends Base {
  constructor(arg = '') {
    super(arg)
    this.name = '一言'
    this.desc = '在茫茫句海中寻找能感动你的句子'
    this.settings = this.getSettings(true)
    if (this.settings && this.settings['arg']) {
      this.arg = this.settings['arg']
    }
    console.log('arg=' + this.arg)
    this.registerAction('插件设置', this.actionSetting)
  }
  async render() {
    const w = new ListWidget()
    await this.renderHeader(
      w,
      'https://txc.gtimg.com/data/285778/2020/1012/f9cf50f08ebb8bd391a7118c8348f5d8.png',
      '一言',
    )
    const data = await this._getData()
    const content = w.addText(data['hitokoto'])
    content.font = Font.lightSystemFont(16)
    w.addSpacer()
    const footer = w.addText(data['from'])
    footer.font = Font.lightSystemFont(12)
    footer.textOpacity = 0.5
    footer.rightAlignText()
    footer.lineLimit = 1
    w.url = this.actionUrl('menus', JSON.stringify(data))
    return w
  }
  async _getData() {
    const args2 = 'abcdefghijk'
    const types =
      this.arg
        .split('')
        .filter(c => args2.indexOf(c) > -1)
        .map(c => `c=${c}`)
        .join('&') || 'c=k'
    const api = `https://v1.hitokoto.cn/?${types}&encode=json`
    return await this.httpGet(api)
  }
  async actionSetting() {
    const a = new Alert()
    a.title = '插件设置'
    a.message = '桌面组件的个性化设置'
    a.addAction('句子类型')
    a.addCancelAction('取消设置')
    const id = await a.presentSheet()
    if (id === 0) {
      return await this.actionSetting1()
    }
  }
  async actionSetting1() {
    console.warn('setting--->' + this.arg)
    const caches = {}
    if (this.arg) {
      this.arg.split('').map(a => {
        caches[a] = true
      })
    }
    const a1 = new Alert()
    const keys = [
      ['a', '动画'],
      ['b', '漫画'],
      ['c', '游戏'],
      ['d', '文学'],
      ['e', '原创'],
      ['g', '其他'],
      ['h', '影视'],
      ['i', '诗词'],
      ['k', '哲学'],
      ['j', '网易云'],
      ['f', '来自网络'],
    ]
    a1.title = '句子类型'
    a1.message = '桌面组件显示的语句内容类型'
    keys.map(k => {
      const _id = k[0]
      let _name = k[1]
      if (caches[_id]) {
        _name = `✅ ${_name}`
      }
      a1.addAction(_name)
    })
    a1.addCancelAction('完成设置')
    const id1 = await a1.presentSheet()
    if (id1 === -1) return this.saveSettings()
    console.log(id1)
    const arg = keys[id1]
    if (caches[arg[0]]) {
      caches[arg[0]] = false
    } else {
      caches[arg[0]] = true
    }
    const _caches = []
    for (const k in caches) {
      if (caches[k]) {
        _caches.push(k)
      }
    }
    this.arg = _caches.join('')
    this.settings['arg'] = this.arg
    return await this.actionSetting1()
  }
  async actionMenus(content) {
    const data = JSON.parse(content)
    const alert = new Alert()
    alert.title = '一言'
    alert.message = data['hitokoto']
    alert.addAction('复制内容')
    alert.addAction('内容设置')
    alert.addAction('关于一言')
    alert.addCancelAction('取消操作')
    const idx = await alert.presentSheet()
    if (idx === 0) {
      Pasteboard.copyString(data['hitokoto'] + '\n—— ' + data['from'])
    } else if (idx === 1) {
      return await this.actionSetting1()
    } else if (idx === 2) {
      Safari.openInApp('https://hitokoto.cn/about', false)
    }
  }
}
Testing(Widget)
