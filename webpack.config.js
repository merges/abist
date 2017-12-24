const hash = require('node-object-hash')({sort: false}).hash;
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  if (!env) {
    env = {};
  }
  
  const nodeEnv = process.env.NODE_ENV || env.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';
  
  let common = {
    target: 'web',
    entry: {
      index: path.join(__dirname, './src/index.js'),
    },

    output: {
      path: path.join(__dirname, './prod'),
      filename: '[name].js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: 'file-loader?name=[name].[ext]',
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            'file-loader?name=styles.css',
            'extract-loader',
            {
              loader: 'css-loader',
              options: {
                import: false,
              },
            },
            'sass-loader',
          ]
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  'targets': {
                    'browsers': ['last 2 versions']
                  }
                }
              ],
              'react',
              'stage-0',
            ]
          },
        },
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),
      // Create index.html.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        filename: 'index.html',
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets',
      }]),
      // Create external dependencies bundle.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks(module, count) {
          let context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),
      // Delete cache: node_modules/.cache/hard-source/*
      new HardSourceWebpackPlugin({
        configHash: (webpackConfig) => {
          let hashedConfig = hash(webpackConfig);
          return hashedConfig + nodeEnv;
        },
      }),
    ],
  };

  if (isProduction) {
    common.plugins.push(new webpack.optimize.UglifyJsPlugin());
    return [
      common,
      {
        entry: {
          server: path.join(__dirname, './server.js'),
        },
        output: {
          path: path.join(__dirname, './prod'),
          filename: '[name].js',
        },
        target: 'node',
      },
    ];
  }
  else {
    common.devtool = 'eval-source-map';  // Necessary for incremental builds.
    common.devServer = {
      historyApiFallback: true,
    };
    return common;
  }
};