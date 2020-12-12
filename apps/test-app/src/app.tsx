import { AvailableDesigns, AvailablePalettes, generateTheme, GlobalStyles } from '@cenk1cenk2/react-template-base'
import { useProgress } from '@cenk1cenk2/react-template-page-loader'
import { StylesProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import LogoImage from '@test-app/assets/img/logo/logo.svg'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { Dashboard } from './pages/dashboard'
import { FrontendTemplate } from './pages/frontend'
import { TypographyPage } from './pages/typography'

const App: React.FC = () => {
  const history = createBrowserHistory()
  const theme = generateTheme({ palette: AvailablePalettes.DARK, design: AvailableDesigns.DEFAULT })
  useProgress({ theme, logo: LogoImage })

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          <CssBaseline />
          <Router history={history}>
            <Switch>
              <Route path="/frontend" component={FrontendTemplate} />
              <Route path="/frontend-header" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/typography" component={TypographyPage} />
            </Switch>
          </Router>
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
