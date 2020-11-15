import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Drawer as BaseDrawer, List, ListItem as BaseListItem, ListItemIcon as BaseListItemIcon, ListItemText as BaseListItemText, Typography, Grid } from '@material-ui/core'
import clsx from 'clsx'
import React, { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import styled, { css } from 'styled-components'
import { useDebounce, useDebouncedCallback } from 'use-debounce'

import { backendLayoutAnimations, BackendLayoutAnimations } from './animations'
import { DashboardTemplateActions, DashboardTemplateNavTypes, DashboardTemplateNavStates, DashboardTemplateNavItems } from './dashboard-template.interface'
import { NavStatesStore, NavTypeStore, NavStatesReducer } from './dashboard-template.store'

export interface DrawerNavigationProps {
  items?: DashboardTemplateNavItems[]
  collapsable?: boolean
  version?: string
}

export const DrawerNavigation: React.FC<DrawerNavigationProps> = (props) => {
  props = {
    items: [],
    collapsable: true,
    ...props
  }

  const setNavStateReducer = useSetRecoilState(NavStatesReducer)

  // handlers
  const handleMouseEnter = useDebouncedCallback(
    () => {
      setNavStateReducer(DashboardTemplateActions['navigation:mouseEnter'])
    },
    100,
    { leading: true }
  )

  const handleMouseLeave = useDebouncedCallback(
    () => {
      setNavStateReducer(DashboardTemplateActions['navigation:mouseLeave'])
    },
    100,
    { leading: true }
  )

  // states
  const navType = useRecoilValue(NavTypeStore)
  const [ navState, setNavState ] = useRecoilState(NavStatesStore)
  const location = useLocation()

  useEffect(() => {
    setNavState(props.collapsable ? { state: DashboardTemplateNavStates.COLLAPSE } : { state: DashboardTemplateNavStates.OPEN })
  }, [ setNavState ])

  return (
    <Fragment>
      <Menu
        anchor="left"
        open={navType === DashboardTemplateNavTypes.MENU}
        variant="permanent"
        elevation={4}
        className={clsx(navState.state)}
        onMouseEnter={() => handleMouseEnter.callback()}
        onMouseLeave={() => handleMouseLeave.callback()}
      >
        <Grid container direction="column" alignContent="space-between" style={{ height: '100%' }}>
          <Grid item xs={true} style={{ width: '100%' }}>
            <List>
              {props.items?.map((item) => {
                return (
                  <Fragment key={item.url}>
                    <ListItem selected={item.url === location.pathname} button alignItems="center">
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} className={clsx(navState.state)} primaryTypographyProps={{ variant: 'h3' }} />
                    </ListItem>
                  </Fragment>
                )
              })}
            </List>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            {props.version && (
              <VersionField>
                <Typography variant="h6" align="center">
                  <small>v{props.version}</small>
                </Typography>
              </VersionField>
            )}
          </Grid>
        </Grid>
      </Menu>
    </Fragment>
  )
}

const ListItem = styled(BaseListItem)(
  ({ theme }) => css`
    margin: auto;
    height: calc(${theme.typography.h3.fontSize} * 2);
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
    min-width: ${theme.design.navigation.collapseWidth - theme.spacing(3)}px;
    padding-left: ${theme.spacing(1)}px;
    font-size: ${theme.typography.h4.fontSize};
    color: ${theme.palette.text.secondary};
  `
)

const ListItemText = styled(BaseListItemText)(
  ({ theme }) => css`
  opacity: 1;
  color: ${theme.palette.text.secondary};
  ${backendLayoutAnimations(BackendLayoutAnimations.DRAWER_COLLAPSE, 'opacity')}

  .collapse& {
    opacity: 0;
  }

  .close& {
    opacity: 0
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
  `
)
