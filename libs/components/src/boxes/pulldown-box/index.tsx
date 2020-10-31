import { Container } from '@cenk1cenk2/react-template-components/boxes/container'
import { MaxWidths } from '@cenk1cenk2/react-template-components/interfaces'
import { BottomLogo, BottomLogoProps } from '@cenk1cenk2/react-template-components/logo'
import { Box, Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const StyledGrid = styled(Grid)(
  ({ theme }) => css`
    position: absolute;
    top: 0px;

    ${theme.breakpoints.up('sm')} {
      top: 50%;
      transform: translate(0%, -50%);
    }
  `
)

const StyledBox = styled(Box)(
  ({ theme }) => css`
    margin: 25px 0 25px 0;
    padding: 50px 0 50px 0;
    background: ${theme.palette.background.paper};
  `
)

export type PulldownProps = {
  maxWidth?: MaxWidths
} & BottomLogoProps

export const Pulldown: React.EFC<PulldownProps> = (props) => {
  return (
    <Fragment>
      <StyledGrid container direction="column">
        <Container maxWidth={props?.maxWidth ?? 'md'}>
          <StyledBox boxShadow={5}>{props?.children}</StyledBox>
          <BottomLogo logo={props.logo} package={props.package} />
        </Container>
      </StyledGrid>
    </Fragment>
  )
}
