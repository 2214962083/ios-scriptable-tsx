/**网络请求参数*/
export interface RequestParams {
  /**链接*/
  url: string

  /**数据*/
  data?: unknown

  /**请求头*/
  header?: Record<string, string>

  /**请求方式*/
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT'

  /**超时报错，单位毫秒，默认60秒*/
  timeout?: number

  /**返回的类型，默认是json解析出来的对象*/
  dataType?: 'json' | 'text' | 'image' | 'data'

  /**是否使用缓存（永久缓存）*/
  useCache?: boolean
}

/**网络响应格式*/
export interface ResponseType<T = Record<string, unknown>> {
  /**链接*/
  url: string

  /**响应码*/
  statusCode: number

  /**响应类型*/
  mimeType: string

  /**文字编码*/
  textEncodingName: string

  /**响应头*/
  headers: Record<string, string>

  /**cookie*/
  cookies: {
    path: string
    httpOnly: boolean
    domain: string
    sessionOnly: boolean
    name: string
    value: string
  }[]

  /**主体响应内容*/
  data: Image | string | Data | T
}

/**上传文件参数*/
export interface UploadFileParams {
  /**链接*/
  url: string

  /**文件路径*/
  filePath: string | Image

  /**文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容*/
  name: string

  /**文件名字*/
  filename?: string

  /**请求头*/
  header?: Record<string, string>

  /**HTTP 请求中其他额外的 form data*/
  formData?: Record<string, string>

  /**超时报错，单位毫秒，默认60秒*/
  timeout?: number

  /**返回的类型，默认是json解析出来的对象*/
  dataType?: 'json' | 'text' | 'image' | 'data'
}

/**选择弹窗参数*/
export interface ShowActionSheetParams {
  /**标题*/
  title?: string

  /**描述*/
  desc?: string

  /**取消文字*/
  cancelText?: string

  /**每个选择*/
  itemList: {
    /**文字*/
    text: string

    /** wran 的话就会标红文字 */
    type: 'normal' | 'warn'
  }[]
}

/**提示、警告弹窗参数*/
export interface ShowModalParams {
  /**标题*/
  title?: string

  /**内容*/
  content?: string

  /**是否显示取消*/
  showCancel?: boolean

  /**取消文字*/
  cancelText?: string

  /**确定文字*/
  confirmText?: string
}

/**提示、警告弹窗响应体*/
export interface ShowModalRes {
  /**是否确定*/
  confirm: boolean

  /**是否取消*/
  cancel: boolean
}

/**
 * 保存值
 * @param key 键
 * @param value 值
 */
export function setStorageSync(key: string, value: unknown): void {
  Keychain.set(key, JSON.stringify(value))
}

/**
 * 获取值
 * @param key 键
 */
export function getStorageSync<T = unknown>(key: string): T | null {
  if (Keychain.contains(key)) {
    return JSON.parse(Keychain.get(key))
  } else {
    return null
  }
}

/**
 * 发起请求
 * @param args 请求参数
 */
export async function request<RES = unknown>(args: RequestParams): Promise<ResponseType<RES>> {
  const {url, data, header, dataType = 'json', method = 'GET', timeout = 60 * 1000, useCache = false} = args
  const cacheKey = hash(url)
  const cache = getStorageSync<ResponseType<RES>>(cacheKey)
  if (useCache && cache !== null) return cache
  const req = new Request<RES>(url)
  req.method = method
  header && (req.headers = header)
  data && (req.body = data)
  req.timeoutInterval = timeout / 1000
  req.allowInsecureRequest = true
  let res
  try {
    switch (dataType) {
      case 'json':
        res = await req.loadJSON()
        break
      case 'text':
        res = await req.loadString()
        break
      case 'image':
        res = await req.loadImage()
      case 'data':
        res = await req.load()
      default:
        res = await req.loadJSON()
    }
    const result = {...req.response, data: res} as ResponseType<RES>
    setStorageSync(cacheKey, result)
    return result
  } catch (err) {
    return err
  }
}

/**
 * 上传文件
 * @param args 上传文件参数
 */
export async function uploadFile<RES = unknown>(args: UploadFileParams): Promise<ResponseType<RES>> {
  const {
    url,
    filePath,
    name,
    dataType = 'json',
    filename = new Date().getTime(),
    header,
    formData = {},
    timeout = 60 * 1000,
  } = args
  const req = new Request(url)
  header && (req.headers = header)
  req.timeoutInterval = timeout / 1000
  if (typeof filePath === 'string') {
    req.addFileToMultipart(filePath, name, String(filename))
  } else {
    req.addImageToMultipart(filePath, name, String(filename))
  }
  Object.keys(formData).forEach(key => {
    req.addParameterToMultipart(key, formData[key])
  })
  let res
  try {
    switch (dataType) {
      case 'json':
        res = await req.loadJSON()
        break
      case 'text':
        res = await req.loadString()
        break
      case 'image':
        res = await req.loadImage()
      case 'data':
        res = await req.load()
      default:
        res = await req.loadJSON()
    }

    return {...req.response, data: res} as ResponseType<RES>
  } catch (err) {
    return err
  }
}

/**
 * 弹出选择弹窗
 * @param args 弹窗参数
 */
export async function showActionSheet(args: ShowActionSheetParams): Promise<number> {
  const {title, desc, cancelText = '取消', itemList} = args
  const alert = new Alert()
  title && (alert.title = title)
  desc && (alert.message = desc)
  for (const item of itemList) {
    switch (item.type) {
      case 'normal':
        alert.addAction(item.text)
        break
      case 'warn':
        alert.addDestructiveAction(item.text)
        break
      default:
        alert.addAction(item.text)
        break
    }
  }
  alert.addCancelAction(cancelText)
  const tapIndex = await alert.presentSheet()
  return tapIndex
}

/**
 * 弹出提示、警告弹窗
 * @param args 弹窗参数
 */
export async function showModal(args: ShowModalParams): Promise<ShowModalRes> {
  const {title, content, showCancel = true, cancelText = '取消', confirmText = '确定'} = args
  const alert = new Alert()
  title && (alert.title = title)
  content && (alert.message = content)
  alert.addAction(confirmText)
  showCancel && cancelText && alert.addCancelAction(cancelText)
  const tapIndex = await alert.presentSheet()
  return tapIndex === -1 ? {cancel: true, confirm: false} : {cancel: false, confirm: true}
}

/**
 * base64 编码字符串
 * @param str 要编码的字符串
 */
export function base64Encode(str: string): string {
  return Data.fromString(str).toBase64String()
}

/**
 * base64解码数据
 * @param base64 base64编码的数据
 */
export function base64Decode(base64: string): string {
  return Data.fromBase64String(base64).toRawString()
}

/**
 * 字符串转哈希
 * @param string 字符串
 */
export function hash(string: string): string {
  let hash = 0,
    i,
    chr
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return `hash_${hash}`
}
