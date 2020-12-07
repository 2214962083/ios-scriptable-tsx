import express from 'express'
import ip from 'ip'
import bodyParser from 'body-parser'
import {port} from './constants'
import chalk from 'chalk'
const qrcode = require('qrcode-terminal')

interface CreateServerParams {
  staticDir: string
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

  // 解析请求参数
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  )

  app.use(bodyParser.json())

  // 映射静态文件夹
  app.use(express.static(staticDir))

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

  /** server api 地址*/
  const serverApi = `http://${ip.address('public')}:${port}`
  // console.clear()
  console.log(`手机访问 ${serverApi}`)
  showQrcode && qrcode.generate(serverApi, {small: true})
  return {serverApi}
}
