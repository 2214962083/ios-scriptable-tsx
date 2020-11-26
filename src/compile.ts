import {build} from 'esbuild'
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// 深度获取某个文件夹里所有文件路径（包括子文件夹）
async function getFilesFromDir(dir: string): Promise<string[]> {
  const subdirs = await readdir(dir)
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = path.resolve(dir, subdir)
      return (await stat(res)).isDirectory() ? getFilesFromDir(res) : res
    }),
  )
  return files.reduce((a: string[], f: string | string[]) => a.concat(f), [])
}

;(async () => {
  // 库文件夹
  // const libDir: string = path.resolve(__dirname, 'lib')

  // 输入文件夹
  const inputDir: string = path.resolve(__dirname, 'input')

  // 输出文件夹
  const outputDir: string = path.resolve(__dirname, 'output')

  // 计算输入文件路径集合
  // const inputPaths: string[] = fs.readdirSync(inputDir).map(fileName => path.resolve(inputDir, fileName))
  const inputPaths: string[] = await getFilesFromDir(inputDir)

  console.log(outputDir, inputPaths)

  build({
    entryPoints: [...inputPaths],
    platform: 'node',
    charset: 'utf8',
    bundle: true,
    outdir: outputDir,
    banner: 'const MODULE = module;',
    jsxFactory: 'h',
  }).catch(() => process.exit(1))
})()
