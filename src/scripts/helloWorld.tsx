class HelloWorld {
  async init() {
    // ListWidget 实例
    const widget = (await this.render()) as ListWidget
    // 注册小部件
    Script.setWidget(widget)
    // 调试用
    !config.runsInWidget && (await widget.presentMedium())
    // 脚本结束
    Script.complete()
  }
  async render(): Promise<unknown> {
    return (
      <wbox>
        <wspacer></wspacer>
        <wtext font={30} textAlign="center">
          Hello World
        </wtext>
        <wspacer></wspacer>
      </wbox>
    )
  }
}

// 从 process.env 下可以加载 .env 文件的键值对
// 详见 https://github.com/2214962083/ios-scriptable-tsx/blob/master/docs/config.md#env-config
console.log(process.env.HELLO + ',' + process.env.MOMENT)

new HelloWorld().init()
