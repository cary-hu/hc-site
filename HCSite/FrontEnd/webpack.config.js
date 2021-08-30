const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const wwwrootDir = path.resolve(__dirname, "../", "wwwroot");
module.exports = {
  cache: false,
  entry: {
    index: "./src/pages/index.ts",
    indexStyle: "./src/style/index.less"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "tty": false,
      "os": false,
      "assert": false,
      "url": false,
      "util": false,
      "tty": false,
      "async_hooks": false
    }
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: "bluebird",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new MonacoWebpackPlugin()
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(wwwrootDir),
    publicPath: "/dist/"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
