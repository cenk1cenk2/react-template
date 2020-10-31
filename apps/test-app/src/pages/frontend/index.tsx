import { Pulldown } from '@cenk1cenk2/react-template-components'
import LogoImage from '@test-app/assets/img/logo/logo.svg'
import React, { Fragment } from 'react'

export const FrontendTemplate: React.EFC = () => {
  return (
    <Fragment>
      <Pulldown package={{ name: CONFIG['package-name'], version: CONFIG['package-version'] }} logo={LogoImage} />
    </Fragment>
  )
}

export default FrontendTemplate
