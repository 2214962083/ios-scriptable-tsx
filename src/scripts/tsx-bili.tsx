/**
 * 哔哩粉丝
 * 改写于 https://github.com/im3x/Scriptables/blob/main/bilibili/fans.js
 */
import {
  getImage,
  request,
  showActionSheet,
  useStorage,
  showPreviewOptions,
  showModal,
  ResponseType,
  isLaunchInsideApp,
} from '@app/lib/help'

export interface BiliUpData {
  code: number
  message: string
  ttl: number
  data: {
    mid: number
    following: number
    whisper: number
    black: number
    follower: number
  }
}

const {setStorage, getStorage} = useStorage('bilibili-fans')

class BiliFans {
  async init() {
    if (isLaunchInsideApp()) {
      return await this.showMenu()
    }
    const widget = (await this.render()) as ListWidget
    Script.setWidget(widget)
    Script.complete()
  }

  //渲染组件
  async render(): Promise<unknown> {
    // up 主 id
    const upId = getStorage<number>('up-id') || 0

    // 粉丝数
    let follower = -1
    try {
      // 响应数据
      const getUpDataRes = (await this.getUpData(upId)).data as BiliUpData
      follower = getUpDataRes.data.follower as number
    } catch (err) {
      console.warn('获取粉丝数失败')
    }

    // icon
    const icon = await getImage({url: 'https://www.bilibili.com/favicon.ico'})

    // 粉丝数文字
    const FollowerText = () => {
      if (follower < 0) {
        return (
          <wtext textAlign="center" textColor="#fb7299" font={14}>
            请填写B站UP主的ID
          </wtext>
        )
      } else {
        return (
          <wtext textAlign="center" textColor="#fb7299" font={Font.boldRoundedSystemFont(this.getFontsize(follower))}>
            {this.toThousands(follower)}
          </wtext>
        )
      }
    }

    // 渲染
    return (
      <wbox href="bilibili://">
        <wstack>
          <wimage src={icon} width={15} height={15}></wimage>
          <wspacer length={10}></wspacer>
          <wtext opacity={0.9} font={14}>
            哔哩哔哩粉丝
          </wtext>
        </wstack>
        <wspacer></wspacer>
        <FollowerText></FollowerText>
        <wspacer></wspacer>
        <wtext font={12} textAlign="center" opacity={0.5}>
          更新于:{this.nowTime()}
        </wtext>
      </wbox>
    )
  }

  // 显示菜单
  async showMenu(): Promise<void> {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['设置 up 主 id', '预览尺寸'],
    })
    switch (selectIndex) {
      case 0:
        // 设置 up 主 id
        const {cancel, texts} = await showModal({
          title: '请输入 up 主的 id',
          inputItems: [
            {
              text: getStorage('up-id') || '',
              placeholder: '去网页版 up 主页，可以看到 id',
            },
          ],
        })
        if (cancel) return
        // 保存 id
        if (texts && texts[0]) setStorage('up-id', texts[0])
        break
      case 1:
        // 预览尺寸
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }

  // 获取b站up数据
  async getUpData(id: number): Promise<ResponseType<BiliUpData>> {
    return await request<BiliUpData>({
      url: `http://api.bilibili.com/x/relation/stat?vmid=${id}`,
      dataType: 'json',
    })
  }

  //格式化粉丝数量，加入千分号
  toThousands(num: number): string {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
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

  //当前时间
  nowTime(): string {
    const date = new Date()
    return date.toLocaleTimeString('chinese', {hour12: false})
  }
}

new BiliFans().init()
