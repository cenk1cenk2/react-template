import { BottomLogo } from '@cenk1cenk2/react-template-components'
import React, { Fragment } from 'react'
import { ThemeConsumer, withTheme } from 'styled-components'

import LogoImage from './test.svg'

export const FrontendTemplate: React.FC = () => {
  return (
    <Fragment>
      asdadas
      <BottomLogo package={{ name: 'test', version: 'test' }} logo={Logo} />
    </Fragment>
  )
}

export default FrontendTemplate

const Logo: React.FC = () => {
  return <LogoImage />
}
