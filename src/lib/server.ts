/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import ip from 'ip'
const qrcode = require('qrcode-terminal')

interface CreateServerParams {
  staticDir: string
  showQrcode?: boolean
}

/**
 * 创建服务器
 * @param staticDir 服务器映射静态文件夹
 */
export function createServer(params: CreateServerParams): void {
  const {staticDir, showQrcode = true} = params
  const app = express()
  const port = 9090
  app.use(express.static(staticDir))

  app.listen(port)
  // console.clear()
  const link = `http://${ip.address('public')}:${port}`
  console.log(`手机访问 ${link}`)
  showQrcode && qrcode.generate(link, {small: true})
}
