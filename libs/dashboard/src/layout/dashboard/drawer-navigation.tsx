import { Drawer as BaseDrawer, Grid, List, ListItem as BaseListItem, ListItemIcon as BaseListItemIcon, ListItemText as BaseListItemText, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { Fragment, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled, { css } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { backendLayoutAnimations, BackendLayoutAnimations } from './dashboard.animations'
import { DashboardTemplateActions, DashboardTemplateNavItems, DashboardTemplateNavStates, DashboardTemplateNavTypes } from './dashboard.interface'
import { DashboardLoaded, NavStatesReducer, NavStatesStore, NavTypeStore } from './dashboard.store'

export interface DrawerNavigationProps {
  items?: DashboardTemplateNavItems[]
  collapsable?: boolean
  packageVersion?: string
}

export const DrawerNavigation: React.FC<DrawerNavigationProps> = (props) => {
  props = {
    items: [],
    collapsable: true,
    ...props
  }

  // states
  const navType = useRecoilValue(NavTypeStore)
  const [ navState, setNavState ] = useRecoilState(NavStatesStore)
  const location = useLocation()
  const setNavStateReducer = useSetRecoilState(NavStatesReducer)
  const dashboardLoaded = useRecoilValue(DashboardLoaded)

  // handlers
  const handleMouseEnter = useDebouncedCallback(
    () => {
      if (props.collapsable && navState.state === DashboardTemplateNavStates.COLLAPSE) {
        setNavStateReducer(DashboardTemplateActions['navigation:mouseEnter'])
      }
    },
    100,
    { leading: true }
  )

  const handleMouseLeave = useDebouncedCallback(
    () => {
      if (props.collapsable && navState.state === DashboardTemplateNavStates.OPEN) {
        setNavStateReducer(DashboardTemplateActions['navigation:mouseLeave'])
      }
    },
    100,
    { leading: true }
  )

  useEffect(() => {
    setNavState(props.collapsable ? { state: DashboardTemplateNavStates.COLLAPSE } : { state: DashboardTemplateNavStates.OPEN })
  }, [ setNavState ])

  return (
    <Fragment>
      {dashboardLoaded && (
        <Menu
          anchor="left"
          open={navType === DashboardTemplateNavTypes.MENU}
          variant="permanent"
          elevation={4}
          className={clsx(navState?.state)}
          onMouseEnter={() => handleMouseEnter.callback()}
          onMouseLeave={() => handleMouseLeave.callback()}
          PaperProps={{}}
        >
          <Grid container direction="column" alignContent="space-between" style={{ height: '100%' }}>
            <Grid item xs={true} style={{ width: '100%' }}>
              <List>
                {props.items?.map((item) => {
                  return (
                    <Fragment key={item.url}>
                      <Link
                        to={item.url}
                        onClick={() => navState.state === DashboardTemplateNavStates.OVERLAY && setNavStateReducer(DashboardTemplateActions['navigation:toggle'])}
                      >
                        <ListItem selected={item.url === location.pathname} button alignItems="center">
                          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                          <ListItemText primary={item.name} className={clsx(navState?.state)} disableTypography />
                        </ListItem>
                      </Link>
                    </Fragment>
                  )
                })}
              </List>
            </Grid>
            <Grid item style={{ width: '100%' }}>
              {props.packageVersion && (
                <VersionField className={clsx(navState?.state)}>
                  <Typography variant="body2" align="center">
                    <small>v{props.packageVersion}</small>
                  </Typography>
                </VersionField>
              )}
            </Grid>
          </Grid>
        </Menu>
      )}
    </Fragment>
  )
}

const ListItem = styled(BaseListItem)(
  ({ theme }) => css`
    margin: auto;
    height: ${theme.design.navigation.collapseWidth / 2 + theme.spacing(3)}px;
    :hover {
      .MuiListItemIcon-root {
        color: ${theme.palette.text.primary} !important;
      }

      .MuiListItemText-root {
        color: ${theme.palette.text.primary} !important;
      }
    }
  `
)

const ListItemIcon = styled(BaseListItemIcon)(
  ({ theme }) => css`
    min-width: ${theme.design.navigation.collapseWidth / 2 + theme.spacing(1)}px;
    align-items: center;
    padding-left: ${theme.spacing(1) / 2}px;
    font-size: ${theme.design.navigation.collapseWidth / 2 - theme.spacing(1) / 2}px;
    color: ${theme.palette.text.secondary};
  `
)

const ListItemText = styled(BaseListItemText)(
  ({ theme }) => css`
    opacity: 1;
    color: ${theme.palette.text.secondary};
    font-size: ${theme.design.navigation.collapseWidth / 2 - theme.spacing(1) / 2}px;
    font-weight: ${theme.typography.h1.fontWeight};
    font-family: ${theme.typography.h1.fontFamily};
    line-height: 0;
    letter-spacing: 0.025em;

    ${backendLayoutAnimations(BackendLayoutAnimations.DRAWER_COLLAPSE, 'opacity')}

    .collapse& {
      opacity: 0;
    }

    .close& {
      opacity: 0;
    }
  `
)

const Menu = styled(BaseDrawer)(
  ({ theme }) => css`
    .MuiPaper-root {
      width: 0;
      top: ${theme.design.header.headerSizeMin}px;
      height: calc(100% - ${theme.design.header.headerSizeMin}px);
      padding-top: ${theme.spacing(1)}px;
      white-space: nowrap;
      overflow: hidden;
      z-index: 1100;
      ${backendLayoutAnimations(BackendLayoutAnimations.DRAWER_COLLAPSE, 'width')}

      .open& {
        width: ${theme.design.navigation.width}px;
      }

      .overlay& {
        width: 100%;
      }

      .collapse& {
        width: ${theme.design.navigation.collapseWidth}px;
      }

      .close& {
        width: 0;
      }
    }

    .MuiDrawer-paperAnchorDockedLeft {
      border-right: 0;
    }

    .MuiDrawer-paperAnchorDockedRight {
      border-left: 0;
    }
  `
)

const VersionField = styled.div(
  ({ theme }) => css`
    padding-bottom: ${theme.spacing(2)}px;
    padding-top: ${theme.spacing(2)}px;
    color: ${theme.palette.grey[600]};
    opacity: 1;
    ${backendLayoutAnimations(BackendLayoutAnimations.DRAWER_COLLAPSE, 'opacity')}

    .collapse& {
      opacity: 0;
    }

    .close& {
      opacity: 0;
    }
  `
)
