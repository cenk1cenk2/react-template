import { Box as BaseBox, Grid, Container } from '@material-ui/core'
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { MaxWidths, BottomLogo, BottomLogoProps } from '@cenk1cenk2/react-template-components'

interface StyledGridProps {
  $offset?: { x?: number, y?: number }
}

const StyledGrid = styled(Grid)<StyledGridProps>(
  ({ theme, $offset }) => css`
    position: relative;
    top: 0px;

    ${theme.breakpoints.up('md')} {
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

export const Pulldown: React.FC<PulldownProps> = (props) => {
  return (
    <Fragment>
      <StyledGrid container direction="column" $offset={props.offset}>
        <Container maxWidth={props?.maxWidth ?? 'md'} disableGutters={true}>
          <Box boxShadow={5}>{props?.children}</Box>
          <BottomLogo logo={props.logo} package={props.package} />
        </Container>
      </StyledGrid>
    </Fragment>
  )
}
