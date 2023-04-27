'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TemplateExtractPlugin = require('template-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  devtool: false,
  // devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: false,
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, '../src/index.tsx')
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../src'),
    publicPath: '/'
  },
  module: {
    rules: [
      
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
      }

    ]
  },
  plugins: [
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
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
});
