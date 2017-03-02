const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const mdPlugin = path.resolve(__dirname, '../index.js')

const vueLoaderOptions = {
  js: 'babel-loader',
  css: ExtractTextPlugin.extract({
    use: 'css-loader',
    fallback: 'vue-style-loader'
  })
}

module.exports = {
  entry: './test/index.js',
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.vue\.md$/,
      use: [{
        loader: 'vue-loader',
        options: vueLoaderOptions
      }, {
        loader: mdPlugin
      }]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderOptions
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['main'],
      template: path.resolve(__dirname, '../test/index.html'),
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  devtool: '#source-map'
}
