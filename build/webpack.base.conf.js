const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const Path = {
  SRC: path.join(__dirname, '../src'),
  DIST: path.join(__dirname, '../public'),
  ASSETS: 'assets/',
  ROOT: path.join(__dirname, '../'),
}

module.exports = {
  externals: {
    paths: Path
  },
  entry: {
    app: Path.SRC + '/index.js'
  },
  output: {
    filename: `${Path.ASSETS}js/[name].js`,
    path: Path.DIST,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${Path.ASSETS}img` // функция дублируется с CopyWebpackPlugin
      },
    },
    { // Убрал svg из шрифтов, обрабатывает и картинки
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: `${Path.ASSETS}fonts`
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: `${Path.ROOT}postcss.config.js`
            },
          },
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: `${Path.ROOT}postcss.config.js`,
            },
          },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${Path.ASSETS}css/[name].css`,
    }),
    new CopyWebpackPlugin([
      {
        from: `${Path.SRC}/${Path.ASSETS}/img`,
        to: `${Path.ASSETS}img`
      },
      {
        from: `${Path.SRC}/${Path.ASSETS}/fonts`,
        to: `${Path.ASSETS}fonts`
      },
      {
        from: `${Path.SRC}/static`,
        to: ''
      }
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${Path.SRC}/index.html`,
      filename: './index.html'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
  })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
}
