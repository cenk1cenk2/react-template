import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fab from '@material-ui/core/Fab'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

export const ScrollUpButton: React.FC = () => {
  const scrollUp = () => window.scrollTo(0, 0)
  const theme = useTheme()

  const [ show, setShow ] = useState(false)
  // listeners
  const handleScroll = useDebouncedCallback(
    () => {
      if (window.pageYOffset < theme.design.header.headerSizeMin / 2) {
        setShow(false)
      } else {
        setShow(true)
      }
    },
    100,
    { leading: true }
  )

  const handleInit = useCallback(() => {
    handleScroll.callback()
  }, [ handleScroll ])

  useEffect(() => {
    window.addEventListener('load', handleInit)
    window.addEventListener('scroll', handleScroll.callback)

    return () => {
      window.removeEventListener('load', handleInit)
      window.removeEventListener('scroll', handleScroll.callback)
    }
  }, [ handleScroll, window ])

  return (
    <Fragment>
      {show && (
        <Fab
          color="primary"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 100000
          }}
          onClick={() => {
            scrollUp()
            setShow(false)
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </Fab>
      )}
    </Fragment>
  )
}
