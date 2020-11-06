module.exports = (options) => {
  const extraGlobals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOM',
    'styled-components': 'styled',
    '@emotion/core': 'emotionCore',
    '@emotion/styled': 'emotionStyled'
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
