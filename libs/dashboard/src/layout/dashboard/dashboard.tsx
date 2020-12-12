import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import React, { Fragment, useCallback, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled, { css, useTheme } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { BackendLayoutAnimations, backendLayoutAnimations } from './dashboard.animations'
import { DashboardTemplateActions, DashboardTemplateNavItems, DashboardTemplateNavStates, DashboardTemplateNavTypes } from './dashboard.interface'
import { DashboardLoaded, NavStatesReducer, NavStatesStore, NavTypeStore } from './dashboard.store'
import { DrawerNavigation, DrawerNavigationProps } from './drawer-navigation'
import { Header, HeaderProps } from './header'
import { TabsNavigation } from './tabs-navigation'
import { BaseConfig } from '@cenk1cenk2/react-template-base'
import { MaxWidths, ScrollUpButton } from '@cenk1cenk2/react-template-components'

export interface DashboardTemplateProps {
  maxWidth?: MaxWidths
  package: BaseConfig['package']
  header: Omit<HeaderProps, 'maxWidth' | 'packageName'>
  navigation: {
    type: DashboardTemplateNavTypes
    items?: DashboardTemplateNavItems[]
    drawer?: Omit<DrawerNavigationProps, 'items'>
    tabs?: Omit<DrawerNavigationProps, 'items'>
  }
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = (props) => {
  props = {
    maxWidth: false,
    navigation: {
      type: DashboardTemplateNavTypes.OFF
    },
    ...props
  }

  // states
  const theme = useTheme()
  const [ navType, setNavType ] = useRecoilState(NavTypeStore)
  const [ navState, setNavState ] = useRecoilState(NavStatesStore)
  const setNavStateReducer = useSetRecoilState(NavStatesReducer)
  const [ dashboardLoaded, setDashboardLoaded ] = useRecoilState(DashboardLoaded)

  // handlers
  const handleResize = useDebouncedCallback(
    () => {
      if (window?.innerWidth < theme.breakpoints.values.md) {
        console.info('Screen is not large enough, will use drawer style navigation.')

        // set navigation type to menu type for smaller screens
        setNavType(DashboardTemplateNavTypes.MENU)

        // when screen gets resized to small collapse the navigation

        setNavStateReducer(DashboardTemplateActions['navigation:close'])
      } else {
        // set navigation type to prop type when resized to a larger screen
        if (navType !== props.navigation.type) {
          console.info(`Window is large enough, will use ${props.navigation.type} type navigation.`)
          setNavType(props.navigation.type)
        }

        if (props.navigation.type === DashboardTemplateNavTypes.MENU && props.navigation.drawer?.collapsable) {
          // if intended type is menu, open it, else close it
          setTimeout(() => setNavStateReducer(DashboardTemplateActions['navigation:open']))

          console.debug('Drawer type is collapsable, will open drawer as default.')
        } else if (props.navigation.type === DashboardTemplateNavTypes.MENU && !props.navigation.drawer?.collapsable) {
          // when screen gets resized back expand the navigation
          setTimeout(() => setNavStateReducer(DashboardTemplateActions['navigation:open']))

          console.debug('Drawer type is not collapsable, will open drawer as default.')
        }
      }

      setTimeout(() => setDashboardLoaded(true))
    },
    100,
    { leading: true }
  )

  const handleInit = useCallback(() => {
    handleResize.callback()
  }, [ handleResize ])

  useEffect(() => {
    // handlers
    window.addEventListener('load', handleInit)
    window.addEventListener('resize', handleResize.callback)

    return () => {
      window.removeEventListener('load', handleInit)
      window.removeEventListener('resize', handleResize.callback)
    }
  })

  useEffect(() => {
    // check if window is collapsable or large enought to show the navigation bar
    let navigation: DashboardTemplateNavStates
    if (navState?.state === DashboardTemplateNavStates.OPEN && navType === DashboardTemplateNavTypes.MENU) {
      // decide on state, css makes it laggy
      if (window.innerWidth < theme.breakpoints.values.md) {
        console.debug('Window is not large enough, will use overlay drawer.')

        navigation = DashboardTemplateNavStates.OVERLAY
      } else if (props.navigation.drawer?.collapsable && !navState.mouse) {
        console.debug('Mouseout detected, should collapse the drawer.')

        navigation = DashboardTemplateNavStates.COLLAPSE
      } else {
        console.debug('Window is large enough, drawer should be open normally.')

        navigation = DashboardTemplateNavStates.OPEN
      }

      // set state
    } else if ([ DashboardTemplateNavTypes.HEADER, DashboardTemplateNavTypes.OFF ].includes(navType)) {
      console.debug('Menu type is different should close navigation drawer.')

      navigation = DashboardTemplateNavStates.CLOSE
    }

    if (navigation && navState?.state !== navigation) {
      console.info('Writing state of navigation drawer.', navigation)

      setNavState({ state: navigation })
    }
  })

  const { extendLeft, extendRight, ...propsHeader } = props.header

  const ExtendHeaderLeft: JSX.Element = (
    <Grid container direction="row" alignItems="center" wrap="nowrap">
      <Grid item>
        {props.navigation.type === DashboardTemplateNavTypes.MENU && !props.navigation.drawer.collapsable && (
          <Hidden smDown>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setNavStateReducer(DashboardTemplateActions['navigation:toggle'])
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Hidden>
        )}
      </Grid>
      {extendLeft}
    </Grid>
  )

  const ExtendHeaderRight: JSX.Element = (
    <Grid container direction="row" alignItems="center" wrap="nowrap">
      <Grid item>
        <TabsNavigation items={props.navigation.items} />
      </Grid>
      {extendRight}
      <Grid item>
        {props.navigation?.type !== DashboardTemplateNavTypes.OFF && (
          <Hidden mdUp>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setNavStateReducer(DashboardTemplateActions['navigation:toggle'])
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Hidden>
        )}
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      <Header {...propsHeader} maxWidth={props.maxWidth} extendLeft={ExtendHeaderLeft} extendRight={ExtendHeaderRight} packageName={props.package?.name} />
      <DrawerNavigation {...props.navigation.drawer} items={props.navigation.items} packageVersion={props.package?.version} />
      {dashboardLoaded && <Main className={clsx({ [navState?.state]: navState?.state && navType === DashboardTemplateNavTypes.MENU })}>{props.children}</Main>}
      <ScrollUpButton />
    </Fragment>
  )
}

const Main = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.design.header.headerSizeMin}px;
    padding-top: ${theme.design.header.headerSizeMin * 0.1}px;
    width: inherit;
    height: calc(100% - ${theme.design.header.headerSizeMin}px);
    ${backendLayoutAnimations(BackendLayoutAnimations.DRAWER_COLLAPSE, 'left')}

    &.open {
      left: ${theme.design.navigation.width}px;
    }

    &.collapse {
      left: ${theme.design.navigation.collapseWidth}px;
    }

    &.close {
      left: 0;
    }

    padding: ${theme.spacing(1)}px;
  `
)
