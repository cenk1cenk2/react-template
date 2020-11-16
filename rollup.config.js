const commonjs = require('@rollup/plugin-commonjs')

module.exports = (options) => {
  const extraGlobals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOM',
    'react-router-dom': 'react-router-dom',
    'react-is': 'react-is',
    'styled-components': 'styled',
    '@emotion/core': 'emotionCore',
    '@emotion/styled': 'emotionStyled',
    'react-proptypes': 'react-proptypes',
    'prop-types': 'prop-types',
    recoil: 'recoil',
    clsx: 'clsx',
    nprogress: 'nprogress',
    stream: 'stream',
    'use-debounce': 'use-debounce',
    '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons',
    '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome'
  }

  options.output.globals = Object.assign({}, options.output.globals, extraGlobals)

  options.plugins = options.plugins.filter((o) => !['commonjs'].includes(o.name))

  options.plugins.push(
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef', 'Memo'],
        'node_modules/prop-types/index.js': ['elementType']
      }
    })
  )

  return options
}
