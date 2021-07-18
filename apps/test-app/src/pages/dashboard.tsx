import { DashboardTemplate, DashboardTemplateNavTypes } from '@cenk1cenk2/react-template-dashboard'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@material-ui/core'
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
            type: DashboardTemplateNavTypes.HEADER,
            drawer: {
              collapsable: false
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
          <Typography variant="body1">test ediyorum</Typography>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          test
        </DashboardTemplate>
        {/* </BackgroundImageContainer> */}
      </RecoilRoot>
    </Fragment>
  )
}

export default Dashboard
