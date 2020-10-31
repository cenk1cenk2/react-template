import { Grid } from '@material-ui/core'
import React, { Fragment, SVGProps } from 'react'
import styled, { css, useTheme } from 'styled-components'

export interface BottomLogoProps {
  package: {
    name: string
    version: string
  }
  logo: React.EFC<SVGProps<SVGSVGElement>>
}

export const BottomLogo: React.EFC<BottomLogoProps> = (props) => {
  const theme = useTheme()
  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Logo>
              <props.logo height={theme.typography.fontSize} width={theme.typography.fontSize} />
            </Logo>
          </Grid>
          <Grid item className="font-w300">
            {props.package.name}
          </Grid>
        </Grid>
        <Grid item className="text-muted">
          <small>v{props.package.version}</small>
        </Grid>
      </Grid>
    </Fragment>
  )
}

const Logo = styled.div(
  ({ theme }) => css`
    width: ${theme.typography.fontSize}px;
    height: ${theme.typography.fontSize}px;
    margin-right: 5px;
  `
)
