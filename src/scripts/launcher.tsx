/**
 * 个性磁铁小部件
 */

import {isLaunchInsideApp, showActionSheet, showNotification, showPreviewOptions} from '@app/lib/help'
import {Col} from '@app/lib/components'
import {WstackProps} from '@app/types/widget'
import {FC} from 'react'

// 文字颜色
const textColor = '#ffffff'

// 好看的颜色
const colors = {
  red: '#e54d42',
  orange: '#f37b1d',
  yellow: '#fbbd08',
  olive: '#8dc63f',
  green: '#39b54a',
  cyan: '#1cbbb4',
  blue: '#0081ff',
  purple: '#6739b6',
  mauve: '#9c26b0',
  pink: '#e03997',
  brown: '#a5673f',
  grey: '#8799a3',
  black: '#000000',
}

/**格子组件参数*/
interface GridProps {
  /** icon 名字*/
  iconName?: string

  /**格子背景*/
  background?: WstackProps['background']

  /**文字*/
  text?: string

  /**点击格子跳转的链接*/
  href?: string
}

/**格子组件*/
const Grid: FC<GridProps> = ({...props}) => {
  const {iconName, background, text, href} = props
  const bgColors: string[] = Object.values(colors)
  const bgRandom = Math.floor(Math.random() * bgColors.length)
  const bgColor = bgColors[bgRandom]
  return (
    <wstack background={background || bgColor} href={href} borderColor="#00000088" borderWidth={1}>
      <Col
        background={/^\#[\d]+$/.test(String(background)) ? '#00000000' : '#00000033'}
        alignItems="center"
        justifyContent="center"
      >
        {iconName && <wimage src={iconName} filter={textColor} width={20} height={20}></wimage>}
        <wspacer length={10}></wspacer>
        {(!iconName || text) && (
          <wtext font={new Font('heavymenlo', 12.5)} textColor={textColor}>
            {text || ''}
          </wtext>
        )}
      </Col>
    </wstack>
  )
}

class Launcher {
  private config: GridProps[]
  constructor(config: GridProps[]) {
    this.config = config
  }
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
    if (isLaunchInsideApp()) {
      await showNotification({title: '稍等片刻', body: '小部件渲染中...', sound: 'alert'})
    }
    // 多久（毫秒）更新一次小部件（默认24小时）
    const updateInterval = 24 * 60 * 60 * 1000
    // 渲染尺寸
    const size = config.widgetFamily
    return (
      <wbox
        padding={[0, 0, 0, 0]}
        updateDate={new Date(Date.now() + updateInterval)}
        href={size === 'small' ? this.config[0].href : ''}
      >
        {size === 'small' && this.renderSmall()}
        {size === 'medium' && this.renderMedium()}
        {size === 'large' && this.renderLarge()}
      </wbox>
    )
  }

  // 渲染小尺寸
  renderSmall() {
    return (
      <wstack flexDirection="column">
        <wstack>
          <Grid {...this.config[0]}></Grid>
        </wstack>
      </wstack>
    )
  }

  // 渲染中尺寸
  renderMedium() {
    return (
      <wstack>
        <Grid {...this.config[0]}></Grid>
        <wstack flexDirection="column">
          <wstack>
            <Grid {...this.config[1]}></Grid>
            <Grid {...this.config[2]}></Grid>
          </wstack>
          <wstack>
            <Grid {...this.config[3]}></Grid>
            <Grid {...this.config[4]}></Grid>
          </wstack>
        </wstack>
      </wstack>
    )
  }

  // 渲染大尺寸
  renderLarge() {
    return (
      <wstack flexDirection="column">
        {/* 上半部分 */}
        <wstack>
          <Grid {...this.config[0]}></Grid>
          <wstack flexDirection="column">
            <wstack>
              <Grid {...this.config[1]}></Grid>
              <Grid {...this.config[2]}></Grid>
            </wstack>
            <wstack>
              <Grid {...this.config[3]}></Grid>
              <Grid {...this.config[4]}></Grid>
            </wstack>
          </wstack>
        </wstack>
        {/* 下半部分 */}
        <wstack>
          <wstack flexDirection="column">
            <wstack>
              <Grid {...this.config[5]}></Grid>
              <Grid {...this.config[6]}></Grid>
            </wstack>
            <Grid {...this.config[7]}></Grid>
          </wstack>
          <wstack flexDirection="column">
            <Grid {...this.config[8]}></Grid>
            <wstack>
              <Grid {...this.config[9]}></Grid>
              <Grid {...this.config[10]}></Grid>
            </wstack>
          </wstack>
        </wstack>
      </wstack>
    )
  }

  // 显示菜单
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['预览组件'],
    })
    switch (selectIndex) {
      case 0:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
}

const luancherConfig: GridProps[] = [
  {
    href: 'weixin://scanqrcode',
    background: colors.green,
    iconName: 'barcode.viewfinder',
    text: '扫一扫',
  },
  {
    href: 'alipayqr://platformapi/startapp?saId=10000007',
    background: colors.blue,
    iconName: 'barcode.viewfinder',
    text: '扫一扫',
  },
  {
    href: 'weixin://',
    background: colors.green,
    iconName: 'message.fill',
    text: '微信',
  },
  {
    href: 'orpheuswidget://',
    background: colors.red,
    iconName: 'music.note',
    text: '网易云',
  },
  {
    href: 'alipay://platformapi/startapp?appId=20000056',
    background: colors.blue,
    iconName: 'qrcode',
    text: '付款码',
  },
  {
    href: 'mqq://',
    background: colors.blue,
    iconName: 'paperplane.fill',
    text: 'QQ',
  },
  {
    href: 'weibo://',
    background: colors.red,
    iconName: 'eye',
    text: '微博',
  },
  {
    href: 'bilibili://',
    background: colors.pink,
    iconName: 'tv',
    text: '哔哩哔哩',
  },
  {
    href: 'zhihu://',
    background: colors.blue,
    iconName: 'questionmark',
    text: '知乎',
  },
  {
    href: 'iqiyi://',
    background: colors.green,
    iconName: 'film',
    text: '爱奇艺',
  },
  {
    href: 'tencentlaunch1104466820://',
    background: colors.orange,
    iconName: 'gamecontroller',
    text: '王者',
  },
]
EndAwait(() => new Launcher(luancherConfig).init())
