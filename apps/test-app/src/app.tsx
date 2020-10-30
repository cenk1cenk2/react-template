import React, { Fragment } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { FrontendTemplate } from './pages/frontend'

const App: React.FunctionComponent = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/frontend" component={FrontendTemplate} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
