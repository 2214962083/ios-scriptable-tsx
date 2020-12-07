import {request, ResponseType, showActionSheet, showPreviewOptions} from '@app/lib/help'
import {h} from '../lib/jsx-runtime'

interface RemoteData {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: string
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: number
  length: number
}

export default class YiyanWidget {
  private widget!: ListWidget
  async init(): Promise<void> {
    // 打印打包环境
    console.log(process.env.HELLO + ',' + process.env.MOMENT)
    console.warn('999')

    this.widget = (await this.render()) as ListWidget
    if (!config.runsInWidget && args.queryParameters.from !== 'widget') {
      await showPreviewOptions(this.widget)
      return
    }
    Script.setWidget(this.widget)
    Script.complete()
  }
  async render(): Promise<unknown> {
    const data = (await this.getRemoteData()).data || ({} as RemoteData)
    const {hitokoto = '', from = ''} = data
    return (
      <wbox>
        <wstack verticalAlign="center">
          <wimage
            src="https://txc.gtimg.com/data/285778/2020/1012/f9cf50f08ebb8bd391a7118c8348f5d8.png"
            width={14}
            height={14}
            borderRadius={4}
          ></wimage>
          <wspacer length={10}></wspacer>
          <wtext opacity={0.7} font={Font.boldSystemFont(12)}>
            一言
          </wtext>
        </wstack>
        <wspacer></wspacer>
        <wtext font={Font.lightSystemFont(16)} onClick={() => this.menu()}>
          {hitokoto}
        </wtext>
        <wspacer></wspacer>
        <wtext font={Font.lightSystemFont(12)} opacity={0.5} textAlign="right" maxLine={1}>
          {from}
        </wtext>
      </wbox>
    )
  }
  async getRemoteData(): Promise<ResponseType<RemoteData>> {
    return await request<RemoteData>({
      url: 'https://v1.hitokoto.cn',
      dataType: 'json',
    })
  }
  async menu(): Promise<void> {
    const optionFunc = [this.selectPreviewSize]
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: [
        {
          text: '预览组件',
        },
      ],
    })
    optionFunc[selectIndex].apply(this)
  }
  async selectPreviewSize(): Promise<void> {
    const selectIndex = await showActionSheet({
      title: '选择预览尺寸',
      itemList: [
        {
          text: '小组件',
        },
        {
          text: '中组件',
        },
        {
          text: '大组件',
        },
      ],
    })
    switch (selectIndex) {
      case 0:
        await this.widget.presentSmall()
        break
      case 1:
        await this.widget.presentMedium()
        break
      case 2:
        await this.widget.presentLarge()
        break
    }
  }
}
