import {build} from 'esbuild'
import fs from 'fs'
import path from 'path'

// 库文件夹
// const libDir: string = path.join(__dirname, 'lib')

// 输入文件夹
const inputDir: string = path.join(__dirname, 'input')

// 输出文件夹
const outputDir: string = path.join(__dirname, 'output')

// 计算输入文件路径集合
const inputPaths: string[] = fs.readdirSync(inputDir).map(fileName => path.join(inputDir, fileName))

// 计算输出文件路径集合
// const outputPaths = fs.readdirSync(inputDir).map(inputFileName => {
//   const outputFileName = path.basename(inputFileName, path.extname(inputFileName)) + '.js'
//   return path.join(outputDir, outputFileName)
// })

// console.log(inputPaths, outputPaths)

build({
  entryPoints: [...inputPaths],
  platform: 'node',
  charset: 'utf8',
  bundle: true,
  outdir: outputDir,
}).catch(() => process.exit(1))
