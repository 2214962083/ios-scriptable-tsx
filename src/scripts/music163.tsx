/**
 * 网易云歌单小部件
 */

import {
  getRandomInt,
  isLaunchInsideApp,
  request,
  showActionSheet,
  showModal,
  showNotification,
  showPreviewOptions,
  useStorage,
} from '@app/lib/help'
import {Col} from '@app/lib/components'
import {WstackProps} from '@app/types/widget'
import {FC} from 'react'

/**网易云歌单数据格式*/
interface NetmusicListData {
  code: number
  playlist: Playlist
}

interface Playlist {
  /**歌曲信息存放*/
  tracks: Track[]
}

interface Track {
  name: string
  id: number
  pst: number
  t: number
  alia: string[]
  pop: number
  st: number
  rt?: string
  fee: number
  v: number
  crbt?: unknown
  cf: string

  /**该首歌曲信息*/
  al: MusicInfo
  dt: number
  a?: unknown
  cd: string
  no: number
  rtUrl?: unknown
  ftype: number
  rtUrls: unknown[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  noCopyrightRcmd?: unknown
  rtype: number
  rurl?: unknown
  mst: number
  cp: number
  mv: number
  publishTime: number
  alg: string
}

/**歌曲信息*/
interface MusicInfo {
  /**歌曲 id */
  id: number

  /**歌曲名字*/
  name: string

  /**歌曲封面图*/
  picUrl: string

  tns: unknown[]
  pic_str: string
  pic: number
}

const {setStorage, getStorage} = useStorage('music163-grid')

// Favorite 歌单ID
const favoriteListId = getStorage<number>('favoriteListId') || 3136952023

// Like 歌单ID
const likeListId = getStorage<number>('likeListId') || 310970433

// Cloud 歌单ID
const cloudListId = getStorage<number>('cloudListId') || 2463071445

// 文字颜色
const textColor = '#ffffff'

/**格子组件参数*/
interface GridProps {
  /** icon 名字*/
  iconName: string

  /**格子背景*/
  background: WstackProps['background']

  /**文字*/
  text: string

  /**点击格子跳转的链接*/
  href: string
}

/**格子组件*/
const Grid: FC<GridProps> = ({...props}) => {
  const {iconName, background, text, href} = props
  return (
    <wstack background={background} href={href}>
      <Col background="#00000033" alignItems="center" justifyContent="center">
        <wimage src={iconName} filter={textColor} width={20} height={20}></wimage>
        <wtext font={new Font('heavymenlo', 12.5)} textColor={textColor}>
          {text}
        </wtext>
      </Col>
    </wstack>
  )
}

class Music163 {
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
    const favoriteImageUrl = ((await this.getRandomMusic(favoriteListId)) || {}).picUrl
    const likeImageUrl = ((await this.getRandomMusic(likeListId)) || {}).picUrl
    const cloudImageUrl = ((await this.getRandomMusic(cloudListId)) || {}).picUrl
    // 多久（毫秒）更新一次小部件（默认3小时）
    const updateInterval = 3 * 60 * 60 * 1000
    return (
      <wbox padding={[0, 0, 0, 0]} updateDate={new Date(Date.now() + updateInterval)}>
        <wstack>
          <Grid
            iconName="heart.fill"
            text="Favorite"
            background={favoriteImageUrl || '#d65151'}
            href={'orpheus://playlist/' + favoriteListId + '?autoplay=1'}
          ></Grid>
          <wstack flexDirection="column">
            <wstack>
              <Grid
                iconName="star.fill"
                text="Like"
                background={likeImageUrl || '#5ebb07'}
                href={'orpheus://playlist/' + likeListId + '?autoplay=1'}
              ></Grid>
              <Grid
                iconName="person.icloud.fill"
                text="Cloud"
                background={cloudImageUrl || '#0fb196'}
                href={'orpheus://playlist/' + cloudListId + '?autoplay=1'}
              ></Grid>
            </wstack>
            <wstack>
              <Grid iconName="calendar" text="Daily" background="#fe9500" href="orpheus://songrcmd?autoplay=1"></Grid>
              <Grid iconName="radio.fill" text="FM" background="#000000" href="orpheuswidget://radio"></Grid>
            </wstack>
          </wstack>
        </wstack>
      </wbox>
    )
  }

  // 显示菜单
  async showMenu() {
    const selectIndex = await showActionSheet({
      title: '菜单',
      itemList: ['自定义歌单', '预览组件'],
    })
    let musicListId: number | null
    switch (selectIndex) {
      case 0:
        const {texts} = await showModal({
          title: '设置歌单',
          content: '去网易云歌单 -> 分享 -> 复制链接， 然后粘贴到此',
          inputItems: [
            {
              placeholder: '这里填 Favorite 的歌单链接',
            },
            {
              placeholder: '这里填 Like 的歌单链接',
            },
            {
              placeholder: '这里填 Cloud 的歌单链接',
            },
          ],
        })
        if (texts[0]) {
          musicListId = this.getListIdFromLink(texts[0])
          musicListId && setStorage('favoriteListId', musicListId)
          !musicListId &&
            (await showNotification({
              title: '歌单链接错误',
              body: 'Favorite 的歌单链接检测不到歌单 id ',
              sound: 'failure',
            }))
        }
        if (texts[1]) {
          musicListId = this.getListIdFromLink(texts[1])
          musicListId && setStorage('likeListId', musicListId)
          !musicListId &&
            (await showNotification({title: '歌单链接错误', body: 'Like 的歌单链接检测不到歌单 id ', sound: 'failure'}))
        }
        if (texts[2]) {
          musicListId = this.getListIdFromLink(texts[2])
          musicListId && setStorage('cloudListId', musicListId)
          !musicListId &&
            (await showNotification({
              title: '歌单链接错误',
              body: 'cloud 的歌单链接检测不到歌单 id ',
              sound: 'failure',
            }))
        }
        await showNotification({title: '设置完成', sound: 'default'})
        break
      case 1:
        await showPreviewOptions(this.render.bind(this))
        break
    }
  }
  /**
   * 根据歌单链接获取歌单 id
   * @param musicListLink 歌单链接
   */
  getListIdFromLink(musicListLink: string): number | null {
    return Number((musicListLink.match(/\&id\=([\d]+)/) || [])[1]) || null
  }

  /**
   * 根据歌单id获取歌单数据
   * @param musicListId 歌单 id
   **/
  async getMusicListData(musicListId: number): Promise<Track[]> {
    let tracks: Track[] = []
    try {
      tracks =
        (
          await request<NetmusicListData>({
            url: `https://api.imjad.cn/cloudmusic/?type=playlist&id=${musicListId}`,
            dataType: 'json',
          })
        ).data?.playlist.tracks || []
    } catch (err) {
      console.warn(`获取歌单数据失败：${err}`)
    }
    return tracks
  }

  /**
   * 从歌曲列表里随机选一首歌曲，返回该首歌曲信息
   * @param musicListId 歌单id
   */
  async getRandomMusic(musicListId: number): Promise<MusicInfo | null> {
    const tracks = await this.getMusicListData(musicListId)
    if (tracks.length <= 0) {
      await showNotification({title: `歌单ID${musicListId}获取出错`, body: '该歌单没有歌曲或获取歌曲失败'})
      return null
    }
    return tracks[getRandomInt(0, tracks.length - 1)].al
  }
}

EndAwait(() => new Music163().init())
