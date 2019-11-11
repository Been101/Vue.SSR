const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const base = require('./webpack.base.config');

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../entry-server.js')
  },
  output: {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2',
    chunkFilename: '[name].component.js',
  },
  plugins: [
    new VueSSRServerPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../index.ssr.html'),
      filename: 'index.ssr.html',
      files: {
        js: '/client.bundle.js'
      },
      excludeChunks: ['server']
    })
  ]
});