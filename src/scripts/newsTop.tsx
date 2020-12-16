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

/**榜单信息*/
interface TopInfo {
  /**榜单名字*/
  title: string

  /**榜单链接*/
  href: string
}

/**文章信息*/
interface ArticleInfo {
  /**文章标题*/
  title: string

  /**原文地址*/
  href: string

  /**文章热度*/
  hot: string
}

/**页面信息*/
interface PageInfo {
  /**页面标题*/
  title: string

  /**该榜单的 logo */
  logo: string

  /**文章列表*/
  articleList: ArticleInfo[]

  /**js执行的错误信息*/
  err: Error
}

/**内置榜单别名，可在桌面小部件编辑传入别名*/
const topList: TopInfo[] = [
  {
    title: '知乎',
    href: 'https://tophub.today/n/mproPpoq6O',
  },
  {
    title: '微博',
    href: 'https://tophub.today/n/KqndgxeLl9',
  },
  {
    title: '微信',
    href: 'https://tophub.today/n/WnBe01o371',
  },
  {
    title: '澎湃',
    href: 'https://tophub.today/n/wWmoO5Rd4E',
  },
  {
    title: '百度',
    href: 'https://tophub.today/n/Jb0vmloB1G',
  },
  {
    title: '知乎日报',
    href: 'https://tophub.today/n/KMZd7VOvrO',
  },
  {
    title: '历史上的今天',
    href: 'https://tophub.today/n/KMZd7X3erO',
  },
  {
    title: '神马搜索',
    href: 'https://tophub.today/n/n6YoVqDeZa',
  },
  {
    title: '搜狗',
    href: 'https://tophub.today/n/NaEdZndrOM',
  },
  {
    title: '今日头条',
    href: 'https://tophub.today/n/x9ozB4KoXb',
  },
  {
    title: '360搜索',
    href: 'https://tophub.today/n/KMZd7x6erO',
  },
  {
    title: '36氪',
    href: 'https://tophub.today/n/Q1Vd5Ko85R',
  },
  {
    title: '好奇心日报',
    href: 'https://tophub.today/n/Y3QeLGAd7k',
  },
  {
    title: '少数派',
    href: 'https://tophub.today/n/Y2KeDGQdNP',
  },
  {
    title: '果壳',
    href: 'https://tophub.today/n/20MdK2vw1q',
  },
  {
    title: '虎嗅网',
    href: 'https://tophub.today/n/5VaobgvAj1',
  },
  {
    title: 'IT之家',
    href: 'https://tophub.today/n/74Kvx59dkx',
  },
  {
    title: '爱范儿',
    href: 'https://tophub.today/n/74KvxK7okx',
  },
  {
    title: 'GitHub',
    href: 'https://tophub.today/n/rYqoXQ8vOD',
  },
  {
    title: '威锋网',
    href: 'https://tophub.today/n/n4qv90roaK',
  },
  {
    title: 'CSDN',
    href: 'https://tophub.today/n/n3moBVoN5O',
  },
  {
    title: '掘金',
    href: 'https://tophub.today/n/QaqeEaVe9R',
  },
  {
    title: '哔哩哔哩',
    href: 'https://tophub.today/n/74KvxwokxM',
  },
  {
    title: '抖音',
    href: 'https://tophub.today/n/DpQvNABoNE',
  },
  {
    title: '吾爱破解',
    href: 'https://tophub.today/n/NKGoRAzel6',
  },
  {
    title: '百度贴吧',
    href: 'https://tophub.today/n/Om4ejxvxEN',
  },
  {
    title: '天涯',
    href: 'https://tophub.today/n/Jb0vmmlvB1',
  },
  {
    title: 'V2EX',
    href: 'https://tophub.today/n/wWmoORe4EO',
  },
  {
    title: '虎扑社区',
    href: 'https://tophub.today/n/G47o8weMmN',
  },
  {
    title: '汽车之家',
    href: 'https://tophub.today/n/YqoXQGXvOD',
  },
]

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

/**
 * 文章组件
 * @param param.article 文章
 * @param param.sort 文章序号
 */
const Article: FC<{article: ArticleInfo; sort: number}> = ({article, sort}) => {
  return (
    <>
      <wspacer length={5}></wspacer>
      <wstack verticalAlign="center" href={article.href}>
        <wtext maxLine={1} font={Font.lightSystemFont(14)}>
          {sort}、{article.title}
        </wtext>
        <wspacer></wspacer>
        <wtext maxLine={1} font={Font.lightSystemFont(12)} opacity={0.6}>
          {article.hot}
        </wtext>
      </wstack>
    </>
  )
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
    // 获取榜单url
    const topUrl = this.getTopUrl()
    // 获取榜单数据
    const {title, logo, articleList} = await this.getNewsTop(topUrl)

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
        <wstack flexDirection="column" padding={[16, 16, 16, 16]}>
          {/* 标题和logo */}
          <wstack verticalAlign="center">
            <wimage src={logo} width={14} height={14} borderRadius={4}></wimage>
            <wspacer length={10}></wspacer>
            <wtext opacity={0.7} font={Font.boldSystemFont(12)}>
              {title}
            </wtext>
          </wstack>
          {/* 内容 */}
          {size === 'small' && this.renderSmall(articleList)}
          {size === 'medium' && this.renderMedium(articleList)}
          {size === 'large' && this.renderLarge(articleList)}
        </wstack>
      </wbox>
    )
  }

  // 渲染小尺寸
  renderSmall(articleList: ArticleInfo[]) {
    return <wstack flexDirection="column"></wstack>
  }

  // 渲染中尺寸
  renderMedium(articleList: ArticleInfo[]) {
    const _articleList = articleList.slice(0, 5)
    return (
      <wstack flexDirection="column">
        {_articleList.map((article, index) => (
          <Article article={article} sort={index + 1}></Article>
        ))}
        <wspacer></wspacer>
      </wstack>
    )
  }

  // 渲染大尺寸
  renderLarge(articleList: ArticleInfo[]) {
    const _articleList = articleList.slice(0, 10)
    return (
      <wstack flexDirection="column">
        {_articleList.map((article, index) => (
          <Article article={article} sort={index + 1}></Article>
        ))}
        <wspacer></wspacer>
      </wstack>
    )
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

  // 获取热榜数据
  async getNewsTop(url: string): Promise<PageInfo> {
    const webview = new WebView()
    await webview.loadURL(url)
    await webview.waitForLoad()
    const {title = '今日热榜', logo = 'flame.fill', articleList = [], err} = (await webview.evaluateJavaScript(
      `
        let title = ''
        let logo = ''
        let articleList = []
        let err = ''
        try {
            title = document.title.split(' ')[0]
            logo = document.querySelector('.custom-info-content > img').src
            articleList = Array.from(document.querySelector('.divider > .weui-panel > .weui-panel__bd').querySelectorAll('a')).map(a => {
                return {
                    title: a.querySelector('h4').innerText.replace(/\\d+?[、]\\s*/, ''),
                    href: a.href,
                    hot: a.querySelector('h4+p').innerText
                }
            })
        } catch(err) {
            err = err
        }
        Object.assign({}, {title, logo, articleList, err})
    `,
    )) as PageInfo
    err && console.warn(`热榜获取出错: ${err}`)
    return {title, logo, articleList, err}
  }

  // 获取要显示的榜单 url
  getTopUrl(): string {
    // 默认为知乎榜单
    const defaultUrl = 'https://tophub.today/n/mproPpoq6O'
    // 从小部件编辑处获取关键词或链接
    const keyword = (args.widgetParameter as string) || defaultUrl
    if (this.isUrl(keyword)) return keyword
    const topInfo = topList.find(item => item.title.toLowerCase() === keyword.toLowerCase())
    if (topInfo) return topInfo.href
    return defaultUrl
  }

  /**
   * 判断一个值是否为网络连接
   * @param value 值
   */
  isUrl(value: string): boolean {
    const reg = /^(http|https)\:\/\/[\w\W]+/
    return reg.test(value)
  }
}

EndAwait(() => new NewsTop().init())
