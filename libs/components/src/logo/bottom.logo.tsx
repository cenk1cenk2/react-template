import { Grid, Typography } from '@material-ui/core'
import React, { Fragment, SVGProps } from 'react'
import styled, { css, useTheme } from 'styled-components'

export interface BottomLogoProps {
  package: {
    name: string
    version: string
  }
  logo: React.FC<SVGProps<SVGSVGElement>> | string
}

export const BottomLogo: React.FC<BottomLogoProps> = (props) => {
  const theme = useTheme()
  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Logo>
              <props.logo height={theme.typography.body1.fontSize} width={theme.typography.body1.fontSize} />
            </Logo>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textPrimary">
              {props.package.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ color: theme.palette.grey[600] }}>
            <small>v{props.package.version}</small>
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}

const Logo = styled.div(
  ({ theme }) => css`
    width: ${theme.typography.body1.fontSize};
    height: ${theme.typography.body1.fontSize};
    margin-right: ${theme.spacing(1) / 2}px;
    margin-top: ${theme.spacing(1) / 4}px;
  `
)
