import { Container as BaseContainer } from '@material-ui/core'
import styled, { css } from 'styled-components'

export const Container = styled(BaseContainer)(
  () => css`
    padding: 0;
  `
)
