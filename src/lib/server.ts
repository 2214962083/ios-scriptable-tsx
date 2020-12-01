/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import path from 'path'
import ip from 'ip'
const qrcode = require('qrcode-terminal')

if (process.env.watching) {
  const app = express()
  const port = 9090
  const publicPath = path.resolve(__dirname, '../../dist')
  app.use(express.static(publicPath))

  app.listen(port)
  // console.clear()
  const link = `http://${ip.address('public')}:${port}`
  console.log(`手机访问 ${link}`)
  qrcode.generate(link, {small: true})
}
