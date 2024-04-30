const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devTool = devMode ? 'inline-source-map' : undefined;
const devServer = devMode ? { static: path.resolve(__dirname, './dist') } : undefined;
const folder = 'dist';

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  mode: mode,
  devtool: devTool,
  devServer: devServer,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              defaultExport: true,
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.tsx$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, `./${folder}`),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      // favicon: path.resolve(__dirname, './src/favicon.ico'),
    }),
    new EslintPlugin({ extensions: 'ts' }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/images'), to: path.resolve(__dirname, `./${folder}/images`) },
      ],
    }),
  ],
};
