import { Pulldown } from '@cenk1cenk2/react-template-components'
import { ReactComponent as LogoImage } from '@test-app/assets/img/logo/logo.svg'
import React, { Fragment } from 'react'

export const FrontendTemplate: React.FC = () => {
  return (
    <Fragment>
      {/* <BackgroundImageContainer $url={BackgroundImage}> */}
      <Pulldown package={{ name: CONFIG.package.name, version: CONFIG.package.version }} logo={LogoImage} maxWidth="md" offset={{ x: 0, y: 0 }}>
        some data
      </Pulldown>
      {/* </BackgroundImageContainer> */}
    </Fragment>
  )
}

export default FrontendTemplate
