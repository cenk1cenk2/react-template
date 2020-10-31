import { Paper as BasePaper } from '@material-ui/core'
import styled, { css } from 'styled-components'

interface BackgroundImageContainerProps {
  $url: string
}

export const BackgroundImageContainer = styled(BasePaper)<BackgroundImageContainerProps>(
  ({ $url }) => css`
    height: inherit;
    background-position: 0 50%;
    -webkit-background-size: cover;
    background-size: cover;

    &-cover {
      height: 300px;

      @media screen and (min-width: $screen-md-min) {
        height: 750px;
      }
    }

    @media screen and (min-width: $screen-lg-min) {
      &-parallax {
        background-attachment: fixed;
      }
    }
    background-image: url(${$url});
  `
)
