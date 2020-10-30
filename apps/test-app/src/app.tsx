import { AvailableDesigns, AvailablePalettes, generateTheme } from '@cenk1cenk2/react-template-base'
import { StylesProvider, ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { FrontendTemplate } from './pages/frontend'

const App: React.FC = () => {
  const theme = generateTheme({ palette: AvailablePalettes.DARK, design: AvailableDesigns.DEFAULT })
  return (
    <Fragment>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <Router>
              <CssBaseline />
              {/* <GlobalStyles /> */}
              <Switch>
                <Route path="/frontend" component={FrontendTemplate} />
              </Switch>
            </Router>
          </StyledThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  )
}

export default App
