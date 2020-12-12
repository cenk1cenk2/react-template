import { Hidden, Tab, Tabs as BaseTabs, useTheme } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled, { css } from 'styled-components'

import { DashboardTemplateNavItems, DashboardTemplateNavTypes } from './dashboard.interface'
import { NavTypeStore } from './dashboard.store'
import { MaxWidths } from '@cenk1cenk2/react-template-components'

export interface TabsNavigationProps {
  threshold?: MaxWidths
  items?: DashboardTemplateNavItems[]
}

export const TabsNavigation: React.FC<TabsNavigationProps> = (props) => {
  props = {
    ...props
  }
  // states
  const location = useLocation()
  const theme = useTheme()
  const navType = useRecoilValue(NavTypeStore)

  return (
    <Fragment>
      <Hidden smDown>
        {navType === DashboardTemplateNavTypes.HEADER && (
          <Tabs
            value={location.pathname}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            style={{ marginLeft: theme.spacing(2), marginRight: theme.spacing(2) }}
          >
            {props.items?.map((item) => {
              return <Tab label={item.name} icon={item.icon} value={item.url} key={item.url} />
            })}
          </Tabs>
        )}
      </Hidden>
    </Fragment>
  )
}

const Tabs = styled(BaseTabs)(
  ({ theme }) => css`
    .MuiTab-root {
      line-height: ${theme.design.header.headerSizeMin / 2 + theme.spacing(1) / 2}px;
      height: ${theme.design.header.headerSizeMin}px;
    }

    .MuiTab-labelIcon {
      min-height: 0px;
      padding-top: 0;

      .MuiTab-wrapper {
        svg {
          font-size: ${theme.design.header.headerSizeMin / 2 - theme.spacing(4)}px !important;
        }

        font-family: ${theme.typography.h1.fontFamily};
        font-size: ${theme.design.header.headerSizeMin / 2 - theme.spacing(1)}px;
        font-weight: 700;

        > *:first-child {
          margin-top: ${theme.spacing(1)}px;
          margin-bottom: 0;
        }
      }
    }
  `
)
