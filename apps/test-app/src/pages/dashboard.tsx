import { DashboardTemplate, DashboardTemplateNavTypes } from '@cenk1cenk2/react-template-components'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as LogoImage } from '@test-app/assets/img/logo/logo.svg'
import React, { Fragment } from 'react'
import { RecoilRoot } from 'recoil'

export const Dashboard: React.FC = () => {
  const pkg = { name: CONFIG.package.name, version: CONFIG.package.version }
  return (
    <Fragment>
      <RecoilRoot>
        <DashboardTemplate
          package={pkg}
          header={{ logo: LogoImage, transperent: false }}
          navigation={{
            type: DashboardTemplateNavTypes.MENU,
            drawer: {
              collapsable: true
            },
            items: [
              {
                icon: <FontAwesomeIcon icon={faBars} />,
                name: 'TEST',
                url: '/dashboard'
              }
            ]
          }}
        >
          test ediyorum
        </DashboardTemplate>
        {/* </BackgroundImageContainer> */}
      </RecoilRoot>
    </Fragment>
  )
}

export default Dashboard