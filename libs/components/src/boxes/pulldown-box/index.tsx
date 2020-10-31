import { Container } from '@cenk1cenk2/react-template-components/boxes/container'
import { MaxWidths } from '@cenk1cenk2/react-template-components/interfaces'
import { BottomLogo, BottomLogoProps } from '@cenk1cenk2/react-template-components/logo'
import { Box as BaseBox, Grid } from '@material-ui/core'
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

interface StyledGridProps {
  $offset?: { x?: number, y?: number }
}

const StyledGrid = styled(Grid)<StyledGridProps>(
  ({ theme, $offset }) => css`
    position: absolute;
    top: 0px;

    ${theme.breakpoints.up('sm')} {
      top: ${50 - ($offset?.y ?? 0)}%;
      transform: translateY(${-50 + ($offset?.y ?? 0)}%) translateX(${0 + ($offset?.x ?? 0)}%);
    }
  `
)

const Box = styled(BaseBox)(
  ({ theme }) => css`
    margin: 25px 0 25px 0;
    padding: 50px 0 50px 0;
    background: ${theme.palette.background.paper};
  `
)

export type PulldownProps = {
  maxWidth?: MaxWidths
  offset?: StyledGridProps['$offset']
} & BottomLogoProps

export const Pulldown: React.EFC<PulldownProps> = (props) => {
  return (
    <Fragment>
      <StyledGrid container direction="column" $offset={props.offset}>
        <Container maxWidth={props?.maxWidth ?? 'md'}>
          <Box boxShadow={5}>{props?.children}</Box>
          <BottomLogo logo={props.logo} package={props.package} />
        </Container>
      </StyledGrid>
    </Fragment>
  )
}
