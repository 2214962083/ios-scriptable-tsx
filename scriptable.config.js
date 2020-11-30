const env = process.env.NODE_ENV

module.exports = {
  esbuild: /** @type { import ('esbuild').BuildOptions }  */ ({
    // 是否开启打包混淆压缩
    minify: env === 'production',
  }),
}
