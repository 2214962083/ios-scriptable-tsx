import {showActionSheet, showModal, showNotification, setInterval, clearInterval} from '@app/lib/help'
import {setStorage} from './../lib/help'

class Basic {
  /**间隔多久同步一次脚本，单位：毫秒*/
  private syncInterval = 3 * 1000

  /**本地脚本编译时间*/
  private lastCompileDate = 0

  /**请求失败时的时间戳，成功时为null，连续失败不会刷新*/
  private requestFailTime: number | null = null

  /**连接失败时间间隔最大值，单位：毫秒*/
  private maxRequestFailTime = 30 * 1000

  /**循环 timer，用于清除循环*/
  private timer!: Timer

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
   * @param api 远程 pc ip 端口地址
   */
  async getScriptText(api: string): Promise<string> {
    try {
      const req = new Request(`${api}/main.js`)
      const res = await req.loadString()
      this.requestFailTime = null
      return res || ''
    } catch (err) {
      if (this.requestFailTime && Date.now() - this.requestFailTime > this.maxRequestFailTime) {
        // 太久请求不成功了，终结远程同步
        clearInterval(this.timer)
        await showNotification({
          title: '已停止同步',
          subtitle: '远程开发已停止，连接超时。',
        })
        return ''
      }
      // 如果失败时间戳为 null，则记录本次失败时间
      if (!this.requestFailTime) this.requestFailTime = Date.now()
      return ''
    }
  }
  /**显示菜单*/
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
  /**远程开发同步*/
  async developRemote(): Promise<void> {
    const that = this

    // 选择要开发的脚本
    const scripts = that.getLocalScripts()
    const selectIndex = await showActionSheet({
      title: '选择你要开发的脚本',
      itemList: scripts.map(script => script.name),
    })
    if (selectIndex < 0) return
    const syncScriptPath = scripts[selectIndex].path

    // 输入远程ip
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

    // 同步代码
    /**远程ip*/
    const ip = texts[0]
    setStorage('develop_ip', ip)
    const server_api = `http://${ip}:9090`
    showNotification({title: '开始同步代码'})

    /**同步脚本*/
    const syncScript = async () => {
      /**远程脚本字符串*/
      const scriptText = await that.getScriptText(server_api)

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
        // 写入代码
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

    // 循环执行
    that.timer = setInterval(syncScript, that.syncInterval)
  }
}

new Basic().init()
