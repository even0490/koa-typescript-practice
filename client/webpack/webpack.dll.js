const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const QiniuPlugin = require('qiniu-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { qiniu } = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    vendors: [
      // 修改默认依赖包
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'prop-types',
      'node-fetch',
    ],
  },
  output: {
    filename: '[name].[hash].dll.js',
    library: '[name]_[hash]',
    path: path.resolve(__dirname, '../../public/dll'),
    publicPath: `${qiniu.cdnBase}/web/static/`,
  },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.DllPlugin({
      format: true,
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../../public/dll/[name].manifest.json'),
    }),

    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new QiniuPlugin({
      ACCESS_KEY: qiniu.accessKey,
      SECRET_KEY: qiniu.secretKey,
      bucket: qiniu.bucket,
      path: 'web/static/',
      include: [
        /\.js$/,
        /\.js.gz$/,
        /\.css$/,
        /\.css.gz$/,
      ],
    }),
  ],
}