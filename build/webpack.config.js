const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: "../packages/json-schema/index.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"), //输出路径，就是上步骤中新建的dist目录，
    publicPath: "/dist/",
    filename: "jsonSchema.min.js",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
        // 分离css
        // options: {
        //   extractCSS: true
        // }
      },
      { test: /\.(scss|sass)$/, loader: "style-loader!css-loader!sass-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  mode: "production"
};
