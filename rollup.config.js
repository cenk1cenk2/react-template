module.exports = (options) => {
  const extraGlobals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOM',
    'react-router-dom': 'react-router-dom',
    'styled-components': 'styled',
    '@emotion/core': 'emotionCore',
    '@emotion/styled': 'emotionStyled',
    recoil: 'recoil',
    clsx: 'clsx',
    nprogress: 'nprogress',
    stream: 'stream',
    'use-debounce': 'use-debounce',
    '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons',
    '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome'
  }

  if (Array.isArray(options.output)) {
    options.output.forEach((o) => {
      o.globals = Object.assign({}, o.globals, extraGlobals)
    })
  } else {
    options.output.globals = Object.assign({}, options.output.globals, extraGlobals)
  }

  return options
}
