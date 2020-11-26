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
function h(type, props, ...children) {
  console.log(type, props, children)
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
            textColor: new Color('#fb7299'),
            font: Font.systemFont(14),
          },
          '请填写B站MID',
        )
      } else {
        return /* @__PURE__ */ h(
          'wtext',
          {
            textAlign: 'center',
            textColor: new Color('#fb7299'),
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
            font: Font.systemFont(14),
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
          font: Font.systemFont(12),
          textAlign: 'center',
          opacity: 0.5,
        },
        '更新于:',
        this.nowTime,
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
