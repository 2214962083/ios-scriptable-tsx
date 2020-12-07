// @编译时间 1607322867853
const MODULE = module

// src/lib/constants.ts
var URLSchemeFrom
;(function (URLSchemeFrom2) {
  URLSchemeFrom2['WIDGET'] = 'widget'
})(URLSchemeFrom || (URLSchemeFrom = {}))
const port = 9090

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
function getSciptableTopComment(path) {
  const fm = FileManager.local()
  if (!fm.fileExists(path)) return ''
  const code = fm.readString(path)
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

// src/scripts/baisc.ts
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

/**重写生成日志函数*/
const __generateLog__ = (type = 'log', oldFunc) => {
  return function(...args) {
    __sendLogToRemote__(type, args[0]).catch(err => {})
    oldFunc.apply(this, args);
  }
};
if (!console.__rewrite__) {
  console.log = __generateLog__('log', __log__);
  console.warn = __generateLog__('warn', __warn__);
  console.error = __generateLog__('error', __error__);
}
console.__rewrite__ = true;
    `
  }
}
new Basic().init()
