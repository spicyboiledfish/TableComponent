'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const TemplateExtractPlugin = require('template-extract-plugin');


const commonConfig = require(path.resolve(__dirname, 'webpack.config.common.js'));

module.exports = merge(commonConfig, {
  // 需要 source-map 请开启
  // devtool: 'cheap-module-source-map',
  cache: {
    type: 'memory'
  },
  output: {
    publicPath
  },
  module: {
    rules: [
      
      {
        test: /.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              TemplateExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' }, importLoaders: 1 } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIndents: false,
          autoprefixer: false
        }
      })
    ],
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        polyfill: {
          chunks: 'all',
          test: /(core-js|regenerator-runtime)/,
          enforce: true,
          name: 'polyfill',
          priority: 120
        },
        flexible: {
          chunks: 'all',
          test: /amfe-flexible/,
          enforce: true,
          name: 'flexible',
          priority: 105
        },
        vendors: {
          chunks: 'all',
          test: /(react|react-dom|react-router|react-router-dom|redux|react-redux|mobx|mobx-react)/,
          enforce: true,
          name: 'vendors',
          priority: 100
        },
        asyncs: {
          chunks: 'async',
          enforce: true,
          name: 'chunk.async',
          priority: 80
        }
      }
    }
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: hash ? `[name].[${typeof hash === 'string' ? hash : 'contenthash'}:8].css` : '[name].css'
    }),
    
    // ! 需要分析打包时，请打开注释
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   defaultSizes: 'parsed',
    //   reportFilename: './bundle_analysis.html'
    // }),

    new HtmlWebpackPlugin({
      path: path.resolve(outDir),
      template: path.resolve(srcDir, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      // filename: hash ? 'index.[hash:8].html' : 'index.html',
      // hash: !!hash,
      filename: 'index.html'
    }),

    new TemplateExtractPlugin({
      injectInJs: true,
      fileName: 'snopshot.[hash:8].js',
      /** 是否同步加载脚本，默认 false */
      sync: false,
      /** 
       * 是否禁用插件执行，需要截图时请注释或设置为false
       * 详见 https://github.com/BobbyLH/template-extract-plugin
       * */
      disable: true
    }),

    // 走统一 CDN 的静态资源
    // 能一定程度上减少资源加载时长和构建时长
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://w3.hoopchina.com.cn/react/react-latest.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://w3.hoopchina.com.cn/react/react-dom-latest.js',
    //       global: 'ReactDOM'
    //     },
    //     {
    //       module: 'react-router',
    //       entry: 'https://w3.hoopchina.com.cn/react/react-router-latest.js',
    //       global: 'ReactRouter'
    //     },
    //     {
    //       module: 'react-router-dom',
    //       entry: 'https://w3.hoopchina.com.cn/react/react-router-dom-latest.js',
    //       global: 'ReactRouterDOM'
    //     }
    //   ]
    // }),

    // 将同步的外链 link 注入到 html 中
    //! 能一定程度上减少首屏时长
    // new HTMLInlineCSSWebpackPlugin({
    //   filter(fileName) {
    //     //! 注意，若是更改了 splitChunks异步加载 的配置
    //     //! 需要过滤掉异步的css文件，否则会导致页面白屏！！！
    //     return !fileName.includes('async');
    //   }
    // })
    
  ],
  mode: 'production'
});
