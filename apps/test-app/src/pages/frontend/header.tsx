import { Pulldown } from '@cenk1cenk2/react-template-components'
import { Header, DrawerNavigation } from '@cenk1cenk2/react-template-dashboard'
import { ReactComponent as LogoImage } from '@test-app/assets/img/logo/logo.svg'
import React, { Fragment } from 'react'
import { RecoilRoot } from 'recoil'

export const FrontendWithHeaderTemplate: React.FC = () => {
  const pkg = { name: CONFIG.package.name, version: CONFIG.package.version }
  return (
    <Fragment>
      <RecoilRoot>
        <Header logo={LogoImage} packageName={pkg.name} headerPosition="static" />
        <DrawerNavigation packageVersion={pkg.version} />
        {/* <BackgroundImageContainer $url={BackgroundImage}> */}
        <Pulldown package={pkg} logo={LogoImage} maxWidth="md" offset={{ x: 0, y: 0 }}>
          some data
        </Pulldown>
        {/* </BackgroundImageContainer> */}
      </RecoilRoot>
    </Fragment>
  )
}

export default FrontendWithHeaderTemplate
