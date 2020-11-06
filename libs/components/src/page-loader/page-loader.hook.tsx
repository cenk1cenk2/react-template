import { Theme } from '@cenk1cenk2/react-template-base'
import nprogress, { NProgress, NProgressOptions } from 'nprogress'
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/server'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { NProgressBar, PageLoader, PageLoaderProps } from './page-loader'

export function useProgress (
  props?: {
    theme: Theme
    useBackdrop?: boolean
    mountOnly?: boolean
    config?: Partial<NProgressOptions>
  } & PageLoaderProps
  // eslint-disable-next-line no-unused-vars
): { done: (force?: boolean) => NProgress, set: (percent: number) => NProgress, isLoading: boolean, status: number } {
  props = {
    mountOnly: true,
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
    if (!isLoading && props.mountOnly) {
      nprogress.done()
    }
  })

  return {
    done: nprogress.done,
    set: nprogress.set,
    isLoading,
    status: nprogress.status ?? 1
  }
}
