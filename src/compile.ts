import {build, BuildOptions} from 'esbuild'
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import {merge} from 'lodash'
import {createServer} from './lib/server'
import {loadEnvFiles} from './lib/env'

/**打包模式*/
enum CompileType {
  /**打包一个文件夹*/
  ALL = 'all',

  /**为打包入口文件*/
  ONE = 'one',
}

interface CompileOptions {
  /**项目根目录*/
  rootPath: string

  /**输入文件，当 compileType 为 one 时生效*/
  inputFile: string

  /**输入文件夹，当 compileType 为 all 时生效*/
  inputDir: string

  /**输出文件夹*/
  outputDir: string

  /**打包模式，all 为打包一个文件夹，one为打包入口文件*/
  compileType?: CompileType

  /**是否在 watch 开发*/
  watch?: boolean

  /**是否显示二维码*/
  showQrcode?: boolean

  /** esbuild 补充文件*/
  esbuild?: BuildOptions

  /**是否压缩代码*/
  minify?: boolean
}

/**项目根目录*/
const rootPath = path.resolve(__dirname, '../')

/**输入文件，当 compileType 为 one 时生效*/
const inputFile: string = path.resolve(rootPath, './src/index.ts')

/**输入文件夹，当 compileType 为 all 时生效*/
const inputDir: string = path.resolve(rootPath, './src/scripts')

/**输出文件夹*/
const outputDir: string = path.resolve(rootPath, './dist')

/**打包模式，all 为打包一个文件夹，one为打包入口文件*/
const compileType = (process.env.compileType as CompileType) || CompileType.ONE

/**是否在 watch 开发*/
const watch = Boolean(process.env.watching)

/**是否压缩代码*/
const minify = process.env.NODE_ENV === 'production'

compile({
  rootPath,
  inputFile,
  inputDir,
  outputDir,
  compileType,
  watch,
  minify,
})

async function compile(options: CompileOptions) {
  const {
    rootPath,
    inputDir,
    inputFile,
    outputDir,
    compileType = CompileType.ONE,
    watch = false,
    showQrcode = true,
    esbuild = {},
    minify = false,
  } = options

  /**加载环境变量 .env 文件*/
  loadEnvFiles(rootPath)

  if (watch) {
    /**创建服务器*/
    createServer({
      staticDir: outputDir,
      showQrcode,
    })
  }

  // 编译时，把 process.env 环境变量替换成 dotenv 文件参数
  const define: Record<string, string> = {}
  for (const key in process.env) {
    //  不能含有括号、-号、空格
    if (/[\(\)\-\s]/.test(key)) continue
    define[`process.env.${key}`] = JSON.stringify(process.env[key])
  }

  // 深度获取某个文件夹里所有文件路径（包括子文件夹）
  const readdir = promisify(fs.readdir)
  const stat = promisify(fs.stat)
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

  // 计算输入文件路径集合
  const inputPaths: string[] = compileType === CompileType.ALL ? await getFilesFromDir(inputDir) : [inputFile]

  // console.log(outputDir, inputPaths)

  /** esbuild 配置*/
  const buildOptions: BuildOptions = {
    entryPoints: [...inputPaths],
    platform: 'node',
    charset: 'utf8',
    bundle: true,
    outdir: outputDir,
    banner: `
// @编译时间 ${Date.now()}
const MODULE = module;
    `,
    jsxFactory: 'h',
    define,
    minify,
  }

  // 最终打包环节
  build(merge(buildOptions, esbuild)).catch(() => process.exit(1))
}
