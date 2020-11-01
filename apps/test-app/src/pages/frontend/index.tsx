import { Pulldown, BackgroundImageContainer } from '@cenk1cenk2/react-template-components'
import BackgroundImage from '@test-app/assets/img/bg.jpg'
import LogoImage from '@test-app/assets/img/logo/logo.svg'
import { CONFIG } from 'apps/test-app/types/config'
import React, { Fragment } from 'react'

export const FrontendTemplate: React.EFC = () => {
  return (
    <Fragment>
      <BackgroundImageContainer $url={BackgroundImage}>
        <Pulldown package={{ name: CONFIG.package.name, version: CONFIG.package.version }} logo={LogoImage} maxWidth="md" offset={{ x: 0, y: 0 }}>
          some data
        </Pulldown>
      </BackgroundImageContainer>
    </Fragment>
  )
}

export default FrontendTemplate
