import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Drawer as BaseDrawer, List, ListItem as BaseListItem, ListItemIcon as BaseListItemIcon, ListItemText as BaseListItemText } from '@material-ui/core'
import clsx from 'clsx'
import React, { Fragment, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import styled, { css } from 'styled-components'
import { useDebounce, useDebouncedCallback } from 'use-debounce'

import { backendLayoutAnimations, BackendLayoutAnimations } from './animations'
import { DashboardTemplateActions, DashboardTemplateNavTypes, DashboardTemplateNavStates } from './dashboard-template.interface'
import { DashboardTemplateNavStatesStore, DashboardTemplateNavTypeStore, DashboardTemplateNavStatesReducer } from './dashboard-template.store'

export interface DrawerNavigationProps {
  items?: any[]
  collapsable?: boolean
}

export const DrawerNavigation: React.FC<DrawerNavigationProps> = (props) => {
  props = {
    items: [],
    collapsable: true,
    ...props
  }

  const setNavStateReducer = useSetRecoilState(DashboardTemplateNavStatesReducer)

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
  const navType = useRecoilValue(DashboardTemplateNavTypeStore)
  const [ navState, setNavState ] = useRecoilState(DashboardTemplateNavStatesStore)

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
        asd
        <List>
          {props.items?.map((item) => {
            return (
              <Fragment key={item.url}>
                <ListItem button>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} className="h6" disableTypography />
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Menu>
    </Fragment>
  )
}

const ListItem = styled(BaseListItem)(
  ({ theme }) => css`
    :hover {
      .MuiListItemIcon-root {
        color: ${theme.palette.text.primary};
      }
    }
  `
)

const ListItemIcon = styled(BaseListItemIcon)(
  ({ theme }) => css`
    min-width: calc(${theme.design.navigation.collapseWidth} - ${theme.spacing(2)}px + 1px);
    padding-left: calc(${theme.spacing(1)}px / 2);
    font-size: calc((${theme.design.navigation.collapseWidth} - ${theme.spacing(4)}px) / 1.5);
    color: ${theme.palette.text.secondary};
  `
)

const ListItemText = styled(BaseListItemText)(({ theme }) => css``)

const Menu = styled(BaseDrawer)(
  ({ theme }) => css`
    .MuiPaper-root {
      width: 0;
      top: ${theme.design.header.headerSizeMin}px;
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
