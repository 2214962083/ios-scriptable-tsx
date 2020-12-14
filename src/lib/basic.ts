/**
 * 基础包源码
 */
import {port} from '@app/lib/constants'
import {useStorage, showActionSheet, showModal, showNotification, sleep, getSciptableTopComment} from '@app/lib/help'

interface DevelopRemoteParams {
  /**被同步的脚本的路径*/
  syncScriptName?: string | null

  /**被同步的脚本的文件名*/
  syncScriptPath?: string | null

  /**远程文件地址*/
  remoteFileAddress?: string | null
}

const {setStorage, getStorage} = useStorage('basic-storage')
const runScriptDate = Date.now()
setStorage('runScriptDate', runScriptDate)

class Basic {
  /**间隔多久同步一次脚本，单位：毫秒*/
  private syncInterval = 1 * 1000

  /**本地脚本编译时间*/
  private lastCompileDate = 0

  /**请求超时，单位：毫秒*/
  private timeout = 5 * 1000

  /**已连续请求失败次数*/
  private requestFailTimes = 0

  /**连续请求失败最大次数，单位：毫秒*/
  private maxRequestFailTimes = 10

  async init() {
    await this.showMenu()
  }
  /**获取本地脚本列表，name 是脚本名字，path 是脚本路径*/
  getLocalScripts(): Record<'name' | 'path', string>[] {
    const dirPath = MODULE.filename.split('/').slice(0, -1).join('/')
    let scriptNames: string[] = FileManager.local().listContents(dirPath) || []
    // 过滤非.js结尾的文件
    scriptNames = scriptNames.filter(scriptName => /\.js$/.test(scriptName))
    return scriptNames.map(scriptName => ({
      name: scriptName,
      path: FileManager.local().joinPath(dirPath, scriptName),
    }))
  }
  /**
   * 请求获取脚本内容
   * @param url 远程文件地址
   */
  async getScriptText(url: string): Promise<string> {
    try {
      const req = new Request(url)
      req.timeoutInterval = this.timeout / 1000
      const res = await req.loadString()
      this.requestFailTimes = 0
      return res || ''
    } catch (err) {
      // 如果失败时间戳为 null，则记录本次失败时间
      this.requestFailTimes += 1
      return ''
    }
  }
  /**显示菜单*/
  async showMenu() {
    const that = this
    let itemList = ['远程开发']
    const syncScriptName = getStorage<string>('syncScriptName')
    const syncScriptPath = getStorage<string>('syncScriptPath')
    const remoteFileAddress = getStorage<string>('remoteFileAddress')
    const scriptText = getStorage<string>('scriptText')

    if (syncScriptName && syncScriptPath && remoteFileAddress) {
      // 如果上次有远程开发过，则加入直接同步选项
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
        // 执行远程代码
        await that.runCode(syncScriptName as string, scriptText as string)
        break
    }
  }
  /**远程开发同步*/
  async developRemote(params: DevelopRemoteParams = {}): Promise<void> {
    const that = this

    /**被同步的脚本的路径*/
    let _syncScriptPath = params.syncScriptPath

    /**被同步的脚本的文件名*/
    let _syncScriptName = params.syncScriptName

    /**远程api*/
    let _remoteFileAddress = params.remoteFileAddress

    if (!_syncScriptPath || !_syncScriptName) {
      // 选择要开发的脚本
      const scripts = that.getLocalScripts()
      const selectIndex = await showActionSheet({
        title: '选择你要开发的脚本',
        itemList: scripts.map(script => script.name),
      })
      if (selectIndex < 0) return

      /**被同步的脚本的路径*/
      _syncScriptPath = scripts[selectIndex].path
      setStorage('syncScriptPath', _syncScriptPath)

      /**被同步的脚本的文件名*/
      _syncScriptName = scripts[selectIndex].name
      setStorage('syncScriptName', _syncScriptName)
    }

    if (!_remoteFileAddress) {
      /**内存中的远程文件地址*/
      _remoteFileAddress = getStorage<string>('remoteFileAddress') || ''

      // 输入远程文件地址
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

      /**远程文件地址*/
      _remoteFileAddress = texts[0]

      if (!_remoteFileAddress) return

      setStorage('remoteFileAddress', _remoteFileAddress)
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

    /**同步脚本*/
    const syncScript = async () => {
      /**远程脚本字符串*/
      let scriptText = await that.getScriptText(_remoteFileAddress as string)

      /**匹配时间戳，例子：'// @编译时间 1606834773399' */
      const compileDateRegExp = /\/\/\s*?\@编译时间\s*?([\d]+)/

      /**匹配结果*/
      const dateMatchResult = scriptText.match(compileDateRegExp)

      /**本次远程脚本的编译时间*/
      const thisCompileDate = Number(dateMatchResult && dateMatchResult[1]) || null

      // 如果没有获取到脚本内容、此次脚本编译时间为空，则不写入
      if (!scriptText || !thisCompileDate) return

      //如果此次脚本编译时间和上次相同，则不写入
      if (thisCompileDate && thisCompileDate <= that.lastCompileDate) return

      try {
        // 写入代码到文件
        const comment = getSciptableTopComment(_syncScriptPath as string)
        await FileManager.local().writeString(_syncScriptPath as string, `${comment}\n${scriptText}`)

        // 添加 console 重写代码
        const serverApi = (_remoteFileAddress?.match(/http\:\/\/[\d\.]+?\:[\d]+/) || [])[0]
        scriptText = `${that.getRewriteConsoleCode(serverApi)}\n${scriptText}`

        // 写入代码到缓存
        setStorage('scriptText', scriptText)

        that.lastCompileDate = thisCompileDate
        await showNotification({title: '同步代码成功'})

        // 执行远程代码
        await that.runCode(_syncScriptName as string, scriptText)
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

    // 循环执行
    while (1) {
      const _runScriptDate = getStorage<string>('runScriptDate')
      if (runScriptDate !== Number(_runScriptDate)) {
        // 本脚本重新运行了，停止这次同步
        break
      }
      if (this.requestFailTimes >= this.maxRequestFailTimes) {
        // 太久请求不成功了，终结远程同步
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
  /**
   * 执行远程代码
   * @param syncScriptName 脚本名称
   * @param scriptText 脚本内容
   */
  async runCode(syncScriptName: string, scriptText: string) {
    try {
      const runRemoteCode = new Function(`(async () => {
        ${scriptText}
      })()`)
      // 执行远程代码
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
  /**
   * 获取重写 console 的方法
   * @param serverApi 远程链接api地址，如 http://192.168.2.4:9090
   */
  getRewriteConsoleCode(serverApi: string) {
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
