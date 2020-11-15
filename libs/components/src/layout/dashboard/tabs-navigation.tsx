import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs as BaseTabs, Tab, useTheme, Hidden } from '@material-ui/core'
import React, { Component, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled, { css } from 'styled-components'

import { MaxWidths } from '../../interfaces'
import { DashboardTemplateNavItems, DashboardTemplateNavTypes } from './dashboard.interface'
import { NavStatesReducer, NavStatesStore, NavTypeStore } from './dashboard.store'

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
      line-height: ${theme.typography.h2.fontSize};
    }

    .MuiTab-labelIcon {
      min-height: 30px;
      padding-top: 0;

      .MuiTab-wrapper {
        svg {
          font-size: ${theme.typography.h4.fontSize} !important;
        }

        font-family: ${theme.typography.h1.fontFamily};
        font-size: ${theme.typography.h4.fontSize};

        > *:first-child {
          margin-bottom: 0;
        }
      }
    }
  `
)
