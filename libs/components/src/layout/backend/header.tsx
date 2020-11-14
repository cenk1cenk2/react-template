import { BaseConfig } from '@cenk1cenk2/react-template-base'
import { CastEvent } from '@cenk1cenk2/react-template-components'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar as BaseAppBar, Button, Grid, Hidden, Toolbar as BaseToolbar, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { Fragment, SVGProps, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css, useTheme } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { BackendLayoutAnimations, backendLayoutAnimations } from './animations'
import { DashboardTemplateNavItems } from './index.interface'

// import { TabsNavigation } from './tabs-navigation'

export type HeaderProps = {
  transperent?: boolean
  narrow?: boolean
  extendLeft?: React.FC
  extendRight?: React.FC
  items?: DashboardTemplateNavItems[]
  logo: React.FC<SVGProps<SVGSVGElement>> | string
} & BaseConfig

export const Header: React.FC<HeaderProps> = (props) => {
  props = {
    ...{
      transperent: true,
      narrow: false
    },
    ...props
  }

  const theme = useTheme()

  const [ solidHeader, setSolidHeader ] = useState(props.transperent)

  const handleScroll = useDebouncedCallback(
    (e: CastEvent<Window>) => {
      if (e.target.pageYOffset > theme.design.header.headerSizeMin) {
        setSolidHeader(true)
      } else {
        setSolidHeader(false)
      }
    },
    100,
    { leading: true }
  )

  const initiateHandle = useCallback((e: CastEvent<Window>) => {
    handleScroll.callback(e)
  }, [])

  useEffect(() => {
    window.addEventListener('load', initiateHandle)
    window.addEventListener('wheel', handleScroll.callback)

    return () => {
      window.removeEventListener('load', initiateHandle)
      window.removeEventListener('wheel', handleScroll.callback)
    }
  }, [ handleScroll ])

  return (
    <Fragment>
      <Fragment>
        <AppBar
          position="sticky"
          color="transparent"
          // && context.navigation.state !== DashboardTemplateNavStates.overlay
          className={clsx({ 'reset-shadow': props?.transperent && !solidHeader })}
        >
          <Toolbar
            className={clsx({
              'transperent-toolbar': props?.transperent && !solidHeader,
              // && context.navigation.state !== DashboardTemplateNavStates.overlay,
              'narrow-toolbar': props.narrow
            })}
          >
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2} wrap="nowrap">
              <LogoField>
                <Grid item>
                  <Link to="/">
                    <Grid container direction="row" alignItems="center" wrap="nowrap">
                      <Logo>
                        <props.logo height="100%" width="100%" />
                      </Logo>
                      <Title>
                        <Typography variant="h2">{props.package.name}</Typography>
                      </Title>
                    </Grid>
                  </Link>
                </Grid>
              </LogoField>
              {props?.extendLeft && <props.extendLeft />}
              {/* {context.navigation?.type === DashboardTemplateNavTypes.menu && ( */}
              <Fragment>
                <Hidden mdUp>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      // context.dispatch({ type: DashboardTemplateActions['navigation:toggle'] })
                    }}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </Button>
                </Hidden>
              </Fragment>
              {/* // )} */}
              {/* {context.navigation?.type === DashboardTemplateNavTypes.header && (
                <Fragment>
                  <TabsNavigation items={this.props.items} />
                </Fragment>
              )} */}
              {props?.extendRight && <props.extendRight />}
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
    </Fragment>
  )
}

const AppBar = styled(BaseAppBar)(
  ({ theme }) => css`
    overflow: hidden;

    .MuiToolbar-gutters {
      padding-left: ${theme.spacing(2)}px;
      padding-right: ${theme.spacing(2)}px;
    }

    .transperent-toolbar {
      background-color: transparent;
    }

    .narrow-toolbar {
      ${theme.breakpoints.up('lg')} {
        &.MuiToolbar-gutters {
          padding-left: calc((100% - ${theme.breakpoints.values.lg}px) / 2);
          padding-right: calc((100% - ${theme.breakpoints.values.lg}px) / 2);
        }
      }
    }
  `
)

const Toolbar = styled(BaseToolbar)(
  () => css`
    ${backendLayoutAnimations(BackendLayoutAnimations.HEADER_TRANSPARENCY, 'background-color')}
  `
)

const LogoField = styled.div(
  ({ theme }) => css`
    ${theme.breakpoints.up('xs')} {
      min-width: ${theme.design.header.logoFieldWidth}px;
    }
  `
)

const Title = styled.div(
  () => css`
    font-weight: 700;
    line-height: 0;
  `
)

const Logo = styled.div(
  ({ theme }) => css`
    width: ${theme.typography.h1.fontSize};
    padding: ${theme.spacing(1) / 2}px;
    margin-top: ${theme.spacing(1)}px;
    margin-right: ${theme.spacing(1) / 2}px;
  `
)
