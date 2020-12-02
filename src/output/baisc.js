// @编译时间 1606903060596
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
function sleep(ms) {
  return new Promise(resolve => {
    const timer = Timer.schedule(ms, false, () => {
      timer.invalidate()
      resolve()
    })
  })
}

// src/input/baisc.ts
const {setStorage: setStorage2, getStorage: getStorage2} = useStorage('basic-storage')
const runScriptDate = Date.now()
setStorage2('runScriptDate', runScriptDate)
class Basic {
  constructor() {
    this.syncInterval = 1 * 1e3
    this.lastCompileDate = 0
    this.timeout = 5 * 1e3
    this.requestFailTimes = 0
    this.maxRequestFailTimes = 5
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
    const serverApi = getStorage2('serverApi')
    const scriptText = getStorage2('scriptText')
    if (syncScriptName && syncScriptPath && serverApi) {
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
          serverApi,
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
    let _serverApi = params.serverApi
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
    if (!_serverApi) {
      const serverApiFromStorage = getStorage2('serverApi') || ''
      const {cancel, texts} = await showModal({
        title: '服务器 IP',
        content: '请输入远程开发服务器（电脑）IP地址',
        confirmText: '连接',
        inputItems: [
          {
            placeholder: '输入远程pc的ip地址',
            text: serverApiFromStorage ? serverApiFromStorage.split(':')[1] : '192.168.1.3',
          },
        ],
      })
      if (cancel) return
      const ip = texts[0]
      if (!ip) return
      _serverApi = `http://${ip}:9090`
      setStorage2('serverApi', _serverApi)
    }
    if (!_serverApi || !_syncScriptName || !_syncScriptPath) {
      await showNotification({
        title: '信息不完整，运行终止',
        body: '没选择脚本或远程ip没填写',
      })
      return
    }
    await showNotification({title: '开始同步代码'})
    const syncScript = async () => {
      const scriptText = await that.getScriptText(_serverApi)
      const compileDateRegExp = /\/\/\s*?\@编译时间\s*?([\d]+)/
      const dateMatchResult = scriptText.match(compileDateRegExp)
      const thisCompileDate = Number(dateMatchResult && dateMatchResult[1]) || null
      if (!scriptText || !thisCompileDate) return
      if (thisCompileDate && thisCompileDate <= that.lastCompileDate) return
      try {
        await FileManager.local().writeString(_syncScriptPath, scriptText)
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
}
new Basic().init()
