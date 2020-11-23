// 哔哩哔哩粉丝数
// 作者：azoon
// 调用参数 bilibili@fans:446791792

class Im3xWidget {
  private arg!: string
  private widgetSize!: string
  /**
   * 初始化
   * @param arg 外部传递过来的参数
   */
  constructor(arg = '') {
    this.arg = arg
    this.widgetSize = config.widgetFamily
  }

  //渲染组件
  async render() {
    if (this.widgetSize === 'medium') {
      return await this.renderSmall()
    } else if (this.widgetSize === 'large') {
      return await this.renderLarge()
    } else {
      return await this.renderSmall()
    }
  }

  //渲染小尺寸组件
  async renderSmall() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.getData()
    const w = new ListWidget()

    const header = w.addStack()
    const icon = header.addImage(await this.getImage('https://www.bilibili.com/favicon.ico'))
    icon.imageSize = new Size(15, 15)
    header.addSpacer(10)
    const title = header.addText('哔哩哔哩粉丝')
    title.textOpacity = 0.9
    title.font = Font.systemFont(14)
    w.addSpacer(20)
    let flTxt: WidgetText

    if (data.code != 0) {
      flTxt = w.addText('请填写B站MID')
      flTxt.textColor = new Color('#fb7299')
      flTxt.font = Font.systemFont(14)
    } else {
      flTxt = w.addText(this.toThousands(data.data['follower']))
      flTxt.textColor = new Color('#fb7299')
      flTxt.font = Font.boldRoundedSystemFont(this.getFontsize(data.data['follower']))
    }
    flTxt.centerAlignText()
    w.addSpacer(20)

    const utTxt = w.addText('更新于:' + this.nowTime())
    utTxt.font = Font.systemFont(12)
    utTxt.centerAlignText()
    utTxt.textOpacity = 0.5

    w.url = 'bilibili://'
    return w
  }

  //渲染中尺寸组件
  async renderMedium() {
    const w = new ListWidget()
    w.addText('暂不支持该尺寸组件')
    return w
  }

  //渲染大尺寸组件
  async renderLarge() {
    const w = new ListWidget()
    w.addText('暂不支持该尺寸组件')
    return w
  }

  //加载B站数据
  async getData() {
    const api = 'http://api.bilibili.com/x/relation/stat?vmid=' + this.arg
    const req = new Request(api)
    const res = await req.loadJSON()
    return res
  }

  //加载远程图片
  async getImage(url: string) {
    const req = new Request(url)
    return await req.loadImage()
  }

  //格式化粉丝数量，加入千分号
  toThousands(num: number) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }

  //返回脚本运行时的时间，作为更新时间
  nowTime() {
    const date = new Date()
    return date.toLocaleTimeString('chinese', {hour12: false})
  }

  //根据粉丝数量返回不同的字体大小
  getFontsize(num: number) {
    if (num < 99) {
      return 38
    } else if (num < 9999 && num > 100) {
      return 30
    } else if (num < 99999 && num > 10000) {
      return 28
    } else if (num < 999999 && num > 100000) {
      return 24
    } else if (num < 9999999 && num > 1000000) {
      return 22
    } else {
      return 20
    }
  }

  //编辑测试使用
  async test() {
    if (config.runsInWidget) return
    this.widgetSize = 'small'
    const w1 = await this.render()
    await w1.presentSmall()
    this.widgetSize = 'medium'
    const w2 = await this.render()
    await w2.presentMedium()
    this.widgetSize = 'large'
    const w3 = await this.render()
    await w3.presentLarge()
  }

  //组件单独在桌面运行时调用
  async init() {
    if (!config.runsInWidget) return
    const widget = await this.render()
    Script.setWidget(widget)
    Script.complete()
  }
}

module.exports = Im3xWidget

// 如果是在编辑器内编辑、运行、测试，则取消注释这行，便于调试：
//await new Im3xWidget().test()

// 如果是组件单独使用（桌面配置选择这个组件使用，则取消注释这一行：
new Im3xWidget(args.widgetParameter as string).init()
