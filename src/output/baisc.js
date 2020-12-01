// @编译时间 1606838750490
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
async function showActionSheet(args) {
  const {title, desc, cancelText = '取消', itemList} = args
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
async function showModal(args) {
  const {title, content, showCancel = true, cancelText = '取消', confirmText = '确定', inputItems = []} = args
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
async function showNotification(args) {
  const {title, subtitle = '', body = '', openURL, sound = 'default', ...others} = args
  let notification = new Notification()
  notification.title = title
  notification.subtitle = subtitle
  notification.body = body
  openURL && (notification.openURL = openURL)
  notification.sound = sound
  notification = Object.assign(notification, others)
  return await notification.schedule()
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
function setInterval(callback, ms) {
  const timer = Timer.schedule(ms, true, callback)
  return timer
}
function clearInterval(timer) {
  console.log(timer.invalidate)
  if (timer && typeof timer.invalidate === 'function') {
    timer.invalidate()
  }
}

// src/input/baisc.ts
class Basic {
  constructor() {
    this.syncInterval = 3 * 1e3
    this.lastCompileDate = 0
    this.requestFailTime = null
    this.maxRequestFailTime = 30 * 1e3
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
  async getScriptText(api) {
    try {
      const req = new Request(`${api}/main.js`)
      const res = await req.loadString()
      this.requestFailTime = null
      return res || ''
    } catch (err) {
      if (this.requestFailTime && Date.now() - this.requestFailTime > this.maxRequestFailTime) {
        clearInterval(this.timer)
        await showNotification({
          title: '已停止同步',
          subtitle: '远程开发已停止，连接超时。',
        })
        return ''
      }
      if (!this.requestFailTime) this.requestFailTime = Date.now()
      return ''
    }
  }
  async showMenu() {
    const that = this
    const selectIndex = await showActionSheet({
      itemList: ['远程开发'],
    })
    switch (selectIndex) {
      case 0:
        await that.developRemote()
        break
    }
  }
  async developRemote() {
    const that = this
    const scripts = that.getLocalScripts()
    const selectIndex = await showActionSheet({
      title: '选择你要开发的脚本',
      itemList: scripts.map(script => script.name),
    })
    if (selectIndex < 0) return
    const syncScriptPath = scripts[selectIndex].path
    const {cancel, texts} = await showModal({
      title: '服务器 IP',
      content: '请输入远程开发服务器（电脑）IP地址',
      confirmText: '连接',
      inputItems: [
        {
          placeholder: '输入远程pc的ip地址',
          text: '192.168.1.3',
        },
      ],
    })
    if (cancel) return
    const ip = texts[0]
    setStorage('develop_ip', ip)
    const server_api = `http://${ip}:9090`
    showNotification({title: '开始同步代码'})
    const syncScript = async () => {
      const scriptText = await that.getScriptText(server_api)
      const compileDateRegExp = /\/\/\s*?\@编译时间\s*?([\d]+)/
      const dateMatchResult = scriptText.match(compileDateRegExp)
      const thisCompileDate = Number(dateMatchResult && dateMatchResult[1]) || null
      if (!scriptText || !thisCompileDate) return
      if (thisCompileDate && thisCompileDate <= that.lastCompileDate) return
      try {
        await FileManager.local().writeString(syncScriptPath, scriptText)
        that.lastCompileDate = thisCompileDate
        await showNotification({title: '同步代码成功'})
      } catch (err) {
        console.log('代码写入失败')
        console.log(err)
        await showNotification({
          title: '代码同步失败',
          body: err.message,
        })
      }
    }
    that.timer = setInterval(syncScript, that.syncInterval)
  }
}
new Basic().init()
