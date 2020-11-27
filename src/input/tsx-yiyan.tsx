import {getImage, request, ResponseType} from '@app/lib/help'
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

class YiyanWidget {
  async init() {
    const widget = ((await this.render()) as unknown) as ListWidget
    Script.setWidget(widget)
    !config.runsInWidget && widget.presentMedium()
    Script.complete()
  }
  async render() {
    const icon = await getImage({
      url: 'https://txc.gtimg.com/data/285778/2020/1012/f9cf50f08ebb8bd391a7118c8348f5d8.png',
    })
    const data = (await this.getRemoteData()).data || ({} as RemoteData)
    const {hitokoto = '', from = ''} = data
    return (
      <wbox>
        <wstack verticalAlign="center">
          <wimage src={icon} width={14} height={14} borderRadius={4}></wimage>
          <wspacer length={10}></wspacer>
          <wtext opacity={0.7} font={Font.boldSystemFont(12)}>
            一言
          </wtext>
        </wstack>
        <wspacer></wspacer>
        <wtext font={Font.lightSystemFont(16)}>{hitokoto}</wtext>
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
}

new YiyanWidget().init()
