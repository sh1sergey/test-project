const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  entry: ['./src/core/main.js', './src/core/main.scss'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: argv.mode === 'development' && 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|woff2?|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 8192
          }
        }
      },

      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-default-from'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: './src/core/index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/server': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/server': '' }
      }
    }
  }
});
