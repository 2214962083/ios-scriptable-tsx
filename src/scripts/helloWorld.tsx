import {h} from '@app/lib/jsx-runtime'

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

new HelloWorld().init()
