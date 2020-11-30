import {build} from 'esbuild'
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'

type CompileType = 'all' | 'main'
const compileType = (process.env.compileType as CompileType) || 'main'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const resolve = (_path: string): string => path.resolve(__dirname, _path)

const define: Record<string, string> = {}
for (const key in process.env) {
  //  不能含有括号、-号、空格
  if (/[\(\)\-\s]/.test(key)) continue
  define[`process.env.${key}`] = JSON.stringify(process.env[key])
}

// console.log(define)

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
  // const libDir: string = resolve('lib')

  // 输入文件夹
  const inputDir: string = resolve('input')

  // 主入口文件
  const mainPath: string = resolve('./main.ts')

  // 计算输入文件路径集合
  const inputPaths: string[] = compileType === 'all' ? await getFilesFromDir(inputDir) : [mainPath]

  // console.log(outputDir, inputPaths)

  build({
    entryPoints: [...inputPaths],
    platform: 'node',
    charset: 'utf8',
    bundle: true,
    outdir: compileType === 'all' ? resolve('output') : resolve('dist'),
    banner: 'const MODULE = module;',
    jsxFactory: 'h',
    define,
  }).catch(() => process.exit(1))
})()
