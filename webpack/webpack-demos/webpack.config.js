const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, arg) => {
  // console.log('路径--', process.cwd(), 'xx--', process.env.NODE_ENV, 'arg--', arg.mode)
  return {
    entry: {
      bundle1: './main1.js',
      bundle2: './main2.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            "css-hot-loader",
            arg.mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.json', '.css'],
      alias: {
        '@': path.resolve(__dirname, './'),
        src: path.resolve(__dirname, './')
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].css"
      }),
      new HtmlWebpackPlugin({
        //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
        file: 'dist/index.html',
        //打造单页面运用 最后运行的不是这个
        template: './index.html'
      }),

      new OptimizeCSSAssetsPlugin({
        // assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        //cssProcessorOptions: {
        //discardComments: { removeAll: true}
        //}, // cssProcessorOptions可能没起作用，则只需要指定cssProcessorPluginOptions
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }, //对注释的处理
            normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
          }]
        },
        canPrint: true // 是否打印处理过程中的日志
      })
    ],
    optimization: {
      splitChunks: {
        // 打包出来的新的chunk需要满足的最小文件大小，否则不打包，单位B 默认30000
        // minSize: 500,
        cacheGroups: {
          commons: {
            name: 'commons/commons', // 提取出来的文件命名
            // name： ‘common/common’ //  即先生成common文件夹
            // test: '/\.css$/', // 只提取公共css ，命名可改styles 
            // chunks(chunks) {
            //   console.log('chunks--', chunks.entryModule.type)
            //   return 'initial'
            // },
            chunks: 'initial', // initial表示提取入口文件的公共css及js部分
            // chunks: 'all' // 提取所有文件的公共部分
            minChunks: 2, // 表示提取公共部分最少的文件数
            minSize: 0 // 表示提取公共部分最小的大小 
            // 如果发现页面中未引用公共文件，加上enforce: true
          }
        }
      }
    },
    devServer: {
      port: '3101'
    }
  }
}