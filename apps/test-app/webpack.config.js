const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// can add workspace here as well
module.exports = (config, workspace) => {
  const options = workspace.options ? workspace.options : workspace.buildOptions
  process.env.NODE_CONFIG_DIR = path.join(options.cwd, 'config')

  return merge(config, {
    devtool: 'eval-source-map',
    stats: 'minimal',
    devServer: {
      hot: true
    },
    output: {
      filename: '[name].[hash:8].js',
      sourceMapFilename: '[name].[hash:8].js.map',
      chunkFilename: '[id].[hash:8].js'
    },
    module: {
      rules: [
        {
          test: /index\.html$/,
          loader: 'html?attrs=link:href'
        },
        {
          test: /\.svg$/,
          use: [ '@svgr/webpack', 'url-loader' ]
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/img/[hash:24].[ext]'
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  '@babel/proposal-class-properties',
                  '@babel/proposal-object-rest-spread',
                  'babel-plugin-styled-components',
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      absoluteRuntime: false,
                      helpers: true,
                      corejs: 3,
                      regenerator: true,
                      useESModules: true
                    }
                  ]
                ],
                presets: [
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'entry',
                      corejs: 3,
                      targets: {
                        ie: '11'
                      }
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ErrorOverlayPlugin(),
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(require('config').util.toObject())
      })
    ],
    node: {
      process: 'mock'
    }
  })
}
