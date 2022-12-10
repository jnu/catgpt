const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    port: 8181,
    historyApiFallback: true,
    hot: true,
    allowedHosts: 'auto',
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
      reconnect: 20,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CatGPT3',
    }),
  ].concat(PROD ? [
    new MiniCssExtractPlugin({filename: 'kindle.[fullhash].css'})
  ] : []),
  output: {
    filename: PROD ? 'kindle.[chunkhash].js' : 'kindle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: PROD,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
};
