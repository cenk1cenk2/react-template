import { AppBar as BaseAppBar, AppBarProps, Container, Grid, Toolbar as BaseToolbar } from '@material-ui/core'
import React, { Fragment, SVGProps, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled, { css, useTheme } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { BackendLayoutAnimations, backendLayoutAnimations } from './dashboard.animations'
import { DashboardTemplateNavStates } from './dashboard.interface'
import { NavStatesStore } from './dashboard.store'
import { BaseConfig } from '@cenk1cenk2/react-template-base'
import { MaxWidths } from '@cenk1cenk2/react-template-components'

export type HeaderProps = {
  transperent?: boolean
  extendLeft?: React.FC | JSX.Element
  extendRight?: React.FC | JSX.Element
  logo: React.FC<SVGProps<SVGSVGElement>> | string
  maxWidth?: MaxWidths
  headerPosition?: AppBarProps['position']
  packageName: BaseConfig['package']['name']
}

export const Header: React.FC<HeaderProps> = (props) => {
  props = {
    ...{
      transperent: false,
      maxWidth: false,
      headerPosition: 'sticky'
    },
    ...props
  }

  // states
  const theme = useTheme()
  const [ solidHeader, setSolidHeader ] = useState(!props.transperent)
  const navState = useRecoilValue(NavStatesStore)

  // listeners
  const handleScroll = useDebouncedCallback(
    () => {
      if (window?.pageYOffset < theme.design.header.headerSizeMin / 2) {
        setSolidHeader(false)
      } else {
        setSolidHeader(true)
      }
    },
    100,
    { leading: true }
  )

  const handleInit = useCallback(() => {
    handleScroll.callback()
  }, [ handleScroll ])

  useEffect(() => {
    window.addEventListener('load', handleInit)
    window.addEventListener('scroll', handleScroll.callback)

    return () => {
      window.removeEventListener('load', handleInit)
      window.removeEventListener('scroll', handleScroll.callback)
    }
  }, [ handleScroll, window ])

  const transperentHeaderStatus =
    props?.transperent && !solidHeader && ![ DashboardTemplateNavStates.OPEN, DashboardTemplateNavStates.COLLAPSE, DashboardTemplateNavStates.OVERLAY ].includes(navState.state)

  return (
    <Fragment>
      <Fragment>
        <AppBar position={props.headerPosition} color={transperentHeaderStatus ? 'transparent' : 'default'} elevation={transperentHeaderStatus ? 0 : 5} style={{ zIndex: 1200 }}>
          <Container maxWidth={props.maxWidth} disableGutters={true}>
            <Toolbar>
              <Grid container direction="row" justify="space-between" alignItems="center" spacing={2} wrap="nowrap">
                <Grid item>
                  <LogoField>
                    <Link to="/">
                      <Grid container direction="row" alignItems="center" wrap="nowrap">
                        <Logo>
                          <props.logo height="100%" width="100%" />
                        </Logo>
                        <Title>{props.packageName}</Title>
                      </Grid>
                    </Link>
                  </LogoField>
                </Grid>
                <Grid item xs={true}>
                  {props?.extendLeft}
                </Grid>
                <Grid item>{props?.extendRight}</Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Fragment>
    </Fragment>
  )
}

const AppBar = styled(BaseAppBar)(
  ({ theme }) => css`
    overflow: hidden;

    .MuiButton-root {
      padding: ${theme.spacing(1)}px;
      font-size: ${theme.design.header.headerSizeMin - theme.spacing(4)}px;
    }

    .MuiToolbar-gutters {
      padding-left: ${theme.spacing(2)}px;
      padding-right: ${theme.spacing(2)}px;
    }
  `
)

const Toolbar = styled(BaseToolbar)(
  () => css`
    ${backendLayoutAnimations(BackendLayoutAnimations.HEADER_TRANSPARENCY, 'background-color')}
    ${backendLayoutAnimations(BackendLayoutAnimations.HEADER_TRANSPARENCY, 'box-shadow')}
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
  ({ theme }) => css`
    height: 100%;
    font-weight: 700;
    font-size: ${theme.design.header.headerSizeMin - theme.spacing(3)}px;
    font-family: ${theme.typography.h1.fontFamily};
    line-height: 0;
  `
)

const Logo = styled.div(
  ({ theme }) => css`
    height: 100%;
    width: ${theme.design.header.headerSizeMin - theme.spacing(2)}px;
    // padding: ${theme.spacing(1) / 2}px;
    margin-top: ${theme.spacing(1)}px;
    margin-right: ${theme.spacing(2)}px;
  `
)
