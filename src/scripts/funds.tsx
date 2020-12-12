/**
 * 基金小部件
 */

import {
  isLaunchInsideApp,
  request,
  ResponseType,
  setTransparentBackground,
  showActionSheet,
  showModal,
  showNotification,
  showPreviewOptions,
  useStorage,
} from '@app/lib/help'

interface FundInfo {
  /**基金代码*/
  FCODE: string

  /**基金名字*/
  SHORTNAME: string

  /**日期*/
  PDATE: string

  /**单位净值数值*/
  NAV: string

  /**累计净值数值*/
  ACCNAV: string

  /**单位净值涨跌百分比*/
  NAVCHGRT: string

  /**单位净值估算数值*/
  GSZ: string

  /**单位净值估算涨跌百分比*/
  GSZZL: string

  /**更新时间*/
  GZTIME: string
  NEWPRICE: string
  CHANGERATIO: string
  ZJL: string
  HQDATE: string
  ISHAVEREDPACKET: boolean
}

interface FundsData {
  Datas: FundInfo[]
  ErrCode: number
  Success: boolean
  ErrMsg: null | string
  Message: null | string
  ErrorCode: string
  ErrorMessage: null | string
  ErrorMsgLst: null | string
  TotalCount: number
  Expansion: {
    GZTIME: string
    FSRQ: string
  }
}

const {setStorage, getStorage} = useStorage('Funds')
const transparentBg: Image | string = getStorage<Image>('transparentBg') || '#fff'
const textColor = getStorage<string>('textColor') || (transparentBg === '#fff' ? '#000' : '#fff')
const bgColor = getStorage<string>('bgColor') || '#ffffff00'
const fundsCode = getStorage<string[]>('fundsCode') || []

/**生成表格列组件*/
function getFundColumn(fundsInfo: FundInfo[], title: string, keyName: keyof FundInfo) {
  // 数值个性化
  function showValue(value: FundInfo[keyof FundInfo]): Partial<Record<keyof FundInfo, JSX.Element>> {
    return {
      // 涨跌幅文字特别处理(涨绿，跌红)
      GSZZL: (
        <wtext font={Font.lightSystemFont(14)} textColor={Number(value) < 0 ? '#4eff4e' : '#ff4e4e'}>
          {value + '%'}
        </wtext>
      ),
    }
  }
  return (
    <wstack flexDirection="column">
      <wtext font={14} textColor={textColor}>
        {title}
      </wtext>
      {fundsInfo.map(fundInfo => {
        const value = fundInfo[keyName]
        return (
          <>
            <wspacer length={14}></wspacer>
            {showValue(value)[keyName] || (
              <wtext font={Font.lightSystemFont(14)} textColor={textColor}>
                {value}
              </wtext>
            )}
          </>
        )
      })}
    </wstack>
  )
}

class Funds {
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
    let fundsInfo: FundInfo[] = []
    try {
      const result = (await this.getFundsData(this.getFundsCode())).data as FundsData
      fundsInfo = result.Datas || []
    } catch (err) {}

    return (
      <wbox padding={[0, 0, 0, 0]} background={transparentBg} updateDate={new Date(Date.now() + 30 * 1000)}>
        <wstack padding={[16, 16, 16, 16]} flexDirection="column" background={bgColor}>
          <wstack>
            {getFundColumn(fundsInfo, '基金名字', 'SHORTNAME')}
            <wspacer></wspacer>
            {getFundColumn(fundsInfo, '估算净值', 'GSZ')}
            <wspacer></wspacer>
            {getFundColumn(fundsInfo, '涨跌幅', 'GSZZL')}
          </wstack>
          <wspacer></wspacer>
          <wstack>
            <wspacer></wspacer>
            <wtext font={Font.lightSystemFont(12)} opacity={0.5} textColor={textColor}>
              更新时间: {new Date().toLocaleTimeString('chinese', {hour12: false})}
            </wtext>
            <wspacer></wspacer>
          </wstack>
        </wstack>
      </wbox>
    )
  }

  // 显示菜单
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['设置基金代码', '预览组件', '设置透明背景', '设置文字和背景颜色'],
    })
    switch (selectIndex) {
      case 0:
        const {texts: fundsCodeTexts} = await showModal({
          title: '设置基金代码',
          content: '最多只能设置9个，在中尺寸下只显示前3个, 多个代码用逗号隔开。例如：002207, 002446, 161005',
          inputItems: [
            {
              text: (getStorage<string[]>('fundsCode') || []).join(', '),
              placeholder: '例如：002207, 002446, 161005',
            },
          ],
        })
        if (fundsCodeTexts[0]) {
          const fundsCode = fundsCodeTexts[0].match(/[\d]{6}/g) || []
          setStorage('fundsCode', fundsCode)
        }
        break
      case 1:
        await showPreviewOptions(this.render.bind(this))
        break
      case 2:
        const img: Image | null = (await setTransparentBackground()) || null
        img && setStorage('transparentBg', img)
        img && (await showNotification({title: '设置透明背景成功', sound: 'default'}))
        break
      case 3:
        const {texts} = await showModal({
          title: '设置文字和背景颜色',
          content: '黑色是#000，白色是#fff，半透明白是 #ffffff88, 半透明黑是 #00000088',
          inputItems: [
            {
              placeholder: `文字颜色，${
                getStorage('textColor') ? '当前是' + getStorage('textColor') + ',' : ''
              }默认黑色#000`,
            },
            {
              placeholder: `背景颜色，${
                getStorage('bgColor') ? '当前是' + getStorage('bgColor') + ',' : ''
              }默认白色#fff`,
            },
          ],
        })
        if (texts[0]) setStorage('textColor', texts[0])
        if (texts[1]) setStorage('bgColor', texts[1])
        break
    }
  }
  // 获取基金代码数组
  getFundsCode(): string[] {
    // 大号组件显示9个
    // 中号组件显示3个
    const defaultFundsCode = ['002207', '002446', '161005', '163406', '008282', '001790', '008641', '001838', '001475']
    const _fundsCode = fundsCode.length > 0 ? fundsCode : defaultFundsCode
    return config.widgetFamily === 'medium' ? _fundsCode.slice(0, 3) : _fundsCode.slice(0, 9)
  }

  // 生成 device id
  getDeviceId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // 获取基金数据
  async getFundsData(fundsId: string[]): Promise<ResponseType<FundsData>> {
    return request<FundsData>({
      url: `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=100&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=${this.getDeviceId()}&Fcodes=${fundsId.join(
        ',',
      )}`,
      dataType: 'json',
    })
  }
}

new Funds().init()
