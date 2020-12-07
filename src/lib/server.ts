import express from 'express'
import ip from 'ip'
import bodyParser from 'body-parser'
import {port} from './constants'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
const qrcode = require('qrcode-terminal')

interface CreateServerParams {
  /**要映射的静态文件夹*/
  staticDir: string

  /**是否显示二维码*/
  showQrcode?: boolean
}

interface ConsoleApiBody {
  type: 'log' | 'warn' | 'error'
  data: unknown
}

enum ResCode {
  SUCCESS = 0,
  FAIL = 1,
}

interface Res<T = unknown> {
  code: ResCode
  msg: string
  data?: T
}

/**
 * 创建服务器
 * @param staticDir 服务器映射静态文件夹
 */
export function createServer(params: CreateServerParams): {serverApi: string} {
  const {staticDir, showQrcode = true} = params
  const app = express()

  /** server api 地址*/
  const serverApi = `http://${ip.address('public')}:${port}`

  // 解析请求参数
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  )

  app.use(bodyParser.json())

  // 映射静态文件夹
  app.use(express.static(staticDir))

  app.get('/', (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, './static', './dev-help.html'), {encoding: 'utf8'}).toString()

    /**自动安装基础包并命名的代码*/
    const installBasicCode = `
(async() => {

  const notify = new Notification()
  notify.sound = 'default'
  try {
    const req = new Request('${serverApi}/basic.js')
    const code = await req.loadString()
    const newFilename = module.filename.split('/').slice(0, -1).concat(['基础包.js']).join('/')
    FileManager.local().writeString(
      newFilename,
\`// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: mobile-alt;
\${code}\`)

    // 通知
    notify.title = '安装基础包成功'
    notify.schedule()

    FileManager.local().remove(module.filename)
    Safari.open("scriptable:///open?scriptName="+encodeURIComponent('基础包'));
  } catch(err) {
    console.error(err)
    notify.title = '安装基础包失败'
    notify.body = err.message || ''
    notify.schedule()
  }
})()
`
    html = html.replace('@@code@@', installBasicCode)
    res.send(html)
  })

  app.get('/basic.js', (req, res) => {
    const js = fs.readFileSync(path.resolve(__dirname, './static', './基础包.js'), {encoding: 'utf8'}).toString()

    res.send(js)
  })

  app.post('/console', (req, res) => {
    const {type = 'log', data = ''} = req.body as ConsoleApiBody
    const logTime = new Date().toLocaleString().split(' ')[1]
    const logParams = [`[${type} ${logTime}]`, typeof data !== 'object' ? data : JSON.stringify(data, null, 2)]
    switch (type) {
      case 'log':
        console.log(chalk.green(...logParams))
        break
      case 'warn':
        console.warn(chalk.yellow(...logParams))
        break
      case 'error':
        console.error(chalk.red(...logParams))
        break
      default:
        console.log(chalk.green(...logParams))
        break
    }

    res.send({
      code: ResCode.SUCCESS,
      msg: 'success',
    } as Res)
  })

  app.listen(port)

  // console.clear()
  console.log(`手机访问 ${serverApi}`)
  showQrcode && qrcode.generate(serverApi, {small: true})
  return {serverApi}
}
