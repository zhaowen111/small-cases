const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const config = {
    entry: {
      case29: './src/case-29-会动的代码/index.js',
      case37: './src/case-37-封装dom库/index.js',
      case38: './src/case-38-封装dom库(jquery)/index.js',
      case39: './src/case-39/ObjectUtils.js',
      case40: './src/case-40-事件流与委托/index.js',
      case42: './src/case-42-fulgens导航/index.js',
      case46: './src/case-46-异步与promise/async-test.js',
      vendor: ['./src/lib/utils.js', './src/lib/dom.js']
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    mode: env.prod ? 'production' : 'development',
    devServer: {
      contentBase: './dist'
    },

    module: {
      rules: [
        {
          test: /\.(sass|scss|css)$/i,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    optimization: {
      runtimeChunk: 'single', //提取内置引导模板到单个文件
      moduleIds: 'deterministic', //将每个chunk的moduleId设置为固定的，这样添加新的包不会因为id变化引起未变更包的hash刷新
      splitChunks: {
        //提取第三方包到单独的vendor chunk
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          common: {
            test: /\.\/src\/lib/,
            name: 'common',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'case-29-会动的代码/index.html', //生成文件目录+文件名
        template: './src/case-29-会动的代码/index.html', //html模板位置，合法的html文件都可以使用
        chunks: ['case29'] //指定只使用那个chunk，名字为entry中对应chunk的key
      }),
      new HtmlWebpackPlugin({
        filename: 'case-37-封装dom库/index.html',
        template: './src/case-37-封装dom库/index.html',
        chunks: ['case37']
      }),
      new HtmlWebpackPlugin({
        filename: 'case-38-封装dom库(jquery)/index.html',
        template: './src/case-38-封装dom库(jquery)/index.html',
        chunks: ['case38']
      }),
      new HtmlWebpackPlugin({
        filename: 'case-40-事件流与委托/index.html',
        template: './src/case-40-事件流与委托/index.html',
        chunks: ['case40']
      }),
      new HtmlWebpackPlugin({
        filename: 'case-42-fulgens导航/index.html',
        template: './src/case-42-fulgens导航/index.html',
        chunks: ['case42']
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: []
      })
    ]
  };

  if (!env.prod) {
    Object.assign(config, {
      devtool: 'inline-source-map'
    });
  }
  return config;
};
