const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// can add workspace here as well
module.exports = (config, workspace) => {
  const options = workspace.options ? workspace.options : workspace.buildOptions
  process.env.NODE_CONFIG_DIR = path.join(options.cwd, 'config')

  return merge(config, {
    devtool: 'source-map',
    stats: 'minimal',
    output: {
      filename: '[name].[hash:8].js',
      sourceMapFilename: '[name].[hash:8].map',
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
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                dimensions: true,
                replaceAttrValues: {
                  '#ff00ff': 'currentColor',
                  '#f0f': 'currentColor'
                }
              }
            }
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: path.join(__dirname, '/dist/images/'),
                name: '[identifier]_[hash:7].[ext]'
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
