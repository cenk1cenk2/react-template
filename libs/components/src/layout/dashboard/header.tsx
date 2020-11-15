import { BaseConfig } from '@cenk1cenk2/react-template-base'
import { CastEvent } from '@cenk1cenk2/react-template-components'
import { AppBar as BaseAppBar, AppBarProps, Container, Grid, Toolbar as BaseToolbar, Typography } from '@material-ui/core'
import React, { Fragment, SVGProps, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled, { css, useTheme } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { MaxWidths } from '../../interfaces'
import { BackendLayoutAnimations, backendLayoutAnimations } from './dashboard.animations'
import { DashboardTemplateNavStates } from './dashboard.interface'
import { NavStatesStore } from './dashboard.store'

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
    (e: CastEvent<Window>) => {
      if (e.currentTarget?.scrollY) {
        if (e.currentTarget?.scrollY < theme.design.header.headerSizeMin / 2) {
          setSolidHeader(true)
        } else {
          setSolidHeader(false)
        }
      }
    },
    100,
    { leading: true }
  )

  const handleInit = useCallback(
    (e: CastEvent<Window>) => {
      handleScroll.callback(e)
    },
    [ handleScroll ]
  )

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
                        <Title>
                          <Typography variant="h2">{props.packageName}</Typography>
                        </Title>
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
      font-size: ${theme.typography.h3.fontSize};
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
