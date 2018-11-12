var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'inline-source-map',
  entry: {
    app: './students.ts',
    appStyles: [
      './style.scss',
    ],
    vendor: [
      '@babel/polyfill',
      'jquery'
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',  
    ]
  },
  output: {
    filename: '[name].[chunkhash].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        }
      }      
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node-modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true, 
          "babelCore": "@babel/core", // needed for Babel 7    
          }   
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,             
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=2000',
      },
      {
        test: /\.html$/,  
        loader: 'html-loader'     
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // este esta en ./dist
      template: 'index.html', // este esta en ./
      hash:true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin ({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}