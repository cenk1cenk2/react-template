import nprogress, { NProgress, NProgressOptions } from 'nprogress'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/server'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { NProgressBar, PageLoader, PageLoaderProps } from './page-loader'
import { Theme } from '@cenk1cenk2/react-template-base'

export function useProgress (
  props?: {
    /** Pass in theme variable to theme the render. */
    theme: Theme
    /** Use backdrop or just the loading bar. */
    useBackdrop?: boolean
    /** Control the done process manually. */
    manual?: boolean
    /** Pass in nprogress options to nprogress. */
    config?: Partial<NProgressOptions>
  } & PageLoaderProps
  // eslint-disable-next-line no-unused-vars
): { done: (force?: boolean) => NProgress, set: (percent: number) => NProgress, increment: (percent: number) => NProgress, isLoading: boolean, status: number } {
  props = {
    manual: false,
    useBackdrop: true,
    ...props
  }
  const [ isLoading, setIsLoading ] = useState(true)

  if (isLoading) {
    nprogress.configure({
      ...props.config,
      template: ReactDOM.renderToString(
        <Fragment>
          <StyledThemeProvider theme={props.theme}>
            <NProgressBar />
            {props.useBackdrop && <PageLoader logo={props.logo} />}
          </StyledThemeProvider>
        </Fragment>
      )
    })
    nprogress.start()
  }

  useEffect(() => {
    setIsLoading(false)

    if (!props.manual) {
      nprogress.done()
    }
  })

  return {
    done: nprogress.done.bind(nprogress),
    set: nprogress.set.bind(nprogress),
    increment: nprogress.inc.bind(nprogress),
    isLoading,
    status: nprogress.status ?? 1
  }
}
