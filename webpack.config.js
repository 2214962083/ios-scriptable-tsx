// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const env = process.env.NODE_ENV

/**
 * @param  {...string} _paths
 */
const resolve = (..._paths) => path.join(__dirname, ..._paths)

module.exports = /** @type { import('webpack').Configuration } */ ({
  target: 'node',
  externals: [nodeExternals()],
  mode: env === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  //devtool: env === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  devtool: 'source-map',
  stats: 'minimal', // 只有在发生错误或有新的编译时才输出到命令终端
  module: {
    unknownContextCritical: false,
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
})
