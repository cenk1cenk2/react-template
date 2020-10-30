const path = require('path')
const merge = require('webpack-merge')

// can add workspace here as well
module.exports = (config) => {
  return merge(config, {
    devServer: {
      disableHostCheck: true
    },
    stats: 'minimal',
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
    plugins: []
  })
}
