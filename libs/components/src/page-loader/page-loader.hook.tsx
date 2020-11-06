import { Theme } from '@cenk1cenk2/react-template-base'
import nprogress, { NProgress, NProgressOptions } from 'nprogress'
import React, { Fragment, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { NProgressBar, PageLoader } from './page-loader'

export function useProgress(options?: {
  theme: Theme
  useBackdrop?: boolean
  mountOnly?: boolean
  config?: Partial<NProgressOptions>
  // eslint-disable-next-line no-unused-vars
}): { done: (force?: boolean) => NProgress; isLoading: boolean; status: number } {
  options = {
    mountOnly: true,
    useBackdrop: true,
    ...options
  }
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    nprogress.configure({
      ...options.config,
      template: renderToString(
        <Fragment>
          <StyledThemeProvider theme={options.theme}>
            <NProgressBar />
            {options.useBackdrop && <PageLoader />}
          </StyledThemeProvider>
        </Fragment>
      )
    })
    nprogress.start()
  }

  useEffect(() => {
    setIsLoading(false)
    if (!isLoading && options.mountOnly) {
      nprogress.done()
    }
  })

  return {
    done: nprogress.done,
    isLoading,
    status: nprogress.status ?? 1
  }
}
