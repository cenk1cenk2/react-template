import { AvailableDesigns, AvailablePalettes, generateTheme, GlobalStyles } from '@cenk1cenk2/react-template-base'
import { StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { FrontendTemplate } from './pages/frontend'

// eslint-disable-next-line no-undef
const App: React.FC = () => {
  const history = createBrowserHistory()
  const theme = generateTheme({ palette: AvailablePalettes.DARK, design: AvailableDesigns.DEFAULT })

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          <CssBaseline />
          <Router history={history}>
            <Switch>
              <Route path="/frontend" component={FrontendTemplate} />
            </Switch>
          </Router>
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
