/**
 * 今日热榜小部件
 */

import {
  isLaunchInsideApp,
  setTransparentBackground,
  showActionSheet,
  showModal,
  showNotification,
  showPreviewOptions,
  useStorage,
} from '@app/lib/help'
import {Col} from '@app/lib/components'
import {WstackProps} from '@app/types/widget'
import {FC} from 'react'

const {setStorage, getStorage} = useStorage('newsTop-xiaoming')

/**文字颜色*/
const textColor = getStorage<string>('textColor') || '#222222'

/**透明背景*/
const transparentBg: Image | string = getStorage<Image>('transparentBg') || '#ffffff'

/**背景颜色或背景图链接*/
const boxBg = getStorage<string>('boxBg') || '#ffffff'

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

class NewsTop {
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
    // 多久（毫秒）更新一次小部件（默认1小时）
    const updateInterval = 1 * 60 * 60 * 1000
    // 渲染尺寸
    const size = config.widgetFamily
    return (
      <wbox
        padding={[0, 0, 0, 0]}
        updateDate={new Date(Date.now() + updateInterval)}
        background={boxBg.match('透明背景') ? transparentBg : boxBg}
      >
        {size === 'small' && this.renderSmall()}
        {size === 'medium' && this.renderMedium()}
        {size === 'large' && this.renderLarge()}
      </wbox>
    )
  }

  // 渲染小尺寸
  renderSmall() {
    return <wstack flexDirection="column"></wstack>
  }

  // 渲染中尺寸
  renderMedium() {
    return <wstack></wstack>
  }

  // 渲染大尺寸
  renderLarge() {
    return <wstack flexDirection="column"></wstack>
  }

  // 显示菜单
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['设置颜色', '设置透明背景', '预览组件'],
    })
    switch (selectIndex) {
      case 0:
        const {texts, cancel} = await showModal({
          title: '设置全局背景和颜色',
          content: '如果为空，则还原默认',
          inputItems: [
            {
              text: getStorage<string>('boxBg') || '',
              placeholder: '这里填全局背景，可以是颜色、图片链接',
            },
            {
              text: getStorage<string>('textColor') || '',
              placeholder: '这里填文字颜色',
            },
          ],
        })
        if (cancel) return
        setStorage('boxBg', texts[0])
        setStorage('textColor', texts[1])
        await showNotification({title: '设置完成', sound: 'default'})
        break
      case 1:
        const img: Image | null = (await setTransparentBackground()) || null
        if (img) {
          setStorage('transparentBg', img)
          setStorage('boxBg', '透明背景')
          await showNotification({title: '设置透明背景成功', sound: 'default'})
        }
        break
      case 2:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
}

EndAwait(() => new NewsTop().init())
