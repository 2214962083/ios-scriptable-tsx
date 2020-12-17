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
  request,
} from '@app/lib/help'
import {FC} from 'react'

/**手机卡数据列表*/
interface PhoneDatas {
  data: {
    dataList: PhoneData[]
  }
}

/**手机卡数据*/
interface PhoneData {
  pointUpdateTimeStamp: string
  paperwork4: string
  buttonBacImageUrlBig: string
  type: string
  remainTitle: string
  buttonText7: string
  buttonLinkMode: string
  displayTime: string
  buttonText7TextColor: string
  buttonBacImageUrlSmall: string
  button: string
  remainTitleColoer: string
  buttonBacImageUrl: string
  buttonTextColor: string
  isShake: string
  number: string
  isWarn?: string
  paperwork4Coloer: string
  url: string
  buttonUrl7: string
  unit: string
  button7LinkMode: string
  persent: string
  persentColor: string
  buttonAddress: string
  usedTitle: string
  ballRippleColor1: string
  ballRippleColor2: string
  markerImg?: string
  warningTextColor?: string
  warningPointColor?: string
}

/**页面信息*/
interface PageInfo {
  /**页面数据*/
  phoneDatas: PhoneDatas

  /**cookie*/
  cookie: string | null

  /**js执行的错误信息*/
  err: Error
}

/**有用的手机卡数据*/
interface UsefulPhoneData {
  /**类型*/
  type: string

  /**剩余百分比数字*/
  present: number

  /**单位*/
  unit: string

  /**剩余量数字*/
  count: number

  /**描述*/
  label: string
}

const {setStorage, getStorage} = useStorage('china10010-xiaoming')

/**默认背景颜色*/
const defaultBgColor = Color.dynamic(new Color('#ffffff', 1), new Color('#000000', 1))

/**文字颜色*/
const textColor = getStorage<string>('textColor') || Color.dynamic(new Color('#000000', 1), new Color('#dddddd', 1))

/**透明背景*/
const transparentBg: Image | Color = getStorage<Image>('transparentBg') || defaultBgColor

/**背景颜色或背景图链接*/
const boxBg = getStorage<string>('boxBg') || defaultBgColor

class China10010 {
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
    // 多久（毫秒）更新一次小部件（默认3分钟）
    const updateInterval = 3 * 60 * 1000

    // 渲染尺寸
    const size = config.widgetFamily

    return (
      <wbox
        padding={[0, 0, 0, 0]}
        updateDate={new Date(Date.now() + updateInterval)}
        background={typeof boxBg === 'string' && boxBg.match('透明背景') ? transparentBg : boxBg}
      >
        <wstack flexDirection="column" padding={[0, 16, 0, 16]}>
          <wspacer></wspacer>
          <wspacer></wspacer>
          {/* 标题和logo */}
          <wstack verticalAlign="center">
            <wimage
              src="https://p.pstatp.com/origin/1381a0002e9cbaedbc301"
              width={20}
              height={20}
              borderRadius={4}
            ></wimage>
            <wspacer length={8}></wspacer>
            <wtext opacity={0.7} font={Font.boldSystemFont(16)} textColor={textColor}>
              中国联通
            </wtext>
          </wstack>
          <wspacer></wspacer>
          <wspacer></wspacer>
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
    const article = articleList[0]
    return (
      <wstack flexDirection="column">
        <wtext font={Font.lightSystemFont(14)} textColor={textColor}>
          {article.title}
        </wtext>
        <wspacer></wspacer>
        <wstack>
          <wspacer></wspacer>
          <wtext maxLine={1} font={Font.lightSystemFont(12)} opacity={0.6} textColor={textColor}>
            {article.hot}
          </wtext>
        </wstack>
        <wspacer></wspacer>
      </wstack>
    )
  }

  // 渲染中尺寸
  renderMedium(articleList: ArticleInfo[]) {
    const _articleList = articleList.slice(0, 4)
    return (
      <>
        <wstack flexDirection="column">
          {_articleList.map((article, index) => (
            <Article article={article} sort={index + 1}></Article>
          ))}
        </wstack>
        <wspacer></wspacer>
        <wspacer></wspacer>
      </>
    )
  }

  // 渲染大尺寸
  renderLarge(articleList: ArticleInfo[]) {
    const _articleList = articleList.slice(0, 10)
    return (
      <>
        <wstack flexDirection="column">
          {_articleList.map((article, index) => (
            <Article article={article} sort={index + 1}></Article>
          ))}
        </wstack>
        <wspacer></wspacer>
        <wspacer></wspacer>
      </>
    )
  }

  // 显示菜单
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['登录', '设置手机号', '设置颜色', '设置透明背景', '预览组件'],
    })
    switch (selectIndex) {
      case 0:
        const {cancel: cancelLogin} = await showModal({
          title: '为什么要登录',
          content:
            '获取手机号码信息需要 cookie，而 cookie 不登录获取不到\n\n若 cookie 失效，再次登录即可\n\n登录完成后，自行关闭网页',
          confirmText: '去登录',
        })
        if (cancelLogin) return
        const loginUrl = 'https://uac.10010.com/oauth2/new_auth?display=wap&page_type=05'
        await WebView.loadURL(loginUrl, undefined, true)
        break
      case 1:
        break
      case 2:
        const {texts, cancel} = await showModal({
          title: '设置全局背景和颜色',
          content: '如果为空，则还原默认',
          inputItems: [
            {
              text: getStorage<string>('boxBg') || '',
              placeholder: '全局背景：可以是颜色、图链接',
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
      case 3:
        const img: Image | null = (await setTransparentBackground()) || null
        if (img) {
          setStorage('transparentBg', img)
          setStorage('boxBg', '透明背景')
          await showNotification({title: '设置透明背景成功', sound: 'default'})
        }
        break
      case 4:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }

  // 获取手机卡数据
  async getPhoneData(phoneNumber: number): Promise<UsefulPhoneData[] | string> {
    if (!isLaunchInsideApp() && !getStorage('cookie')) {
      await showNotification({title: 'cookie 不存在，请先登录', sound: 'failure'})
      return 'cookie 不存在，请先登录'
    }
    const api = `https://wap.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${phoneNumber}&showType=3`
    const getPageInfo = async (): Promise<PageInfo> => {
      const webview = new WebView()
      await webview.loadURL(api)
      await webview.waitForLoad()
      const setCookie = `document.cookie = "${getStorage('cookie') || ''}"`
      const {phoneDatas, cookie, err} = (await webview.evaluateJavaScript(`
        let cookie = document.cookie
        let phoneDatas = {}
        let err = ''
        ${isLaunchInsideApp() ? '' : setCookie}
        try {
          phoneDatas = JSON.parse(document.body.innerText)
        } catch (error) {
          err = error
        }
        Object.assign({}, {phoneDatas, cookie, err})
      `)) as PageInfo
      err && console.warn('获取数据出错', err)
      return {phoneDatas, cookie, err}
    }
    const {phoneDatas, cookie} = await getPageInfo()
    isLaunchInsideApp() && cookie && setStorage('cookie', cookie)
    let usefulPhoneData: UsefulPhoneData[] = []
    try {
      // 提取有用的信息
      usefulPhoneData = phoneDatas.data.dataList.map(info => {
        const present = info.usedTitle.replace(/(已用|剩余)([\d\.]+)?\%/, (...args) => {
          return args[1] === '剩余' ? args[2] : 100 - args[2]
        })
        return {
          type: info.type,
          present: Number(present) > 100 ? 100 : Number(present),
          unit: info.unit,
          count: Number(info.number),
          label: info.remainTitle,
        }
      })
    } catch (err) {
      await showNotification({title: '获取联通卡信息失败', body: '检查一下网络，或重新登录', sound: 'failure'})
      return '获取联通卡信息失败\n检查一下网络，或重新登录'
    }
    return usefulPhoneData
  }
  // // 获取手机卡数据
  // async getPhoneData(phoneNumber: number): Promise<UsefulPhoneData[] | string> {
  //   const api = `https://wap.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${phoneNumber}&showType=3`
  //   if (isLaunchInsideApp()) {
  //     const webview = new WebView()
  //     await webview.loadURL(api)
  //     await webview.waitForLoad()
  //     const {cookie} = (await webview.evaluateJavaScript(`
  //       let cookie = document.cookie
  //       Object.assign({}, {cookie})
  //     `)) as PageInfo
  //     cookie && setStorage('cookie', cookie)
  //   }
  //   let usefulPhoneData: UsefulPhoneData[] = []
  //   try {
  //     const cookie = getStorage<string>('cookie')
  //     if (!cookie) {
  //       await showNotification({title: 'cookie 不存在，请先登录', sound: 'failure'})
  //       return 'cookie 不存在，请先登录'
  //     }
  //     // 获取手机卡信息列表
  //     const dataList: PhoneData[] =
  //       (
  //         await request<PhoneDatas>({
  //           url: api,
  //           dataType: 'text',
  //           header: {
  //             'user-agent':
  //               'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  //             cookie,
  //           },
  //         })
  //       ).data?.data.dataList || []
  //     // 提取有用的信息
  //     usefulPhoneData = dataList.map(info => {
  //       const present = info.usedTitle.replace(/(已用|剩余)([\d\.]+)?\%/, (...args) => {
  //         return args[1] === '剩余' ? args[2] : 100 - args[2]
  //       })
  //       return {
  //         type: info.type,
  //         present: Number(present) > 100 ? 100 : Number(present),
  //         unit: info.unit,
  //         count: Number(info.number),
  //         label: info.remainTitle,
  //       }
  //     })
  //   } catch (err) {
  //     await showNotification({title: '获取联通卡信息失败', body: '检查一下网络，或重新登录', sound: 'failure'})
  //     return '获取联通卡信息失败\n检查一下网络，或重新登录'
  //   }
  //   return usefulPhoneData
  // }
}

EndAwait(() => new China10010().init())
