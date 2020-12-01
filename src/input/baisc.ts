import {request, ResponseType, showActionSheet, showModal, showNotification} from '@app/lib/help'
import e from 'express'
import {setStorage} from './../lib/help'

class Basic {
  async init() {
    await this.showMenu()
  }
  async getScriptText(api: string): Promise<string> {
    try {
      const res = await request<string>({url: `${api}/main.js`, dataType: 'text'})
      const scriptText = (res && res.data) || ''
      return scriptText
    } catch (err) {
      return ''
    }
  }
  async showMenu() {
    const firstSelectIndex = await showActionSheet({
      itemList: ['远程开发'],
    })
    switch (firstSelectIndex) {
      case 0:
        break
    }
  }
  async developRemote(): Promise<void> {
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
    while (1) {
      const scriptText = await this.getScriptText(server_api)
      try {
        const scriptTextToFunc = new Function(`const runWidget = () => {\n${scriptText}\n}\nreturn runWidget`)
        scriptTextToFunc()()
      } catch (err) {
        console.log(err)
        showNotification({
          title: '解析失败',
          body: err.message,
        })
      }
    }
  }
}
