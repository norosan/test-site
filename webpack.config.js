const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename:'javascripts/main.js',
  },
  module: {
    rules:[
      {
        test: /\.css/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
          loader: 'css-loader',
          },
        ],
      },
      {
      test: /\.(png|jpeg|jpg)/,
      //ここはwebpack5の場合以下を追記,use以下は削除する(file-loader,url-loaderは不要なので削除できるnpm uninstall file-loader url-loadr)
      //type:'asset/resource',
      //generator: (
      //   filename: 'images/[name][ext]'
      // ),
      use:[
         {
          loader:'file-loader',
          options: {
            esModule: false, //これは入れる詳しくはdocumentationを探す
            name: 'images/[name].[ext]',//[ext]はextentionの略
          },
         },
        ],
      },
      {
        test:/\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty:true,
            }
          },
       ],
      },
    ],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/templates/access.pug',
    //   filename: 'access.html',
    // }),
    new CleanWebpackPlugin(),
  ],
}