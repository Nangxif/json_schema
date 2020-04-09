const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: '../packages/json-schema/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'), //输出路径，就是上步骤中新建的dist目录，
    publicPath: '/dist/',
    filename: 'jsonSchema.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // 分离css
        // options: {
        //   extractCSS: true
        // }
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 指示babel做怎么样的兼容性处理
          // js兼容性处理：babel-loader  @babel/core  @babel/preser-env
          // 1.基本兼容性处理-->@babel/preset-env
          // 问题：只能转换基础语法,promise不能转换
          // 2.全部js兼容性处理 -->@babel/polyfill,需要先安装，然后在js手动引入
          // 问题：体积太大
          // 3.按需加载-->core-js先下载再配制
          // 这里直接做基础的兼容就可以了，因为用core-js的话，到时候别人在用这个插件的时候，也会导入core-js进行构建，这样就重复了
          presets: [['@babel/preset-env']]
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts'
        }
      }
    ]
  },
  externals: {
    vue: 'vue',
    'element-ui': 'element-ui',
    lodash: 'lodash'
  },
  // source-map-explorer .\dist\jsonSchema.min.js 可以打开可视化图表看看你打的包的架构
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/common.css'
    })
  ],
  mode: 'production'
};
