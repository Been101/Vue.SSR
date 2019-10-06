const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../entry-client.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../index.html'),
            filename: 'index.html'
        })
    ]
})