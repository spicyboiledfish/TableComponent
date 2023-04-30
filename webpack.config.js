'use strict';

const path = require('path');
const TemplateExtractPlugin = require('template-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './src/pages/root.tsx')
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, 'babel.config.js')
            }
          }
        ]
      },
      {
        test: /.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              TemplateExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' }, importLoaders: 1 } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [
              'style-loader',
              TemplateExtractPlugin.loader,
              { loader: 'css-loader', options: { importLoaders: 1 } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `assets/[name].[contenthash:8].[ext]`
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Table组件',
      path: path.resolve(__dirname, './src'),
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new TemplateExtractPlugin({
      injectInJs: true,
      /** 是否同步加载脚本，默认 false */
      sync: false,
      /** 
       * 是否禁用插件执行，需要截图时请注释或设置为false
       * 详见 https://github.com/BobbyLH/template-extract-plugin
       * */
      disable: true
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
  }
};
