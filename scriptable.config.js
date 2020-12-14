// @ts-check

const path = require('path')

/**项目根目录，不建议修改*/
const rootPath = __dirname

/**输入文件，当 compileType 为 one 时生效，不建议修改*/
const inputFile = path.resolve(rootPath, './src/index.ts')

/**输入文件夹，当 compileType 为 all 时生效，不建议修改*/
const inputDir = path.resolve(rootPath, './src/scripts')

/**输出文件夹，不建议修改*/
const outputDir = path.resolve(rootPath, './dist')

/**是否压缩代码*/
const minify = process.env.NODE_ENV === 'production'

/**是否加密代码*/
const encrypt = process.env.NODE_ENV === 'production'

/**往编译后的代码头部插入的代码*/
const header = `
/**
 * 作者: 小明
 * 版本: 1.0.0
 * 更新时间：${new Date().toLocaleDateString()}
 * github: https://github.com/2214962083/ios-scriptable-tsx
 */
`

module.exports = /** @type { import ('./src/lib/compile').CompileOptions }  */ ({
  rootPath,
  inputFile,
  inputDir,
  outputDir,
  minify,
  encrypt,
  header,

  /**
   * esbuild 自定义配置
   * see: https://esbuild.github.io/api/#simple-options
   */
  esbuild: {},

  /**
   * javascript-obfuscator 自定义配置
   * see: https://github.com/javascript-obfuscator/javascript-obfuscator
   */
  encryptOptions: {},
})
